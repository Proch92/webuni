import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {

	db = {
		'account': {},
		'doc': {},
		'version': {},
		'subscription': {},
		'review': {}
	};

	constructor() { }

	get(table, id) {
		return accounts[table][id];
	}

	put(table, record) {

	}
}