import {ValidationError, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {PORT} from './config/config';
import {FallbackExceptionFilter} from './filters/fallback.filter';
import {HttpExceptionFilter} from './filters/http.filter';
import {ValidationException} from './filters/validation.exception';
import {ValidationFilter} from './filters/validation.filter';
import {FirebaseService} from './services/firebase.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');

	await app.listen(PORT);

	FirebaseService.init();

	app.useGlobalFilters(
		new FallbackExceptionFilter(),
		new HttpExceptionFilter(),
		new ValidationFilter(),
	);

	app.useGlobalPipes(
		new ValidationPipe({
			skipMissingProperties: true,
			exceptionFactory: (errors: ValidationError[]) => {
				const messages = errors.map(
					(error) => `${error.property} has wrong value ${error.value},
                ${Object.values(error.constraints).join(', ')} `,
				);

				return new ValidationException(messages);
			},
		}),
	);
}
bootstrap();
