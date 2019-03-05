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

}
