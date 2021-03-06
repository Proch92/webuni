import { Component, OnInit, NgZone } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';
import { UploadService } from '../upload.service';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
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
	file_selected: File = null;

	constructor(private router: Router, private db: DatabaseService, private session: SessionService, private upload:UploadService, private events:EventService, private zone:NgZone) { }

	ngOnInit() {
	}

	// At the file input element
	// (change)="fileChange($event)"
	fileChange(event) {
		var files = event.target.files;
		if (files.length > 0) {
			this.file_selected = files[0];
			console.log(this.file_selected);
		} else {
			this.file_selected = null;
		}
	}

	onUpload() {
		var filename = randFilename();

		this.upload.uploadFile(this.file_selected, filename)
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

		this.db.insert('doc', {'name': this.titleField, 'description': this.descriptionField, 'owner': this.session.getAccountID()})
			.subscribe(data => {
				this.db.insert('version', {'docid': data['id'], 'comment': 'first  version', 'filename': filename, 'version': 0})
					.subscribe(data => {
						console.log('new version');
						this.events.sendEvent({
							type: "newdoc", 
							owner: this.session.getAccountID(), 
							verb: 'submitted a new document:',
							title: this.titleField, 
							message: this.descriptionField,
							targetName: this.titleField,
							link: '/doc/'+data['id']
						});
					});

				this.zone.run(() => this.router.navigateByUrl('/rvwdash/'+this.session.getAccountID()));
			});
	}

}

function randFilename(): string {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+S4()+S4()+S4()+'.pdf');
}