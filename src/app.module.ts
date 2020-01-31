import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {MONGO_CONNECTION} from './config/config';
import {GetUserMiddleware} from './middlewares/get-user.middleware';
import {AuthController} from './modules/auth/auth.controller';
import {AuthModule} from './modules/auth/auth.module';
import {GraphModule} from './modules/graph/graph.module';
import {ProductModule} from './modules/product/product.module';
import {FirebaseService} from './services/firebase.service';

@Module({
	imports: [
		MongooseModule.forRoot(MONGO_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: false,
		}),
		AuthModule,
		ProductModule,
		GraphModule,
	],
	controllers: [AppController],
	providers: [FirebaseService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(GetUserMiddleware).forRoutes(AuthController);
	}
}
