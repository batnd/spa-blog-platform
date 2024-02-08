import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ArticleService {
  private http: HttpClient = inject(HttpClient);

  public deleteArticle(slug: string): Observable<{}> {
    const url: string = `${environment.apiUrl}articles/${slug}`;

    return this.http.delete<{}>(url);
  }
}
