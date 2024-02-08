import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GlobalFeedComponent} from './components/globalFeed/globalFeed.component';

const routes: Routes = [{path: '', component: GlobalFeedComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalFeedRoutingModule {}
