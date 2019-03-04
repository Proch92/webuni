import { Injectable } from '@angular/core';
import { Locker, DRIVERS } from 'angular-safeguard';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	constructor(private locker: Locker) { }

	setAccountID(id): void {
		this.locker.set(DRIVERS.SESSION, 'accountID', id);
	}

	getAccountID(): string {
		return this.locker.get(DRIVERS.SESSION, 'accountID');
	}
}
