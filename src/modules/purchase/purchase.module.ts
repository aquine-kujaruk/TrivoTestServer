import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersSchema} from 'src/schemas/user.schema';
import {GraphService} from 'src/services/graph.service';
import {PurchaseController} from './purchase.controller';
import {PurchaseRepository} from './purchase.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: UsersSchema,
			},
		]),
	],
	providers: [PurchaseRepository, GraphService],
	controllers: [PurchaseController],
})
export class PurchaseModule {}
