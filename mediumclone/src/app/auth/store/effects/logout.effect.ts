import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {logoutAction} from '../actions/sync.action';
import {tap} from 'rxjs';
import {PersistanceService} from '../../../shared/services/persistance.service';
import {Router} from '@angular/router';

@Injectable()
export class LogoutEffect {
  private actions$: Actions = inject(Actions);
  private persistanceService: PersistanceService = inject(PersistanceService);
  private router: Router = inject(Router);

  public logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistanceService.set('accessToken', '');
          this.router.navigateByUrl('/');
        })
      ),
    {dispatch: false}
  );
}
