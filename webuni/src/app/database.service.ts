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

	server = "http://casatest.ddns.net:3001/";
	
	constructor(private http: HttpClient) {
	}

	select(table, filter) {
		return this.http.get(this.fullUrl('db/' + table), {params: filter});
	}

	insert(table, record) {
		return this.http.post(this.fullUrl('db/' + table), record, this.httpOptions);
	}

	delete(table, filter) {
		return this.http.delete(this.fullUrl('db/' + table), {params: filter});
	}

	fullUrl(uri) {
		return this.server + uri;
	}
}