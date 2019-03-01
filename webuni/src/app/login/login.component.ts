import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	register: boolean = false;

	nameField: string = "Account Name";
	passwordField: string = "Password";
	mailField: string = "Mail";

	onSubmit() {
		console.log(this.nameField)
		if (this.register) {
			this.auth.register(this.mailField, this.nameField, this.passwordField);
		}
		else {
			var success: boolean = this.auth.login(this.mailField, this.passwordField);
			console.log(success);
		}
	}

	constructor(private auth: AuthService) { }

	ngOnInit() {
	}

}
