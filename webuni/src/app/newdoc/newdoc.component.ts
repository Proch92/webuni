import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';
import { UploadService } from '../upload.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

const URL = 'http://192.168.1.13:3000/upload/';

@Component({
	selector: 'app-newdoc',
	templateUrl: './newdoc.component.html',
	styleUrls: ['./newdoc.component.scss']
})
export class NewdocComponent implements OnInit {

	titleField: string = "";
	descriptionField: string = "";

	constructor(private router: Router, private db: DatabaseService, private session: SessionService, private upload:UploadService) { }

	ngOnInit() {
	}

	// At the file input element
	// (change)="fileChange($event)"
	fileChange(event) {
		this.uploadFile(event.target.files);
	}

	uploadFile(files: FileList) {
		if (files.length == 0) {
			console.log("No file selected!");
			return;
		}

		var filename = randFilename();

		let file: File = files[0];

		this.upload.uploadFile(file, filename)
			.subscribe(
				event => {
					if (event.type == HttpEventType.UploadProgress) {
						const percentDone = Math.round(100 * event.loaded / event.total);
						console.log('File is ${percentDone}% loaded.');
					} else if (event instanceof HttpResponse) {
						console.log('File is completely loaded!');
					}
				},
				(err) => {
					console.log("Upload Error:", err);
				}, () => {
					console.log("Upload done");
				}
			)

		this.db.insert('doc', {'name': this.titleField, 'description': this.descriptionField, 'owner': this.session.getAccountID(), 'filename': filename})
			.subscribe(data => this.router.navigateByUrl('/rvwdash'));
	}

}

function randFilename(): string {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+S4()+S4()+S4()+'.pdf');
}