import {CreateArticleStateInterface} from '../types/createArticleState.interface';
import {createReducer, on} from '@ngrx/store';
import {createArticleAction, createArticleFailureAction, createArticleSuccessAction} from './actions/createArticle.action';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null
};

export const createArticleReducer = createReducer(
  initialState,
  on(
    createArticleAction,
    (state: CreateArticleStateInterface): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    createArticleSuccessAction,
    (state: CreateArticleStateInterface): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    createArticleFailureAction,
    (state: CreateArticleStateInterface, action: {errors: BackendErrorsInterface}): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
);
