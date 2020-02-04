import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductsSchema} from 'src/schemas/product.schema';
import {SearchController} from './search.controller';
import {SearchRepository} from './search.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Product',
				schema: ProductsSchema,
			},
		]),
	],
	controllers: [SearchController],
	providers: [SearchRepository],
})
export class SearchModule {}
