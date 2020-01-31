import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductsSchema} from '../../schemas/product.schema';
import {ProductController} from './product.controller';
import {ProductRepository} from './product.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Product',
				schema: ProductsSchema,
			},
		]),
	],
	controllers: [ProductController],
	providers: [ProductRepository],
})
export class ProductModule {}
