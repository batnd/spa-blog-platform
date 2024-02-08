import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {PersistanceService} from '../../../shared/services/persistance.service';
import {getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction} from '../actions/getCurrentUser.action';
import {catchError, map, of, switchMap} from 'rxjs';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

@Injectable()
export class GetCurrentUserEffect {
  private actions$: Actions = inject(Actions);
  private authService: AuthService = inject(AuthService);
  private persistanceService: PersistanceService = inject(PersistanceService);

  public getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get('accessToken');
        if (!token) return of(getCurrentUserFailureAction());

        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({currentUser});
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );
}
