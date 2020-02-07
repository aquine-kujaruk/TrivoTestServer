import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
	{
		_id: String,
		roles: [{type: String}],
		age: Number,
		products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
	},
	{timestamps: true},
);
