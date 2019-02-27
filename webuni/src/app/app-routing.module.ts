import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedComponent } from './feed/feed.component'
import { ReviewsDashboardComponent } from './reviews-dashboard/reviews-dashboard.component'

const routes: Routes = [
	{ path: '', redirectTo: '/feed', pathMatch: 'full' },
	{ path: 'feed', component: FeedComponent},
	{ path: 'rvwdash', component: ReviewsDashboardComponent}
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
