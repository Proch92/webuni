import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class EventService {

	public events = new Subject<any>();

	constructor() {	}

	sendEvent(event) {
		console.log('event received. gonna notify subscribers')
		//save in db
		//add to events
		event['id'] = randID();
		this.events.next(event);
	}
}

function randID(): string {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+S4());
}