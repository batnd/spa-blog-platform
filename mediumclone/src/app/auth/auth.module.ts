import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

import {RegisterComponent} from 'src/app/auth/components/register/register.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/reducers';
import {AuthService} from './services/auth.service';
import {EffectsModule} from '@ngrx/effects';
import {RegisterEffect} from './store/effects/register.effect';
import {BackendErrorMessagesModule} from '../shared/modules/backendErrorMessages/backendErrorMessages.module';
import {PersistanceService} from '../shared/services/persistance.service';
import {LoginEffect} from './store/effects/login.effect';
import {LoginComponent} from './components/login/login.component';
import {GetCurrentUserEffect} from './store/effects/getCurrentUser.effect';
import {UpdateCurrentUserEffect} from './store/effects/updateCurrentUser.effect';
import {LogoutEffect} from './store/effects/logout.effect';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect, UpdateCurrentUserEffect, LogoutEffect])
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService]
})
export class AuthModule {}
