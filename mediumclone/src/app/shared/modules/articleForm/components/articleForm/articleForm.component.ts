import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ArticleInputInterface} from '../../../../types/articleInput.interface';
import {BackendErrorsInterface} from '../../../../types/backendErrors.interface';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'mc-article-form',
  templateUrl: './articleForm.component.html',
  styleUrls: ['./articleForm.component.scss']
})
export class ArticleFormComponent implements OnInit {
  @Input('initialValues') public initialValuesProps: ArticleInputInterface;
  @Input('isSubmitting') public isSubmittingProps: boolean;
  @Input('errors') public errorsProps: BackendErrorsInterface | null;

  @Output('articleSubmit') public articleSubmitEvent: EventEmitter<ArticleInputInterface> = new EventEmitter<ArticleInputInterface>();

  private fb: FormBuilder = inject(FormBuilder);
  public form: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      title: this.initialValuesProps.title,
      description: this.initialValuesProps.description,
      body: this.initialValuesProps.body,
      tagList: this.initialValuesProps.tagList.join(' ')
    });
  }

  public onSubmit(): void {
    const articleInput: ArticleInputInterface = {
      ...this.form.value,
      tagList: this.form.value.tagList.split(' ')
    };
    this.articleSubmitEvent.emit(articleInput);
  }
}
