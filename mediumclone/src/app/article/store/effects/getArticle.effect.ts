import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ArticleService as SharedArticleService} from '../../../shared/services/article.service';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from '../actions/getArticle.action';
import {catchError, map, of, switchMap} from 'rxjs';
import {ArticleInterface} from '../../../shared/types/article.interface';

@Injectable()
export class GetArticleEffect {
  private actions$: Actions = inject(Actions);
  private sharedArticleService: SharedArticleService = inject(SharedArticleService);

  public getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slugUrl}: {slugUrl: string}) => {
        return this.sharedArticleService.getArticle(slugUrl).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({article});
          }),
          catchError(() => {
            return of(getArticleFailureAction());
          })
        );
      })
    )
  );
}
