import {
	IsArray,
	IsMongoId,
	IsNumber,
	IsString,
	MaxLength,
} from 'class-validator';
import {Document} from 'mongoose';

export class User extends Document {
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

	@IsArray()
	products: string[];
}
