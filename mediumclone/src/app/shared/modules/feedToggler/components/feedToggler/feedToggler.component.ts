import {Component, inject, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {isLoggedInSelector} from 'src/app/auth/store/selectors';
import {IsActiveMatchOptions} from '@angular/router';

@Component({
  selector: 'mc-feed-toggler',
  templateUrl: './feedToggler.component.html',
  styleUrls: ['./feedToggler.component.scss']
})
export class FeedTogglerComponent implements OnInit {
  private store: Store = inject(Store);
  @Input('tagName')
  public tagNameProps: string | null;
  public isLoggedIn$: Observable<boolean>;
  public IsActiveMatchOptions: IsActiveMatchOptions = {
    matrixParams: 'ignored',
    queryParams: 'subset',
    paths: 'exact',
    fragment: 'ignored'
  };

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }
}
