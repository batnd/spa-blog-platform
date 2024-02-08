import {AppStateInterface} from '../../shared/types/appState.interface';
import {AuthStateInterface} from '../../auth/types/authState.interface';
import {createSelector} from '@ngrx/store';
import {SettingsStateInterface} from './types/settingsState.interface';

export const settingsFeatureSelector = (state: AppStateInterface): SettingsStateInterface => state.settings;

export const isSubmittingSelector = createSelector(settingsFeatureSelector, (settingsState: SettingsStateInterface) => settingsState.isSubmitting);
export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface) => settingsState.validationErrors
);
