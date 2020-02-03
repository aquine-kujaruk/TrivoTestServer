import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {GraphService} from '../../services/graph.service';

@Injectable()
export class PurchaseRepository {
	constructor(
		@InjectModel('Purchase') private purchaseDb: Model<any>,
		private _graph: GraphService,
	) {}

	async createPurchase(productId: number, userId: number) {
		try {
			const newPurchase = this.purchaseDb({userId, productId});

			await newPurchase.save();

			return newPurchase.toObject({versionKey: false});
		} catch (e) {
			throw new InternalServerErrorException(
				'createPurchase Database error',
				e,
			);
		}
	}
	async getPurchasesByUser(userId: string) {
		try {
			return this.purchaseDb.find({userId});
		} catch (e) {
			throw new InternalServerErrorException(
				'getPurchasesByUser Database error',
				e,
			);
		}
	}
	async getPurchasesGraphByAges() {
		try {
			const purchases = await this.purchaseDb.find();
			return this._graph.generateGraph(purchases);
		} catch (e) {
			throw new InternalServerErrorException(
				'getPurchasesGraphByAges Database error',
				e,
			);
		}
	}
}
