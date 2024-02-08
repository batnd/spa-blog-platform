import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EditArticleComponent} from './components/editArticle/editArticle.component';

const routes: Routes = [{path: 'articles/:slug/edit', component: EditArticleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditArticleRoutingModule {}
