import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
	providedIn: 'root'
})
export class EventService {
	last_signature = -1;
	public events = new Subject<any>();

	constructor(private db: DatabaseService) {
		this.init();
	}

	init() {
		this.db.select('event', {}).subscribe((events:Array<any>) => {
			if (events.length > 0) {
				this.last_signature = Math.max(...events.map(e => e['progressive']));
			}
			console.log('init event service. last signature: ', this.last_signature);
			var self = this;
			setInterval(this.checkEvents, 5000, self);
		});
	}

	sendEvent(event) {
		this.db.select('account', {id: event['owner']})
			.subscribe((owners: Array<any>) => {
				if (owners.length > 0) {
					event['ownerName'] = owners[0].name;
				}
				this.db.insert('event', event)
					.subscribe(e => {});
			});
	}

	checkEvents(self) {
		self.db.select('event', {}).subscribe((events:Array<any>) => {
			var new_events = events.filter(e => e['progressive'] > self.last_signature);
			if (new_events.length > 0) {
				self.last_signature = Math.max(...new_events.map(e => e['progressive']));
			}
			console.log('last signature: ', self.last_signature);
			new_events.forEach(e => self.events.next(e));
		});
	}
}

function randID(): string {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+S4());
}