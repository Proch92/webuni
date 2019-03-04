import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://192.168.1.13:3000/upload/';

@Component({
	selector: 'app-newdoc',
	templateUrl: './newdoc.component.html',
	styleUrls: ['./newdoc.component.scss']
})
export class NewdocComponent implements OnInit {

	public uploader:FileUploader = new FileUploader({url: URL});

	titleField: string = "";
	fileName: string = "";

	constructor(private db: DatabaseService, private session: SessionService) { }

	ngOnInit() {
	}

	onSubmit(): void {
		this.db.insert('doc', {name: this.titleField, owner: this.session.getAccountID(), filename: this.fileName});
		this.db.printDB();
	}

	fileSelection(event:any) {
		var file = event[0];
		this.fileName = file.name;
	}

	fileOverBase(event:any) {
		// change visual stuff
	}

}
