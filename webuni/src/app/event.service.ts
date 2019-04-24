import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
	providedIn: 'root'
})
export class EventService {

	public events = new Subject<any>();

	constructor(private db: DatabaseService) {	}

	sendEvent(event) {
		this.db.insert('event', event)
			.subscribe(e => {
				this.db.select('account', {id: e['owner']})
				.subscribe((owners: Array<any>) => {
					if (owners.length > 0) {
						e['ownerName'] = owners[0].name;
					}
					this.events.next(e);
				});
			});
		
	}
}

function randID(): string {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+S4());
}