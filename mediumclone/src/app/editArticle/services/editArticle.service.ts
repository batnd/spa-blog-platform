import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleInputInterface} from '../../shared/types/articleInput.interface';
import {environment} from '../../../environments/environment';
import {SaveArticleResponseInterface} from '../../shared/types/saveArticleResponse.interface';
import {map, Observable} from 'rxjs';
import {ArticleInterface} from '../../shared/types/article.interface';

@Injectable()
export class EditArticleService {
  private http: HttpClient = inject(HttpClient);

  public updateArticle(slug: string, articleInput: ArticleInputInterface): Observable<ArticleInterface> {
    const fullUrl: string = `${environment.apiUrl}articles/${slug}`;

    return this.http
      .put<SaveArticleResponseInterface>(fullUrl, {article: articleInput})
      .pipe(map((response: SaveArticleResponseInterface) => response.article));
  }
}
