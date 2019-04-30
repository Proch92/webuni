import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
	accounts;
	docs;
	results_acc = [];
	results_doc = [];

	constructor(private db: DatabaseService) { }

	ngOnInit() {
		this.db.select('account', {}).subscribe(acc => {
			this.accounts = acc;
		});
		this.db.select('doc', {}).subscribe(docs => {
			this.docs = docs;
		});
	}

	onSearch(event:any) {
		var keyword = event.srcElement.value;
		if (keyword == "") {
			this.results_doc = [];
			this.results_acc = [];
		} else {
			this.results_doc = this.docs.filter(d => d.name.toLowerCase().indexOf(keyword) >= 0);
			this.results_acc = this.accounts.filter(a => a.name.toLowerCase().indexOf(keyword) >= 0);
		}
	}

}
