import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {registerAction} from '../../store/actions/register.action';
import {Observable} from 'rxjs';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {authPageChangeAction} from '../../store/actions/authPageChange.action';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      username: ['', Validators.required],
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
    const request: RegisterRequestInterface = {
      user: this.form.value
    };
    this.store.dispatch(registerAction({request}));
  }
}
