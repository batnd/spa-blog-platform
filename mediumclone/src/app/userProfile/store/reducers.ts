import {UserProfileStateInterface} from '../types/userProfileState.interface';
import {createReducer, on} from '@ngrx/store';
import {getUserProfileAction, getUserProfileFailureAction, getUserProfileSuccessAction} from './actions/getUserProfile.action';
import {ProfileInterface} from '../../shared/types/profile.interface';

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null
};

export const userProfileReducer = createReducer(
  initialState,
  on(
    getUserProfileAction,
    (state: UserProfileStateInterface): UserProfileStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getUserProfileSuccessAction,
    (state: UserProfileStateInterface, action: {userProfile: ProfileInterface}): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: action.userProfile
    })
  ),
  on(
    getUserProfileFailureAction,
    (state: UserProfileStateInterface): UserProfileStateInterface => ({
      ...state,
      isLoading: false
    })
  )
);
