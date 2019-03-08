import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

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

	onSubmit() {
		if (this.register) {
			var id: string = this.auth.register(this.mailField, this.nameField, this.passwordField);

			if (id != "") {
				this.session.setAccountID(id);
				this.router.navigateByUrl('/feed');
			}
		}
		else {
			var id: string = this.auth.login(this.mailField, this.passwordField);

			if (id != "") {
				this.session.setAccountID(id);
				this.router.navigateByUrl('/feed');
			}
		}
	}

	constructor(private auth: AuthService, private router: Router, private session: SessionService) { }

	ngOnInit() {
		if (this.session.getAccountID() != undefined) {
			this.router.navigateByUrl('/feed');
		}
	}

}
