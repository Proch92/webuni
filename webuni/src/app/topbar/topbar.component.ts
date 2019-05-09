import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

	notifications_menu = [];

	constructor(private router: Router, private db: DatabaseService, private session: SessionService, private events: EventService) { }

	ngOnInit() {
	}

	onLogout() {
		this.session.logout();
		this.router.navigateByUrl('/login');
	}

	getEvents() {
		this.db.select("follow", {follower: this.session.getAccountID()}).subscribe((follows: any[]) => {
			this.db.select("event", {}).subscribe((events: any[]) => {
				var foll_ids = follows.map(f => f['following']);
				this.notifications_menu = events.filter(e => foll_ids.includes(e['owner']))
					.reverse()
					.slice(0,6);
			});
		});
	}
}
