import {AuthStateInterface} from '../types/authState.interface';
import {createReducer, on} from '@ngrx/store';
import {registerAction, registerFailureAction, registerSuccessAction} from './actions/register.action';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';
import {loginAction, loginFailureAction, loginSuccessAction} from './actions/login.action';
import {getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction} from './actions/getCurrentUser.action';
import {authPageChangeAction} from './actions/authPageChange.action';
import {updateCurrentUserSuccessAction} from './actions/updateCurrentUser.action';
import {logoutAction} from './actions/sync.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null
};

export const authReducer = createReducer(
  initialState,
  on(
    authPageChangeAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      validationErrors: null
    })
  ),
  on(
    registerAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    registerSuccessAction,
    (state: AuthStateInterface, action: {currentUser: CurrentUserInterface}): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    registerFailureAction,
    (state: AuthStateInterface, action: {errors: BackendErrorsInterface}): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    loginAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    loginSuccessAction,
    (state: AuthStateInterface, action: {currentUser: CurrentUserInterface}): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    loginFailureAction,
    (state: AuthStateInterface, action: {errors: BackendErrorsInterface}): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    getCurrentUserAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state: AuthStateInterface, action: {currentUser: CurrentUserInterface}): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state: AuthStateInterface): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state: AuthStateInterface, action: {currentUser: CurrentUserInterface}): AuthStateInterface => ({
      ...state,
      currentUser: action.currentUser
    })
  ),
  on(
    logoutAction,
    (): AuthStateInterface => ({
      ...initialState,
      isLoggedIn: false
    })
  )
);
