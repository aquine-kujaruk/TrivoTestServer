import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema(
	{
		name: String,
		description: String,
		picture: {type: String, default: 'image'},
	},
	{timestamps: true},
);
