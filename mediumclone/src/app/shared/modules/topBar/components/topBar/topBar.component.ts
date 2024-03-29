import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CurrentUserInterface} from '../../../../types/currentUser.interface';
import {select, Store} from '@ngrx/store';
import {currentUserSelector, isAnonymousSelector, isLoggedInSelector} from '../../../../../auth/store/selectors';

@Component({
  selector: 'mc-topBar',
  templateUrl: './topBar.component.html',
  styleUrls: ['./topBar.component.scss']
})
export class TopBarComponent implements OnInit {
  private store: Store = inject(Store);
  public isLoggedIn$: Observable<boolean>;
  public isAnonymous$: Observable<boolean>;
  public currentUser$: Observable<CurrentUserInterface | null>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
  }
}
