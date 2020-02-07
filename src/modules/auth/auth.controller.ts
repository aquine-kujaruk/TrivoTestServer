import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import {User} from 'src/dto/user.dto';
import {AuthenticationGuard} from '../../guards/authentication.guard';
import {AuthRepository} from './auth.repository';

@Controller()
@UseGuards(AuthenticationGuard)
export class AuthController {
	constructor(private _authRepo: AuthRepository) {}

	@Post('/login')
	async login(@Req() req): Promise<User> {
		return this._authRepo.getUser({...req.user});
	}

	@Get('/user')
	async getUser(@Req() req): Promise<User> {
		return this._authRepo.login({...req.user});
	}

	@Put('/user/age')
	async updateUser(@Req() req, @Body() changes: any): Promise<any> {
		return this._authRepo.updateUser(req.user._id, changes.age);
	}
}
