import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ArticleInterface} from '../../../types/article.interface';
import {environment} from '../../../../../environments/environment';
import {GetArticleResponseInterface} from '../../../types/getArticleResponse.interface';

@Injectable()
export class AddToFavoritesService {
  private http: HttpClient = inject(HttpClient);

  public addToFavorites(slug: string): Observable<ArticleInterface> {
    const url: string = this.getUrl(slug);
    return this.http.post(url, {}).pipe(map(this.getArticle));
  }

  public removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url: string = this.getUrl(slug);
    return this.http.delete(url).pipe(map(this.getArticle));
  }

  private getUrl(slug: string): string {
    return `${environment.apiUrl}articles/${slug}/favorite`;
  }
  private getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }
}
