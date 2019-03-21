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

	constructor(
		private db: DatabaseService,
		private session: SessionService
	) { }

	ngOnInit() {
		this.loadComments()
	}

	loadComments() {
		this.db.select('comment', {board: this.board['id']})
			.subscribe(comments => this.comments = comments);
	}

	onApply() {
		this.db.insert('comment', {board: this.board['id'], text: this.commentField, owner: this.session.getAccountID()})
			.subscribe(_ => this.loadComments());
	}

	onMarkerClick(event: any) {
		$('#boardModal').modal('show');
		event.stopPropagation();
		event.preventDefault();
	}

}
