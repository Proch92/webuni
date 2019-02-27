import { Component, OnInit } from '@angular/core';
import { Doc } from '../doc'
import { DOCS } from '../mock-docs'

@Component({
	selector: 'app-reviews-dashboard',
	templateUrl: './reviews-dashboard.component.html',
	styleUrls: ['./reviews-dashboard.component.scss']
})
export class ReviewsDashboardComponent implements OnInit {

	docs = DOCS;

	constructor() { }

	ngOnInit() {
	}

}
