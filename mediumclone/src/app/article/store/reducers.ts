import {ArticleStateInterface} from '../types/articleState.interface';
import {createReducer, on} from '@ngrx/store';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from './actions/getArticle.action';
import {ArticleInterface} from '../../shared/types/article.interface';
import {routerNavigationAction} from '@ngrx/router-store';

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null
};

export const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state: ArticleStateInterface): ArticleStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleSuccessAction,
    (state: ArticleStateInterface, action: {article: ArticleInterface}): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article
    })
  ),
  on(
    getArticleFailureAction,
    (state: ArticleStateInterface): ArticleStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(routerNavigationAction, (): ArticleStateInterface => initialState)
);
