import {IsMongoId, IsString} from 'class-validator';

export class Product {
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
