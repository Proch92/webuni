import { EventService } from './event.service';

export class ShowNotifications {
	constructor(private events: EventService) {
		this.events.events.subscribe(event => {

		});
	}

	buildNotification(title, subtitle, message) {}
}