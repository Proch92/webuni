import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }	 from '@angular/forms';
import { LockerModule } from 'angular-safeguard';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FeedComponent } from './feed/feed.component';
import { AppRoutingModule } from './app-routing.module';
import { ReviewsDashboardComponent } from './reviews-dashboard/reviews-dashboard.component';
import { LoginComponent } from './login/login.component';
import { DocComponent } from './doc/doc.component';
import { NewdocComponent } from './newdoc/newdoc.component';
import { AddcommentComponent } from './addcomment/addcomment.component';

@NgModule({
	declarations: [
		AppComponent,
		TopbarComponent,
		SearchbarComponent,
		FeedComponent,
		ReviewsDashboardComponent,
		LoginComponent,
		DocComponent,
		NewdocComponent,
		AddcommentComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		LockerModule,
		PdfViewerModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
