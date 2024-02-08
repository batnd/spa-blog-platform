import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {PersistanceService} from '../../../shared/services/persistance.service';
import {loginAction, loginFailureAction, loginSuccessAction} from '../actions/login.action';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

@Injectable()
export class LoginEffect {
  private actions$: Actions = inject(Actions);
  private authService: AuthService = inject(AuthService);
  private persistanceService: PersistanceService = inject(PersistanceService);
  private router: Router = inject(Router);

  public login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return loginSuccessAction({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailureAction({errors: errorResponse.error.errors}));
          })
        );
      })
    )
  );

  public redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap((): void => {
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );
}
