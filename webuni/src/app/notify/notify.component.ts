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

	notification = null;

	constructor(private db:DatabaseService, private session:SessionService, private events:EventService) { }

	ngOnInit() {
		this.events.events.subscribe(event => {
			this.db.select('follow', {follower: this.session.getAccountID()})
				.subscribe((following:Array<Object>) => {
					var foll_ids = following.map(f => f['following']);
					if (foll_ids.includes(event.owner)) {
						console.log('notify ok pushing event');
						this.notification = event;
						setTimeout(() => {
							$('#' + event.id).toast('show');
						}, 500);
					}
				});
			});
	}

	
}