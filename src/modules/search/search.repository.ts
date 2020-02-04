import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Product} from 'src/dto/product.dto';

@Injectable()
export class SearchRepository {
	constructor(@InjectModel('Product') private productDb: Model<Product>) {}

	async searchProduct(
		search: string,
		sortOrder: string,
		pageNumber: number,
		pageSize: number,
	): Promise<Product[]> {
		try {
			const query = new RegExp(search, 'i');
			return this.productDb.find({name: query}, null, {
				skip: pageNumber * pageSize,
				limit: pageSize,
				sort: {seqNo: sortOrder},
			});
		} catch (e) {
			throw new InternalServerErrorException('searchProduct Database error', e);
		}
	}
}
