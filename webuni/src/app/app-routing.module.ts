import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeedComponent } from './feed/feed.component';
import { ReviewsDashboardComponent } from './reviews-dashboard/reviews-dashboard.component'
import { LoginComponent } from './login/login.component';
import { DocComponent } from './doc/doc.component';
import { NewdocComponent } from './newdoc/newdoc.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'feed', component: FeedComponent },
	{ path: 'rvwdash/:id', component: ReviewsDashboardComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'doc/:id', component: DocComponent },
	{ path: 'doc/:id/:version', component: DocComponent },
	{ path: 'doc/:id/:version/:board', component: DocComponent },
	{ path: 'newdoc', component: NewdocComponent }
]

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
