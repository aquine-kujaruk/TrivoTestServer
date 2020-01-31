import {Injectable} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
	static init() {
		admin.initializeApp({
			credential: admin.credential.applicationDefault(),
		});
	}

	static get getAdmin(): any {
		return admin;
	}

	static async setRoleClaims(id: string, roles: string[]) {
		await admin
			.auth()
			.setCustomUserClaims(id, {roles})
			.then(() => {
				console.log('Successful role claims update');
			});
	}
}
