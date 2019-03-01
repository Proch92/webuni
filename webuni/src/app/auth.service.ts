import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor() {
	}

	login(mail, password): boolean {
		return true;
	}

	register(mail, name, password): void {
		return;
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