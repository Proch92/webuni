import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
	constructor(private router: Router, private db: DatabaseService, private session: SessionService) { }

	ngOnInit() {
	}

	onLogout() {
		this.session.logout();
		this.router.navigateByUrl('/login');
	}
}
