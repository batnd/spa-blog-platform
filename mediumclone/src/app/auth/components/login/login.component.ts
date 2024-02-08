import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {LoginRequestInterface} from '../../types/loginRequest.interface';
import {loginAction} from '../../store/actions/login.action';
import {authPageChangeAction} from '../../store/actions/authPageChange.action';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);
  public form: FormGroup;
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.store.dispatch(authPageChangeAction());
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  public onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value
    };
    this.store.dispatch(loginAction({request}));
  }
}
