import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FeedComponent } from './feed/feed.component';
import { AppRoutingModule } from './app-routing.module';
import { ReviewsDashboardComponent } from './reviews-dashboard/reviews-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SearchbarComponent,
    FeedComponent,
    ReviewsDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
