import { Injectable } from '@angular/core';
import { LockerModule, Locker, DRIVERS } from 'angular-safeguard';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	
	constructor(private locker: Locker) {
		var db = locker.get(DRIVERS.LOCAL, 'db');
		if (db == undefined) {
			this.init_mock_db();
		}
	}

	select(table, filter) {
		var db = this.locker.get(DRIVERS.LOCAL, 'db');
		var records = db[table];
		var selected = records.filter(record => {
			var sel = true;
			for (var key in filter) {
				sel = sel && (record[key] == filter[key]);
			}
			return sel;
		});

		return selected;
	}

	insert(table, record): string {
		var db = this.locker.get(DRIVERS.LOCAL, 'db');
		record['id'] = this.generateID();
		db[table].push(record);
		this.locker.set(DRIVERS.LOCAL, 'db', db);

		return record['id']
	}

	printDB(): void {
		var db = this.locker.get(DRIVERS.LOCAL, 'db');
		console.log(db);
	}

	private init_mock_db() {
		var init = {
			'account': [],
			'doc': [],
			'version': [],
			'subscription': [],
			'review': [],
			'follow': []
		};
		
		this.locker.set(DRIVERS.LOCAL, 'db', init);

		var id0 = this.insert('account', {name: 'admin', password: 'admin', mail: 'admin@admin.it'});
		var id1 = this.insert('account', {name: 'Marco Rossi', password: 'mrossi', mail: 'mrossi@mail.it'});
		var id2 = this.insert('account', {name: 'Roberto Neri', password: 'rneri', mail: 'rneri@mail.it'});
		var id3 = this.insert('account', {name: 'Sandro Verdi', password: 'sverdi', mail: 'sverdi@mail.it'});
		var id4 = this.insert('account', {name: 'Michele Proverbio', password: 'mproverbio', mail: 'mproverbio@mail.it'});

		this.insert('follow', {follower: id1, following: id3});
		this.insert('follow', {follower: id4, following: id2});
		this.insert('follow', {follower: id4, following: id1});
		this.insert('follow', {follower: id4, following: id3});
		this.insert('follow', {follower: id3, following: id2});
	
	}

	private generateID() {
		var S4 = function() {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+S4()+S4());
	}
}