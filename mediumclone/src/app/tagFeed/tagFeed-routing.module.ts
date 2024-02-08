import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TagFeedComponent} from './components/tagFeed/tagFeed.component';

const routes: Routes = [{path: 'tags/:slug', component: TagFeedComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagFeedRoutingModule {}
