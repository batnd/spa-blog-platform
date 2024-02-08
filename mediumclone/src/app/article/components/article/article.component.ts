import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getArticleAction} from '../../store/actions/getArticle.action';
import {ActivatedRoute} from '@angular/router';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {combineLatest, map, Observable, Subscription} from 'rxjs';
import {articleSelector, errorSelector, isLoadingSelector} from '../../store/selectors';
import {currentUserSelector} from '../../../auth/store/selectors';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {deleteArticleAction} from '../../store/actions/deleteArticle.action';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  private store: Store = inject(Store);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private slug: string;
  public article: ArticleInterface | null;
  private articleSubscription: Subscription;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public isAuthor$: Observable<boolean>;
  // public isAuthor;

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  private initializeValues(): void {
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest(this.store.pipe(select(articleSelector)), this.store.pipe(select(currentUserSelector))).pipe(
      map(([article, currentUser]: [ArticleInterface | null, CurrentUserInterface | null]): boolean => {
        if (!article || !currentUser) return false;
        return currentUser.username === article.author.username;
      })
    );
    // this.isAuthor = this.isAuthor$.subscribe((res) => res);
  }

  private initializeListeners(): void {
    this.articleSubscription = this.store.pipe(select(articleSelector)).subscribe((article: ArticleInterface | null) => (this.article = article));
  }

  private fetchData(): void {
    this.store.dispatch(getArticleAction({slugUrl: this.slug}));
  }

  public deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}));
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
