import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Product} from '../../dto/product.dto';

@Injectable()
export class ProductRepository {
	constructor(@InjectModel('Product') private productDb: Model<Product>) {}

	async findAllProducts(): Promise<Product[]> {
		try {
			return this.productDb.find();
		} catch (e) {
			throw new InternalServerErrorException(
				'findAllProducts Database error',
				e,
			);
		}
	}

	async findProduct(id: string): Promise<Product> {
		try {
			const product = this.productDb.findById(id);

			if (!product)
				throw new NotFoundException(`Could not find product for id: ${id}`);

			return product;
		} catch (e) {
			throw new InternalServerErrorException('findProduct Database error', e);
		}
	}

	async createProduct(product: Product): Promise<Product> {
		try {
			const newProduct = new this.productDb(product);

			await newProduct.save();

			return newProduct.toObject({versionKey: false});
		} catch (e) {
			throw new InternalServerErrorException('createProduct Database error', e);
		}
	}

	async updateProduct(id: string, changes: Partial<Product>): Promise<Product> {
		try {
			return this.productDb.findOneAndUpdate({_id: id}, changes, {new: true});
		} catch (e) {
			throw new InternalServerErrorException('updateProduct Database error', e);
		}
	}

	async deleteProduct(id: string) {
		try {
			return this.productDb.deleteOne({_id: id});
		} catch (e) {
			throw new InternalServerErrorException('deleteProduct Database error', e);
		}
	}
}
