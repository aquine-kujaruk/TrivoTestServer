import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from 'src/dto/user.dto';

@Injectable()
export class GraphRepository {
	constructor(@InjectModel('User') private userDb: Model<User>) {}

	async getBarGraph() {}
}
