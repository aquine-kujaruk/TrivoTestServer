import {Body, Controller, Get, Param, Put, UseGuards} from '@nestjs/common';
import * as mongoose from 'mongoose';
import {Product} from 'src/dto/product.dto';
import {AuthenticationGuard} from 'src/guards/authentication.guard';
import {PurchaseRepository} from './purchase.repository';

@Controller('purchase')
@UseGuards(AuthenticationGuard)
export class PurchaseController {
	constructor(private _purchaseRepo: PurchaseRepository) {}

	@Put(':id')
	async createPurchase(
		@Param('id') id: string,
		@Body() changes: any,
	): Promise<any> {
		return this._purchaseRepo.createPurchase(id, changes.productId);
	}

	@Get('/graph')
	async getPurchasesGraphByAges() {
		return this._purchaseRepo.getPurchasesGraphByAges();
	}
}
