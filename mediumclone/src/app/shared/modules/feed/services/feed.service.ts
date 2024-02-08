import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GetFeedResponseInterface} from '../types/getFeedResponse.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class FeedService {
  private http: HttpClient = inject(HttpClient);
  public getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl: string = environment.apiUrl + url;
    return this.http.get<GetFeedResponseInterface>(fullUrl);
  }
}
