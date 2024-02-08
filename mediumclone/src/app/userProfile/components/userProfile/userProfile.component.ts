import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ProfileInterface} from '../../../shared/types/profile.interface';
import {combineLatest, filter, map, Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getUserProfileAction} from '../../store/actions/getUserProfile.action';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {errorSelector, isLoadingSelector, userProfileSelector} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

@Component({
  selector: 'mc-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./userProfile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private store: Store = inject(Store);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  public userProfile: ProfileInterface;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public slug: string;
  public userProfileSubscription: Subscription;
  public apiUrl: string;
  public isCurrentUserProfile$: Observable<boolean>;

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.userProfileSubscription.unsubscribe();
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(([currentUser, userProfile]: [CurrentUserInterface, ProfileInterface]): boolean => {
        return currentUser.username === userProfile.username;
      })
    );
  }

  private initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: ProfileInterface) => (this.userProfile = userProfile));

    this.route.params.subscribe((params: Params): void => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  public getApiUrl(): string {
    const isFavorites: boolean = this.router.url.includes('favorites');
    return (this.apiUrl = isFavorites ? `articles?favorited=${this.slug}` : `articles?author=${this.slug}`);
  }

  public fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({slug: this.slug}));
  }
}
