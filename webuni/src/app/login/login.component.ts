import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
			var success: boolean = this.auth.register(this.mailField, this.nameField, this.passwordField);
			console.log(success);

			if (success) {
				this.router.navigateByUrl('/feed');
			}
		}
		else {
			var success: boolean = this.auth.login(this.mailField, this.passwordField);
			console.log(success);

			if (success) {
				this.router.navigateByUrl('/feed');
			}
		}
	}

	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit() {
	}

}
