import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {FirebaseService} from '../../services/firebase.service';
import {AuthController} from '../auth/auth.controller';
import {AuthRepository} from './auth.repository';
import {UsersSchema} from './user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'User',
				schema: UsersSchema,
			},
		]),
	],
	controllers: [AuthController],
	providers: [AuthRepository, FirebaseService],
})
export class AuthModule {}
