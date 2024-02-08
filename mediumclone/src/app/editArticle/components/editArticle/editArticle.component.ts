import {Component, inject, OnInit} from '@angular/core';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {filter, map, Observable} from 'rxjs';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {select, Store} from '@ngrx/store';
import {articleSelector, isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {ActivatedRoute} from '@angular/router';
import {getArticleAction} from '../../store/actions/getArticle.action';
import {createArticleAction} from '../../../createArticle/store/actions/createArticle.action';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {updateArticleAction} from '../../store/actions/editArticle.action';

@Component({
  selector: 'mc-edit-article',
  templateUrl: './editArticle.component.html',
  styleUrls: ['./editArticle.component.scss']
})
export class EditArticleComponent implements OnInit {
  private store: Store = inject(Store);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private slug: string;
  public initialValues$: Observable<ArticleInputInterface>;
  public isLoading$: Observable<boolean>;
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }
  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean), // when dont null/undefined
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        };
      })
    );
  }
  private fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }
  public onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}));
  }
}
