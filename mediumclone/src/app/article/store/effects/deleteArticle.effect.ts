import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ArticleService} from '../../services/article.service';
import {deleteArticleAction, deleteArticleFailureAction, deleteArticleSuccessAction} from '../actions/deleteArticle.action';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class DeleteArticleEffect {
  private actions$: Actions = inject(Actions);
  private articleService: ArticleService = inject(ArticleService);
  public router: Router = inject(Router);

  public deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticleAction),
      switchMap(({slug}: {slug: string}) => {
        return this.articleService.deleteArticle(slug).pipe(
          map(() => {
            return deleteArticleSuccessAction();
          }),
          catchError(() => {
            return of(deleteArticleFailureAction());
          })
        );
      })
    )
  );

  public redirectAfterDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteArticleSuccessAction),
        tap((): void => {
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );
}
