import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema(
	{
		name: String,
		description: String,
		picture: String,
	},
	{timestamps: true},
);
