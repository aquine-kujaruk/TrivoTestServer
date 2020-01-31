import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
	{
		_id: String,
		name: String,
		picture: String,
		email: String,
		roles: [{type: String}],
		age: Number,
		state: {
			type: Boolean,
			default: true,
		},
	},
	{timestamps: true},
);
