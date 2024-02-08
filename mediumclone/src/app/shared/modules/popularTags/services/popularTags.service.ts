import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {PopularTagType} from '../../../types/popularTag.type';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GetPopularTagsResponseInterface} from '../types/getPopularTagsResponse.interface';

@Injectable()
export class PopularTagsService {
  private http: HttpClient = inject(HttpClient);
  public getPopularTags(): Observable<PopularTagType[]> {
    const url: string = environment.apiUrl + 'tags';
    return this.http.get<GetPopularTagsResponseInterface>(url).pipe(
      map((response: GetPopularTagsResponseInterface) => {
        return response.tags;
      })
    );
  }
}
