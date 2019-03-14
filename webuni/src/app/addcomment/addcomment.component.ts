import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-addcomment',
	templateUrl: './addcomment.component.html',
	styleUrls: ['./addcomment.component.scss']
})
export class AddcommentComponent implements OnInit {

	@Output() onSubmitComment = new EventEmitter<any>();
	textField: string = "";

	constructor() { }

	ngOnInit() {

	}

	onSubmit() {
		this.onSubmitComment.emit(this.textField);
	}

	reset() {
		this.textField = "";
	}

}
