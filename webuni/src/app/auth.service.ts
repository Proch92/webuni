import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service'

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private db: DatabaseService) {}

	login(mail, password): string {
		var acc = this.db.select('account', {'mail': mail, 'password': password});
		if (acc.length > 0) {
			acc = acc[0];
			return acc['id'];
		} else {
			return "";
		}
	}

	register(mail, name, password): string {
		if (this.db.select('account', {'mail': mail}).length > 0) {
			// account already exists
			return "";
		} else {
			this.db.insert('account', {
				'mail': mail,
				'name': name,
				'password': password
			});

			var acc = this.db.select('account', {'mail': mail, 'name': name})[0];
			
			return acc['id'];
		}
	}

}