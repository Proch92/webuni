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

	// reviews --------------------------------------------
	mouseCoordinates = {x: -100, y: -100};
	markerCoordinates = {x: "-100px", y: "-100px"};
	addcommentCoordinates = {x: "-100px", y: "-100px"};
	isMouseOver: boolean = false;
	commentField = "";
	commentTitleField = "";
	comments = []

	constructor(
		private db: DatabaseService,
		private session: SessionService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');

		this.db.select('doc', {id: id})
			.subscribe(data => {
				this.doc = data[0];
				this.path = "/documents/" + this.doc.filename;
			});
	}

	onMarkerClick() {
		$('#addCommentModal').modal('show');
		this.addcommentCoordinates.x = this.toStrPx(this.mouseCoordinates.x);
		this.addcommentCoordinates.y = this.toStrPx(this.mouseCoordinates.y);
	}

	onApply() {
		var ref = this.addcommentCoordinates.y;
		this.comments.push({reference: ref, title: this.commentTitleField, comment: this.commentField});
		this.commentField = "";
		this.commentTitleField = "";
		$('#addCommentModal').modal('hide');
	}

	confirmReview() {
		this.db.insert('review', {docid: this.doc.id, reviewer: this.session.getAccountID(), comments: this.comments})
			.subscribe(_ => this.comments = []);
	}

	deleteComment(index) {
		this.comments.splice(index, 1);
	}

	mouseEnter() {
		this.isMouseOver = true;
	}

	mouseLeave() {
		this.isMouseOver = false;
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
