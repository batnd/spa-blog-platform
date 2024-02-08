import {FeedStateInterface} from '../types/feedState.interface';
import {createReducer, on} from '@ngrx/store';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from './actions/getFeed.action';
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface';
import {routerNavigationAction} from '@ngrx/router-store';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null
};

export const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state: FeedStateInterface): FeedStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(getFeedSuccessAction, (state: FeedStateInterface, action: {feed: GetFeedResponseInterface}) => ({
    ...state,
    isLoading: false,
    data: action.feed
  })),
  on(getFeedFailureAction, (state: FeedStateInterface) => ({
    ...state,
    isLoading: false
  })),
  on(routerNavigationAction, (): FeedStateInterface => initialState)
);
