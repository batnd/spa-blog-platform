import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {createReducer, on} from '@ngrx/store';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from './actions/getpopularTags.action';
import {PopularTagType} from '../../../types/popularTag.type';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null
};

export const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state: PopularTagsStateInterface): PopularTagsStateInterface => ({
      ...state,
      isLoading: true,
      data: null
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state: PopularTagsStateInterface, action: {popularTags: PopularTagType[]}): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state: PopularTagsStateInterface): PopularTagsStateInterface => ({
      ...state,
      isLoading: false
    })
  )
);
