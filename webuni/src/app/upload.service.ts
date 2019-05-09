import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";

var url: string = "http://casatest.ddns.net:3000/upload";

@Injectable({
	providedIn: 'root'
})
export class UploadService {

	constructor(private http: HttpClient) { }

	// file from event.target.files[0]
	uploadFile(file: File, filename: string): Observable<HttpEvent<any>> {

		let formData = new FormData();
		formData.append('filename', filename);
		formData.append('pdfFile', file);

		let params = new HttpParams();

		const options = {
			params: params,
			reportProgress: true,
		};

		const req = new HttpRequest('POST', url, formData, options);
		return this.http.request(req);
	}
}
