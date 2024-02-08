import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserProfileService} from '../../services/userProfile.service';
import {getUserProfileAction, getUserProfileFailureAction, getUserProfileSuccessAction} from '../actions/getUserProfile.action';
import {catchError, map, of, switchMap} from 'rxjs';
import {ProfileInterface} from '../../../shared/types/profile.interface';

@Injectable()
export class GetUserProfileEffect {
  private actions$: Actions = inject(Actions);
  private userProfileService: UserProfileService = inject(UserProfileService);

  public getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({slug}) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: ProfileInterface) => {
            return getUserProfileSuccessAction({userProfile});
          }),
          catchError(() => {
            return of(getUserProfileFailureAction());
          })
        );
      })
    )
  );
}
