import * as mongoose from 'mongoose';

export const PurchaseSchema = new mongoose.Schema(
	{
		userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
	},
	{timestamps: true},
);
