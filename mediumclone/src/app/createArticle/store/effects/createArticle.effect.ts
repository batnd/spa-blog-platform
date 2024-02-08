import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CreateArticleService} from '../../services/createArticle.service';
import {Router} from '@angular/router';
import {createArticleAction, createArticleFailureAction, createArticleSuccessAction} from '../actions/createArticle.action';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class CreateArticleEffect {
  private actions$: Actions = inject(Actions);
  private createArticleService: CreateArticleService = inject(CreateArticleService);
  private router: Router = inject(Router);

  public createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({articleInput}: {articleInput: ArticleInputInterface}) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(createArticleFailureAction({errors: errorResponse.error.errors}));
          })
        );
      })
    )
  );

  public redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({article}: {article: ArticleInterface}): void => {
          this.router.navigate(['/articles', article.slug]);
        })
      ),
    {dispatch: false}
  );
}
