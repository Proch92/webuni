import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DatabaseService } from '../database.service';
import { SessionService } from '../session.service';
import { UploadService } from '../upload.service';
import { EventService } from '../event.service';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
	selector: 'app-doc',
	templateUrl: './doc.component.html',
	styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {

	doc = null;
	versions = null;
	activeVersion = null;
	highestVersion = 0;
	path = "";
	sessionID = "";


	constructor(
		private db: DatabaseService,
		private session: SessionService,
		private route: ActivatedRoute,
		private router: Router,
		private upload:UploadService,
		private events:EventService
	) { }

	ngOnInit() {
		this.sessionID = this.session.getAccountID();

		this.route.params.forEach((params) => {
			var id = params['id'];
			var	versionID = params['version'];

			this.db.select('doc', {id: id})
				.subscribe((data: any[]) => {
					this.doc = data[0];

					this.db.select('version', {docid: this.doc.id})
						.subscribe((versions: Array<Object>) => {
							this.versions = versions.sort((a,b) => b['version'] - a['version']);

							if (versionID) {
								this.activeVersion = this.versions.filter(v => v['id'] == versionID)[0];
							} else {
								this.activeVersion = this.versions[0];
							}

							this.path = "/documents/" + this.activeVersion.filename;
							this.loadBoards(this.activeVersion.id);
						});
				});
		})
	}

	// reviews --------------------------------------------
	mouseCoordinates = {x: -100, y: -100};
	markerCoordinates = {x: "-100px", y: "-100px"};
	addboardCoordinates = {x: "-100px", y: "-100px"};
	isMouseOver: boolean = false;
	commentField = "";
	commentTitleField = "";
	boards = null;

	loadBoards(versionid) {
		this.db.select('board', {version: versionid})
			.subscribe(boards => {
				this.boards = boards;
			});
	}

	onApply() {
		var ref = {x:this.addboardCoordinates.x, y: this.addboardCoordinates.y};
		this.db.insert('board', {version: this.activeVersion.id, reference: ref, title: this.commentTitleField, owner: this.sessionID})
			.subscribe(newboard => {
				this.db.insert('comment', {board: newboard['id'], text: this.commentField, owner: this.sessionID})
					.subscribe(_ => this.commentField = "");

				this.events.sendEvent({
					type: "newboard", 
					owner: this.sessionID, 
					verb: 'opened a new board on',
					title: this.commentTitleField, 
					message: this.commentField,
					targetName: this.doc.name,
					link: '/doc/'+this.doc.id
				});
				
				this.loadBoards(this.activeVersion.id);
				this.commentTitleField = "";
				$('#addCommentModal').modal('hide');

			});
	}

	onPdfClick(event: any) {
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

	// ----------------- versioning --------------------------
	freezeCommentField = "";
	file;

	fileChange(event) {
		this.file = event.target.files[0];
	}

	onApplyFreeze() {
		let filename = randFilename();

		this.upload.uploadFile(this.file, filename)
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

		this.db.insert('version', {'docid': this.doc.id, 'comment': this.freezeCommentField, 'filename': filename, 'version': this.versions[0].version + 1})
			.subscribe(data => {
				this.events.sendEvent({
					type: "newversion", 
					owner: this.sessionID, 
					verb: 'submitted a new version:',
					title: this.commentTitleField, 
					message: this.freezeCommentField,
					targetName: this.doc.name,
					link: '/doc/'+this.doc.id
				});
				this.router.navigateByUrl('/doc/' + this.doc.id);
			});
	}

	///////////////////////////////////////////////////////////

	toStrPx(val: number): string {
		return "" + val + "px";
	}

}

function randFilename(): string {
	var S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+S4()+S4()+S4()+'.pdf');
}