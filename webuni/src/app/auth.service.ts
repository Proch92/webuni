import { Injectable } from '@angular/core';

var rdb = require('rethinkdb');

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	connection = null;

	constructor() {
		rdb.connect({db: 'peer_review'}, 
			function(err, conn) {
				if(err) throw err;
				console.log(JSON.stringify(conn, null, 2));
				this.connection = conn
			}
		)
	}

	login(mail, password): boolean {
		ret = false;
		rdb.table('account')
			.filter(rdb.row('mail').eq(mail) & rdb.row('password').eq(password))
			.count()
			.run(this.connection, function(err, result) {
				if (err) throw err;
				if (result == 1) ret = true;
			});

		return ret;
	}

	register(mail, name, password): void {
		rdb.table('account').insert([
				{name: name, mail: mail, password: password}
			]).run(this.connection);
	}
}

/*
account {
	mail,
	id,
	name,
	password
}
doc {}
version {}
subscription {}
review {}
*/