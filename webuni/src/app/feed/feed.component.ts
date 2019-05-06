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
			console.log('events: ', events);
			this.db.select('follow', {follower: this.session.getAccountID()})
				.subscribe((follows: Array<Object>) => {
					var foll_ids = follows.map(f => f['following']);
					this.events = events.filter(e => foll_ids.includes(e['owner']));
					this.events = this.events.reverse();
				})
		})
	}

}
