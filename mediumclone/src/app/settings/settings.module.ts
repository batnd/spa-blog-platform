import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './components/settings/settings.component';
import {SettingsRoutingModule} from './settings-routing.module';
import {StoreModule} from '@ngrx/store';
import {settingsReducers} from './store/reducers';
import {ReactiveFormsModule} from '@angular/forms';
import {BackendErrorMessagesModule} from '../shared/modules/backendErrorMessages/backendErrorMessages.module';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    StoreModule.forFeature('settings', settingsReducers),
    ReactiveFormsModule,
    BackendErrorMessagesModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
