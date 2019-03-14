import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DatabaseService } from '../database.service';
import { AddcommentComponent } from '../addcomment/addcomment.component'

@Component({
	selector: 'app-doc',
	templateUrl: './doc.component.html',
	styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

	@ViewChild(AddcommentComponent) addcommentComponent:AddcommentComponent;

	doc = null;
	path = "";

	constructor(
		private db: DatabaseService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');

		this.doc = this.db.select('doc', {id: id})[0];
		this.path = "/documents/" + this.doc.filename;
	}

	// reviews --------------------------------------------
	mouseCoordinates = {x: -100, y: -100};
	markerCoordinates = {x: "-100px", y: "-100px"};
	addcommentCoordinates = {x: "-100px", y: "-100px"};
	isMouseOver: boolean = false;
	addingComment: boolean = false;
	comments = []

	mouseEnter() {
		this.isMouseOver = true;
	}

	mouseLeave() {
		this.isMouseOver = false;
	}

	mouseMove(event: any) {
		console.log(window.pageYOffset);
		this.isMouseOver = true;
		this.mouseCoordinates.x = event.clientX + window.pageXOffset;
		this.mouseCoordinates.y = event.clientY + window.pageYOffset;
		this.markerCoordinates.x = this.toStrPx(this.mouseCoordinates.x);
		this.markerCoordinates.y = this.toStrPx(this.mouseCoordinates.y);
	}

	markerMouseDown() {
		console.log('marker mouse down');
		this.addingComment = true;
		this.addcommentCoordinates.x = this.toStrPx(this.mouseCoordinates.x);
		this.addcommentCoordinates.y = this.toStrPx(this.mouseCoordinates.y);
	}

	onSubmitComment(event: any) {
		console.log("comment submit");
		var ref = this.addcommentCoordinates.y;
		this.comments.push({reference: ref, comment: event});
		this.addingComment = false;
		this.addcommentComponent.reset();
	}

	toStrPx(val: number): string {
		return "" + val + "px";
	}

}
