import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UserProfileComponent} from './components/userProfile/userProfile.component';

const routes: Routes = [
  {path: 'profiles/:slug', component: UserProfileComponent},
  {path: 'profiles/:slug/favorites', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {}
