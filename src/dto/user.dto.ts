import {IsMongoId, IsNumber, IsString, MaxLength} from 'class-validator';

export class User {
	@IsString()
	@IsMongoId()
	_id: string;

	@IsString()
	name: string;

	@IsString()
	picture: string;

	@IsString()
	email: string;

	@MaxLength(10, {each: true})
	roles: string[];

	@IsNumber()
	age: number;
}
