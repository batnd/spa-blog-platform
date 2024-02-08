import {createReducer, on} from '@ngrx/store';
import {BackendErrorsInterface} from '../../shared/types/backendErrors.interface';
import {EditArticleStateInterface} from '../types/editArticleState.interface';
import {updateArticleAction, updateArticleFailureAction, updateArticleSuccessAction} from './actions/editArticle.action';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from './actions/getArticle.action';
import {ArticleInterface} from '../../shared/types/article.interface';
import {routerNavigatedAction} from '@ngrx/router-store';

const initialState: EditArticleStateInterface = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null
};

export const editeArticleReducer = createReducer(
  initialState,
  on(
    updateArticleAction,
    (state: EditArticleStateInterface): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    updateArticleSuccessAction,
    (state: EditArticleStateInterface): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    updateArticleFailureAction,
    (state: EditArticleStateInterface, action: {errors: BackendErrorsInterface}): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    getArticleAction,
    (state: EditArticleStateInterface): EditArticleStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleSuccessAction,
    (state: EditArticleStateInterface, action: {article: ArticleInterface}): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article
    })
  ),
  on(
    getArticleFailureAction,
    (state: EditArticleStateInterface): EditArticleStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(routerNavigatedAction, () => initialState)
);
