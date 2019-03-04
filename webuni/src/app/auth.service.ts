import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service'
import { SessionService } from './session.service'

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private db: DatabaseService, private session: SessionService) {}

	login(mail, password): boolean {
		console.log('attempting login with ' + mail + ' and ' + password);
		var acc = this.db.select('account', {'mail': mail, 'password': password});
		if (acc.length > 0) {
			acc = acc[0];
			this.session.setAccountID(acc['id']);
			return true;
		} else {
			return false;
		}
	}

	register(mail, name, password): boolean {
		if (this.db.select('account', {'mail': mail}).length > 0) {
			// account already exists
			return false;
		} else {
			this.db.insert('account', {
				'mail': mail,
				'name': name,
				'password': password
			});

			var acc = this.db.select('account', {'mail': mail, 'name': name})[0];
			this.session.setAccountID(acc['id']);
			
			return true;
		}
	}

}