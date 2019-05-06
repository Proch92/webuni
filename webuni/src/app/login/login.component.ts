import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { DatabaseService } from '../database.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	register: boolean = false;

	nameField: string = "";
	passwordField: string = "";
	mailField: string = "";

	constructor(private auth: AuthService, private router: Router, private session: SessionService, private db: DatabaseService, private zone:NgZone) { }
	
	onSubmit() {
		if (this.register) {
			this.db.insert('account', {
					'mail': this.mailField,
					'name': this.nameField,
					'password': this.passwordField
				}).subscribe(account => {
					console.log('register', account);
					if (account) {
						this.session.setAccountID(account['id']);
						this.zone.run(() => this.router.navigateByUrl('/feed'));
					}
				});
		}
		else {
			this.db.select('account', {
					'mail': this.mailField,
					'password': this.passwordField
				}).subscribe(account => {
					console.log('login', account);
					if (account) {
						this.session.setAccountID(account[0]['id']);
						this.zone.run(() => this.router.navigateByUrl('/feed'));
					}
				});
		}
	}

	ngOnInit() {
		var id = this.session.getAccountID();
		console.log(id);
		if (id != undefined && id != '0') {
			this.router.navigateByUrl('/feed');
		}
	}

}
