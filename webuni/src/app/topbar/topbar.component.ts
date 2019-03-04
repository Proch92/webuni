import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
	name = "";

	constructor(private db: DatabaseService, private session: SessionService) { }

	ngOnInit() {
		var id = this.session.getAccountID();
		this.name = this.db.select('account', {id: id})[0]['name'];
	}

}
