import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {ArticleService as SharedArticleService} from '../../../shared/services/article.service';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from '../actions/getArticle.action';

@Injectable()
export class GetArticleEffect {
  private actions$: Actions = inject(Actions);
  private sharedArticleService: SharedArticleService = inject(SharedArticleService);

  public getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}: {slug: string}) => {
        return this.sharedArticleService.getArticle(slug).pipe(
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
