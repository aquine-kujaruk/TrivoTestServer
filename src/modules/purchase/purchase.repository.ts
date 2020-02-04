import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Product} from 'src/dto/product.dto';
import {User} from 'src/dto/user.dto';
import {GraphService} from '../../services/graph.service';

@Injectable()
export class PurchaseRepository {
	constructor(
		@InjectModel('User') private userDb: Model<User>,
		private _graph: GraphService,
	) {}

	async createPurchase(id: string, productId: string): Promise<any> {
		try {
			return this.userDb.findByIdAndUpdate(
				id,
				{$push: {products: productId}},
				{new: true, upsert: true},
			);
		} catch (e) {
			throw new InternalServerErrorException('updateProduct Database error', e);
		}
	}

	async getPurchasesGraphByAges() {
		try {
			const purchases = await this.userDb.find();
			return this._graph.generateGraph(purchases);
		} catch (e) {
			throw new InternalServerErrorException(
				'getPurchasesGraphByAges Database error',
				e,
			);
		}
	}
}
