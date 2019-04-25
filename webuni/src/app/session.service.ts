import { Injectable } from '@angular/core';
import { Locker, DRIVERS } from 'angular-safeguard';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	constructor(private locker: Locker) { }

	setAccountID(id): void {
		console.log('setting ', id)
		this.locker.set(DRIVERS.SESSION, 'accountID', id);
	}

	getAccountID(): string {
		return this.locker.get(DRIVERS.SESSION, 'accountID');
	}

	logout(): void {
		this.locker.set(DRIVERS.SESSION, 'accountID', '0');
	}
}
