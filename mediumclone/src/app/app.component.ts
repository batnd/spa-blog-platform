import {Component, inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {getCurrentUserAction} from './auth/store/actions/getCurrentUser.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private store: Store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }
}
