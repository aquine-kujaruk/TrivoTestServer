import {IsMongoId, IsString} from 'class-validator';
import {Document} from 'mongoose';

export class Product extends Document {
	@IsString()
	@IsMongoId()
	_id: string;

	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	picture: string;
}
