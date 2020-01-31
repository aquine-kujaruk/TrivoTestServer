import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from '@nestjs/common';
import {FirebaseService} from 'src/services/firebase.service';

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

			if (firebaseInfo) {
				req['user'] = {
					_id: firebaseInfo.sub,
					name: firebaseInfo.name,
					picture: firebaseInfo.picture,
					email: firebaseInfo.email,
					provider: firebaseInfo.firebase.sign_in_provider,
					roles: firebaseInfo.roles || [],
				};
			}
		} catch (e) {
			throw new UnauthorizedException('Authentication error', e);
		}

		next();
	}
}
