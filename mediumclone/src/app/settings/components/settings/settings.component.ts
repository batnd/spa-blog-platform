import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {filter, Observable, Subscription} from 'rxjs';
import {currentUserSelector} from '../../../auth/store/selectors';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {updateCurrentUserAction} from '../../../auth/store/actions/updateCurrentUser.action';
import {CurrentUserInputInterface} from '../../../shared/types/currentUserInput.interface';
import {logoutAction} from '../../../auth/store/actions/sync.action';

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);
  public currentUser: CurrentUserInterface;
  public currentUserSubscription: Subscription;
  public form: FormGroup;

  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;
  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  public initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  private initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface): void => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }
  private initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    });
  }

  public submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value
    };
    this.store.dispatch(updateCurrentUserAction({currentUserInput}));
  }

  public logout(): void {
    this.store.dispatch(logoutAction());
  }
}
