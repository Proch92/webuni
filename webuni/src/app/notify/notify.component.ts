import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
	selector: 'app-notify',
	templateUrl: './notify.component.html',
	styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

	notifications = [];

	constructor(private events:EventService) { }

	ngOnInit() {
		this.events.events.subscribe(event => {
			console.log('new event: ', event);
			this.notifications.push(event);
			setTimeout(() => {
				$('#' + event.id).toast('show');
				var self = this;
				$('#' + event.id).on('hidden.bs.toast', function() {
					self.notifications = self.notifications.filter(notif => notif.id != event.id);
				});
			}, 500);
		},
		null, 
		null);
	}
}