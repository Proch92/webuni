import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'app-reviews-dashboard',
	templateUrl: './reviews-dashboard.component.html',
	styleUrls: ['./reviews-dashboard.component.scss']
})
export class ReviewsDashboardComponent implements OnInit {

	docs = null;
	following = false;
	profileID = null;
	sessionID = null;
	name = "";

	constructor(private db: DatabaseService, private session: SessionService, private route: ActivatedRoute) {}

	ngOnInit() {
		this.sessionID = this.session.getAccountID();
		this.route.params.forEach((params) => {
			this.profileID = params['id'];
			this.db.select('account', {id:this.profileID})
				.subscribe((acc: Array<any>) => {
					if(acc.length > 0) {
						this.name = acc[0]['name'];
					}
				});
			this.getPersonalDocs();
			this.isFollowing();
		});
		
	}

	private getPersonalDocs(): void {
		this.db.select('doc', {'owner': this.profileID})
			.subscribe(docs => this.docs = docs);
	}

	private isFollowing() {
		this.db.select('follow', {follower: this.sessionID, following: this.profileID})
			.subscribe((fol: Array<any>) => {
				if (fol.length > 0) {
					this.following = true;
				} else {
					this.following = false;
				}
			});
	}

	onFollow() {
		if (this.following) {
			this.db.delete('follow', {follower: this.sessionID, following: this.profileID}).subscribe(_ => this.isFollowing());
		} else {
			this.db.insert('follow', {follower: this.sessionID, following: this.profileID}).subscribe(_ => this.isFollowing());
		}
	}
}
