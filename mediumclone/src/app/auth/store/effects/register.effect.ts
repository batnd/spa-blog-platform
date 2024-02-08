import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap, map, catchError, of, tap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {registerAction, registerFailureAction, registerSuccessAction} from '../actions/register.action';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {PersistanceService} from '../../../shared/services/persistance.service';

@Injectable()
export class RegisterEffect {
  private actions$: Actions = inject(Actions);
  private authService: AuthService = inject(AuthService);
  private persistanceService: PersistanceService = inject(PersistanceService);
  private router: Router = inject(Router);

  public register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return registerSuccessAction({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(registerFailureAction({errors: errorResponse.error.errors}));
          })
        );
      })
    )
  );

  public redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap((): void => {
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );
}
