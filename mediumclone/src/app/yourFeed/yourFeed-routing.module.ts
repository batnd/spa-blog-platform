import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {YourFeedComponent} from './components/yourFeed/yourFeed.component';

const routes: Routes = [{path: 'feed', component: YourFeedComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourFeedRoutingModule {}
