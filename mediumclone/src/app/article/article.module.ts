import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {StoreModule} from '@ngrx/store';
import {articleReducer} from './store/reducers';
import {RouterModule} from '@angular/router';
import {ErrorMessageModule} from '../shared/modules/errorMessage/errorMessage.module';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {ArticleService as SharedArticleService} from '../shared/services/article.service';
import {ArticleComponent} from './components/article/article.component';
import {ArticleRoutingModule} from './article-routing.module';
import {TagListModule} from '../shared/modules/tagList/tagList.module';
import {ArticleService} from './services/article.service';
import {DeleteArticleEffect} from './store/effects/deleteArticle.effect';

@NgModule({
  imports: [
    CommonModule,
    ArticleRoutingModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', articleReducer),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
    TagListModule
  ],
  declarations: [ArticleComponent],
  providers: [SharedArticleService, ArticleService]
})
export class ArticleModule {}
