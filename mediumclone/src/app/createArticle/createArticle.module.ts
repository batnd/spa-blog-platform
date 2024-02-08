import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateArticleComponent} from './components/createArticle/createArticle.component';
import {CreateArticleRoutingModule} from './createArticle-routing.module';
import {ArticleFormModule} from '../shared/modules/articleForm/articleForm.module';
import {CreateArticleService} from './services/createArticle.service';
import {EffectsModule} from '@ngrx/effects';
import {CreateArticleEffect} from './store/effects/createArticle.effect';
import {StoreModule} from '@ngrx/store';
import {createArticleReducer} from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    CreateArticleRoutingModule,
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', createArticleReducer)
  ],
  declarations: [CreateArticleComponent],
  providers: [CreateArticleService]
})
export class CreateArticleModule {}
