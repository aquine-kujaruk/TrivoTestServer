import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Product} from '../../dto/product.dto';

@Injectable()
export class ProductRepository {
	constructor(@InjectModel('Product') private userDb: Model<Product>) {}

	async getProduct() /* : Promise<Product> */ {}

	async getProducts() /* : Promise<Product[]> */ {}

	async postProduct() /* : Promise<Product> */ {}

	async putProduct() /* : Promise<Product> */ {}

	async deleteProduct() /* : Promise<Boolean> */ {}

	async searchProduct() /* : Promise<Product[]> */ {}
}
