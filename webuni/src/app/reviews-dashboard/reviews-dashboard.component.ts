import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';

@Component({
	selector: 'app-reviews-dashboard',
	templateUrl: './reviews-dashboard.component.html',
	styleUrls: ['./reviews-dashboard.component.scss']
})
export class ReviewsDashboardComponent implements OnInit {

	docs = null;

	constructor(private db: DatabaseService, private session: SessionService) {}

	ngOnInit() {
		this.getPersonalDocs();
	}

	private getPersonalDocs(): void {
		var id = this.session.getAccountID();
		this.db.select('doc', {'owner': id})
			.subscribe(docs => this.docs = docs);
	}
}
