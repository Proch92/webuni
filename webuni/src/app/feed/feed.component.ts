import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

	events;

	constructor(private db: DatabaseService, private session: SessionService) { }

	ngOnInit() {
		this.loadEvents();
	}

	loadEvents() {
		this.db.select('event', {}).subscribe((events: Array<Object>) => {
			this.db.select('follow', {follower: this.session.getAccountID()})
				.subscribe((following: Array<Object>) => {
					var foll_ids = following.map(f => f['following']);
					this.events = events.filter(e => e['owner'] in foll_ids);
				})
		})
	}

}
