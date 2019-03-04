import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }	 from '@angular/forms';
import { LockerModule } from 'angular-safeguard';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FeedComponent } from './feed/feed.component';
import { AppRoutingModule } from './app-routing.module';
import { ReviewsDashboardComponent } from './reviews-dashboard/reviews-dashboard.component';
import { LoginComponent } from './login/login.component';
import { DocComponent } from './doc/doc.component';
import { NewdocComponent } from './newdoc/newdoc.component';

@NgModule({
	declarations: [
		AppComponent,
		TopbarComponent,
		SearchbarComponent,
		FeedComponent,
		ReviewsDashboardComponent,
		LoginComponent,
		DocComponent,
		NewdocComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		LockerModule,
		PdfViewerModule,
		FileUploadModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
