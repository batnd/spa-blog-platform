import {Component, inject, OnInit} from '@angular/core';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {Observable} from 'rxjs';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {select, Store} from '@ngrx/store';
import {isSubmittingSelector, validationErrorsSelector} from '../../store/selectors';
import {createArticleAction} from '../../store/actions/createArticle.action';

@Component({
  selector: 'mc-create-article',
  templateUrl: './createArticle.component.html',
  styleUrls: ['./createArticle.component.scss']
})
export class CreateArticleComponent implements OnInit {
  private store: Store = inject(Store);
  public initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };
  public isSubmitting$: Observable<boolean>;
  public backendErrors$: Observable<BackendErrorsInterface | null>;

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  public onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({articleInput}));
  }
}
