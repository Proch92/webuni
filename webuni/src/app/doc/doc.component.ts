import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DatabaseService } from '../database.service';

@Component({
	selector: 'app-doc',
	templateUrl: './doc.component.html',
	styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

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

	// reviews
	mouseCoordinates = {x: -100, y: -100, x_str: "-100px", y_str: "-100px"};
	isMouseOver: boolean = false;

	mouseEnter() {
		console.log("mouse enter");
		this.isMouseOver = true;
	}

	mouseLeave() {
		console.log("mouse leave");
		this.isMouseOver = false;
	}

	mouseMove(event: any) {
		this.isMouseOver = true;
		this.mouseCoordinates.x = event.clientX;
		this.mouseCoordinates.y = event.clientY;
		this.mouseCoordinates.x_str = "" + event.clientX + "px";
		this.mouseCoordinates.y_str = "" + event.clientY + "px";
	}

}
