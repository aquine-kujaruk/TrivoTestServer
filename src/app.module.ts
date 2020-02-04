import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {MONGO_CONNECTION} from './config/config';
import {GetUserMiddleware} from './middlewares/get-user.middleware';
import {AuthController} from './modules/auth/auth.controller';
import {AuthModule} from './modules/auth/auth.module';
import {ProductController} from './modules/product/product.controller';
import {ProductModule} from './modules/product/product.module';
import {PurchaseController} from './modules/purchase/purchase.controller';
import {PurchaseModule} from './modules/purchase/purchase.module';
import {SearchController} from './modules/search/search.controller';
import {SearchModule} from './modules/search/search.module';
import {FirebaseService} from './services/firebase.service';
import {GraphService} from './services/graph.service';

@Module({
	imports: [
		MongooseModule.forRoot(MONGO_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: false,
		}),
		AuthModule,
		ProductModule,
		PurchaseModule,
		SearchModule,
	],
	controllers: [AppController],
	providers: [FirebaseService, GraphService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer
			.apply(GetUserMiddleware)
			.forRoutes(
				AuthController,
				ProductController,
				PurchaseController,
				SearchController,
			);
	}
}
