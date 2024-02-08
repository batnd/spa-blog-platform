import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EditArticleService} from '../../services/editArticle.service';
import {Router} from '@angular/router';
import {updateArticleAction, updateArticleFailureAction, updateArticleSuccessAction} from '../actions/editArticle.action';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class UpdateArticleEffect {
  private actions$: Actions = inject(Actions);
  private editArticleService: EditArticleService = inject(EditArticleService);
  private router: Router = inject(Router);

  public updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateArticleAction),
      switchMap(({slug, articleInput}: {slug: string; articleInput: ArticleInputInterface}) => {
        return this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) => {
            return updateArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(updateArticleFailureAction({errors: errorResponse.error.errors}));
          })
        );
      })
    )
  );

  public redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateArticleSuccessAction),
        tap(({article}: {article: ArticleInterface}): void => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    {dispatch: false}
  );
}
