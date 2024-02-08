import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {updateCurrentUserAction, updateCurrentUserFailureAction, updateCurrentUserSuccessAction} from '../actions/updateCurrentUser.action';

@Injectable()
export class UpdateCurrentUserEffect {
  private actions$: Actions = inject(Actions);
  private authService: AuthService = inject(AuthService);

  public updateCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCurrentUserAction),
      switchMap(({currentUserInput}) => {
        return this.authService.updateCurrentUser(currentUserInput).pipe(
          map((currentUser: CurrentUserInterface) => {
            return updateCurrentUserSuccessAction({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(updateCurrentUserFailureAction({errors: errorResponse.error.errors}));
          })
        );
      })
    )
  );
}
