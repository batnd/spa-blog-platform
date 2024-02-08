import {SettingsStateInterface} from './types/settingsState.interface';
import {createReducer, on} from '@ngrx/store';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from '../../auth/store/actions/updateCurrentUser.action';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null
};

export const settingsReducers = createReducer(
  initialState,
  on(
    updateCurrentUserAction,
    (state: SettingsStateInterface): SettingsStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state: SettingsStateInterface): SettingsStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    updateCurrentUserFailureAction,
    (state: SettingsStateInterface, action: {errors: BackendErrorsInterface}): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
);
