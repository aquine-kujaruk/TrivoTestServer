import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {AuthenticationGuard} from 'src/guards/authentication.guard';
import {PurchaseRepository} from './purchase.repository';

@Controller('purchase')
@UseGuards(AuthenticationGuard)
export class PurchaseController {
	constructor(private _purchaseRepo: PurchaseRepository) {}

	@Post()
	async createPurchase(@Body() productId: number, @Body() userId: number) {
		return;
	}

	@Get(':id')
	async getPurchasesByUser(@Param('id') userId: string) {
		return;
	}

	@Get()
	async getPurchasesGraphByAges() {
		return;
	}
}
