import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PopularTagsService} from '../../services/popularTags.service';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from '../actions/getpopularTags.action';
import {catchError, map, of, switchMap} from 'rxjs';
import {PopularTagType} from '../../../../types/popularTag.type';

@Injectable()
export class GetPopularTagsEffect {
  private actions$: Actions = inject(Actions);
  private popularTagsService: PopularTagsService = inject(PopularTagsService);

  public getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({popularTags});
          }),
          catchError(() => {
            return of(getPopularTagsFailureAction());
          })
        );
      })
    )
  );
}
