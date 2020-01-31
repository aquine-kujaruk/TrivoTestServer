import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {User} from 'src/dto/user.dto';
import {AdminGuard} from '../../guards/admin.guard';
import {AuthenticationGuard} from '../../guards/authentication.guard';
import {AuthRepository} from './auth.repository';

@Controller()
@UseGuards(AuthenticationGuard)
export class AuthController {
	constructor(private _authRepo: AuthRepository) {}

	@Post('/login')
	/* @UseGuards(AdminGuard) */
	async login(@Req() req, @Body() body: User): Promise<User> {
		const user = {...req.user};
		return this._authRepo.login(user);
	}
}
