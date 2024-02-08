import {inject, Injectable} from '@angular/core';
import {catchError, map, of, switchMap} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {FeedService} from '../../services/feed.service';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from '../actions/getFeed.action';
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffect {
  private actions$: Actions = inject(Actions);
  private feedService: FeedService = inject(FeedService);

  public getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({url}: {url: string}) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({feed});
          }),
          catchError(() => {
            return of(getFeedFailureAction());
          })
        );
      })
    )
  );
}
