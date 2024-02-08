import {Component, inject, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getPopularTagsAction} from '../../store/actions/getpopularTags.action';
import {Observable} from 'rxjs';
import {PopularTagType} from '../../../../types/popularTag.type';
import {errorSelector, isLoadingSelector, popularTagsSelector} from '../../store/selectors';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  styleUrls: ['./popularTags.component.scss']
})
export class PopularTagsComponent implements OnInit {
  private store: Store = inject(Store);
  public popularTags$: Observable<PopularTagType[] | null>;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
  }

  private fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }
}
