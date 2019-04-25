import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';

@Component({
	selector: 'app-notify',
	templateUrl: './notify.component.html',
	styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

	notifications = [];

	constructor(private db:DatabaseService, private session:SessionService, private events:EventService) { }

	ngOnInit() {
		this.events.events.subscribe(event => {
			this.db.select('follow', {follower: this.session.getAccountID()})
				.subscribe((following:Array<Object>) => {
					var foll_ids = following.map(f => f['following']);
					if (event.owner in foll_ids) {
						this.notifications.push(event);
						setTimeout(() => {
							$('#' + event.id).toast('show');
							var self = this;
							$('#' + event.id).on('hidden.bs.toast', function() {
								self.notifications = self.notifications.filter(notif => notif.id != event.id);
							});
						}, 500);
					}
				})
		},
		null, 
		null);
	}
}