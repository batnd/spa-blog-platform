import {inject, Injectable} from '@angular/core';
import {AddToFavoritesService} from '../../services/addToFavorites.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addToFavoritesAction, addToFavoritesFailureAction, addToFavoritesSuccessAction} from '../actions/addToFavorites.action';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {ArticleInterface} from '../../../../types/article.interface';

@Injectable()
export class AddToFavoritesEffect {
  private actions$: Actions = inject(Actions);
  private addToFavoriteService: AddToFavoritesService = inject(AddToFavoritesService);

  public addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({isFavorited, slug}) => {
        const article$: Observable<ArticleInterface> = isFavorited
          ? this.addToFavoriteService.removeFromFavorites(slug)
          : this.addToFavoriteService.addToFavorites(slug);

        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({article});
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction());
          })
        );
      })
    )
  );
}
