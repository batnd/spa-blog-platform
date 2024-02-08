import {Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import queryString from 'query-string';

import {getFeedAction} from '../../store/actions/getFeed.action';
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface';
import {errorSelector, feedSelector, isLoadingSelector} from '../../store/selectors';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  @Input('apiUrl')
  public apiUrlProps: string;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public feed$: Observable<GetFeedResponseInterface | null>;
  public limit: number = environment.limit;
  public baseUrl: string;
  public currentPage: number;
  private queryParamsSubscription: Subscription;

  private isAnyQueryParamsPrev: boolean = false;
  private isAnyQueryParamsNow: boolean = false;

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changesApiUrlProps: SimpleChange = changes['apiUrlProps'];
    const isApiUrlChanged: boolean = !changesApiUrlProps.firstChange && changesApiUrlProps.currentValue !== changesApiUrlProps.previousValue;
    if (isApiUrlChanged) {
      this.fetchFeed();
      this.baseUrl = this.router.url.split('?')[0];
    }
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.feed$ = this.store.pipe(select(feedSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  private initializeListeners(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params: Params): void => {
      this.isAnyQueryParamsNow = Object.keys(params).length !== 0;

      if (this.isAnyQueryParamsPrev && this.isAnyQueryParamsNow) {
        // console.log('Случай 1 - .../quia?page=2 -> .../quia?page=1');
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
        this.isAnyQueryParamsPrev = true;
        return;
      }
      if (!this.isAnyQueryParamsPrev && this.isAnyQueryParamsNow) {
        // console.log('Случай 2 - .../quia -> .../quia?page=2');
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
        this.isAnyQueryParamsPrev = true;
        return;
      }
      if (this.isAnyQueryParamsPrev && !this.isAnyQueryParamsNow) {
        // console.log('Случай 3 - .../quia?page=2 -> .../welcome');
        if (this.baseUrl === this.router.url.split('?')[0]) {
          this.fetchFeed();
        }
        this.currentPage = Number(params['page'] || '1');
        this.isAnyQueryParamsPrev = false;
        return;
      }
      if (!this.isAnyQueryParamsPrev && !this.isAnyQueryParamsNow) {
        // console.log('Случай 4 - Самый первый раз или когда нет query-параметров');
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
        return;
      }

      // this.currentPage = Number(params['page'] || '1');
      // this.fetchFeed();
    });
  }

  private fetchFeed(): void {
    const offset: number = this.currentPage * this.limit - this.limit;
    const parsedUrl: queryString.ParsedUrl = queryString.parseUrl(this.apiUrlProps);
    const stringifiedParams: string = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    });
    const apiUrlWithParams: string = `${parsedUrl.url}?${stringifiedParams}`;
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }
}
