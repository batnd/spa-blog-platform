import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {GetArticleResponseInterface} from '../types/getArticleResponse.interface';
import {environment} from '../../../environments/environment';
import {ArticleInterface} from '../types/article.interface';

@Injectable()
export class ArticleService {
  private http: HttpClient = inject(HttpClient);
  public getArticle(slugUrl: string): Observable<ArticleInterface> {
    const fullUrl: string = `${environment.apiUrl}articles/${slugUrl}`;
    return this.http.get<GetArticleResponseInterface>(fullUrl).pipe(map((response: GetArticleResponseInterface) => response.article));
  }
}
