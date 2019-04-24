import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
	selector: 'app-notify',
	templateUrl: './notify.component.html',
	styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

	stack = [];
	activeNotification = null;

	constructor(private events:EventService) { }

	ngOnInit() {
		this.events.events.subscribe(event => {
			console.log('new event: ', event);
			this.notifications.push(event);
			$('#' + event.id).toast('show');
			$('#' + event.id).on('hidden.bs.toast', this.onHidden)
		}, 
		null, 
		null);
	}

	onHidden(event) {
		console.log('hidden, ', event);
		//this.notifications = this.notifications.filter(notif => notif.id != event.id);
	}
}
