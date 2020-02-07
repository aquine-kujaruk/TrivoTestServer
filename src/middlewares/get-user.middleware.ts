import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from '@nestjs/common';
import {FirebaseService} from 'src/services/firebase.service';
import {User} from '../dto/user.dto';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: () => void) {
		const token = req.headers['x-token'];

		if (!token) {
			next();
			return;
		}

		try {
			const firebaseInfo = await FirebaseService.getAdmin
				.auth()
				.verifyIdToken(token);

			console.log(firebaseInfo);

			if (firebaseInfo) {
				const user: Partial<User> = {
					_id: firebaseInfo.sub,
					roles: firebaseInfo.roles || [],
				};

				req['user'] = user;
			}
		} catch (e) {
			throw new UnauthorizedException('Authentication error', e);
		}

		next();
	}
}
