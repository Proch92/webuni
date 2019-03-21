import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	server = "http://192.168.1.13:3001/";
	
	constructor(private http: HttpClient) {
	}

	select(table, filter) {
		console.log('select', filter);
		return this.http.get(this.fullUrl('db/' + table), {params: filter});
	}

	insert(table, record) {
		return this.http.post(this.fullUrl('db/' + table), record, this.httpOptions);
	}

	fullUrl(uri) {
		return this.server + uri;
	}
}