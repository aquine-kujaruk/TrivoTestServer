import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from 'src/dto/user.dto';
import {FirebaseService} from 'src/services/firebase.service';

@Injectable()
export class AuthRepository {
	constructor(@InjectModel('User') private userDb: Model<User>) {}

	async login(user: User): Promise<User> {
		try {
			const loggedInUser = await this.userDb.findById(user._id);

			if (loggedInUser) {
				for (const role of loggedInUser.roles) {
					if (!user.roles.includes(role)) {
						await FirebaseService.setRoleClaims(user._id, loggedInUser.roles);
						break;
					}
				}

				return loggedInUser;
			}

			return await this.RegisterUser(user);
		} catch (e) {
			throw new InternalServerErrorException('Login Database error', e);
		}
	}

	async RegisterUser(user: User): Promise<User> {
		try {
			const registeredUser = await new this.userDb({
				...user,
				roles: ['USER'],
			}).save();

			await FirebaseService.setRoleClaims(user._id, registeredUser.roles);

			return registeredUser;
		} catch (e) {
			throw new InternalServerErrorException('Register Database error', e);
		}
	}

	async getUser(user: User): Promise<User> {
		try {
			return await this.userDb.findById(user._id);
		} catch (e) {
			throw new InternalServerErrorException('getUser Database error', e);
		}
	}

	async updateUser(id: string, age: number): Promise<any> {
		try {
			return this.userDb.findByIdAndUpdate(
				id,
				{age},
				{new: true, upsert: true},
			);
		} catch (e) {
			throw new InternalServerErrorException('updateProduct Database error', e);
		}
	}
}
