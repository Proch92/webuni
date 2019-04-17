import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service'

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

	@Input() board;

	commentField = "";
	comments;
	accounts;

	constructor(
		private db: DatabaseService,
		private session: SessionService
	) { }

	ngOnInit() {
		this.loadComments()
		this.loadAccounts() // bad in real applications
	}

	loadComments() {
		this.db.select('comment', {board: this.board['id']})
			.subscribe(comments => {
				this.comments = comments;
			});
	}

	loadAccounts() {
		this.db.select('account', {})
			.subscribe(accounts => {
				this.accounts = accounts;
			});
	}

	findOwner(owner) {
		return this.accounts.filter(a => a.id === owner)[0].name
	}

	onApply() {
		this.db.insert('comment', {board: this.board['id'], text: this.commentField, owner: this.session.getAccountID()})
			.subscribe(_ => this.loadComments());
	}

	onMarkerClick(event: any) {
		$('#' + this.board['id']).modal('show');
		event.stopPropagation();
		event.preventDefault();
	}

}
