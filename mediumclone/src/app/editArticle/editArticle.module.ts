import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleFormModule} from '../shared/modules/articleForm/articleForm.module';
import {EditArticleService} from './services/editArticle.service';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {EffectsModule} from '@ngrx/effects';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {UpdateArticleEffect} from './store/effects/updateArticle.effect';
import {EditArticleComponent} from './components/editArticle/editArticle.component';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {EditArticleRoutingModule} from './editArticle-routing.module';
import {StoreModule} from '@ngrx/store';
import {editeArticleReducer} from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    LoadingModule,
    EditArticleRoutingModule,
    ArticleFormModule,
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature('editArticle', editeArticleReducer)
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService]
})
export class EditArticleModule {}
