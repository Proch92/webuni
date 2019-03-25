import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service'

@Component({
	selector: 'app-doc',
	templateUrl: './doc.component.html',
	styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

	doc = null;
	path = "";
	sessionID = "";

	// reviews --------------------------------------------
	mouseCoordinates = {x: -100, y: -100};
	markerCoordinates = {x: "-100px", y: "-100px"};
	addboardCoordinates = {x: "-100px", y: "-100px"};
	isMouseOver: boolean = false;
	commentField = "";
	commentTitleField = "";
	boards = null;

	constructor(
		private db: DatabaseService,
		private session: SessionService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');
		this.sessionID = this.session.getAccountID();

		this.db.select('doc', {id: id})
			.subscribe((data: any[]) => {
				this.doc = data[0];
				this.path = "/documents/" + this.doc.filename;
				this.loadBoards();
			});
	}

	loadBoards() {
		this.db.select('board', {doc: this.doc.id})
			.subscribe(boards => {
				this.boards = boards;
				console.log("boards loaded", boards);
			});
	}

	onApply() {
		var ref = {x:this.addboardCoordinates.x, y: this.addboardCoordinates.y};
		this.db.insert('board', {doc: this.doc.id, reference: ref, title: this.commentTitleField, owner: this.sessionID})
			.subscribe(newboard => {
				console.log('board inserted in db', newboard);
				this.db.insert('comment', {board: newboard['id'], text: this.commentField, owner: this.sessionID})
					.subscribe(_ => this.commentField = "");
				
				this.loadBoards();
				this.commentTitleField = "";
				$('#addCommentModal').modal('hide');
			});
	}

	onPdfClick(event: any) {
		console.log("open pdf modal");
		$('#addCommentModal').modal('show');
		this.addboardCoordinates.x = this.toStrPx(event.layerX);
		this.addboardCoordinates.y = this.toStrPx(event.layerY);
	}

	mouseMove(event: any) {
		this.isMouseOver = true;
		this.mouseCoordinates.x = event.clientX + window.pageXOffset;
		this.mouseCoordinates.y = event.clientY + window.pageYOffset;

		var x_offset = $("#pdf-viewer").offset().left;
		this.markerCoordinates.x = this.toStrPx(x_offset + 10);
		this.markerCoordinates.y = this.toStrPx(this.mouseCoordinates.y - 10);
	}

	isModalOpen() {
		return $('#addCommentModal').hasClass('show');
	}

	toStrPx(val: number): string {
		return "" + val + "px";
	}

}
