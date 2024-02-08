import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './components/userProfile/userProfile.component';
import {UserProfileRoutingModule} from './userProfile-routing.module';
import {UserProfileService} from './services/userProfile.service';
import {EffectsModule} from '@ngrx/effects';
import {GetUserProfileEffect} from './store/effects/getUserProfile.effect';
import {StoreModule} from '@ngrx/store';
import {userProfileReducer} from './store/reducers';
import {FeedModule} from '../shared/modules/feed/feed.module';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', userProfileReducer),
    FeedModule
  ],
  declarations: [UserProfileComponent],
  providers: [UserProfileService]
})
export class UserProfileModule {}
