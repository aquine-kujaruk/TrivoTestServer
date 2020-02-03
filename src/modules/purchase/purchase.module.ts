import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {PurchaseSchema} from 'src/schemas/purchase.schema';
import {PurchaseController} from './purchase.controller';
import {PurchaseRepository} from './purchase.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Purchase',
				schema: PurchaseSchema,
			},
		]),
	],
	providers: [PurchaseRepository],
	controllers: [PurchaseController],
})
export class PurchaseModule {}
