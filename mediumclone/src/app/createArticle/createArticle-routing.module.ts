import {RouterModule, Routes} from '@angular/router';
import {CreateArticleComponent} from './components/createArticle/createArticle.component';
import {NgModule} from '@angular/core';

const routes: Routes = [{path: 'articles/new', component: CreateArticleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateArticleRoutingModule {}
