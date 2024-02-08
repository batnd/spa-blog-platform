import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ProfileInterface} from '../../shared/types/profile.interface';
import {environment} from '../../../environments/environment';
import {GetUserProfileResponseInterface} from '../types/getUserProfileResponse.interface';

@Injectable()
export class UserProfileService {
  private http: HttpClient = inject(HttpClient);

  public getUserProfile(slug: string): Observable<ProfileInterface> {
    const url: string = `${environment.apiUrl}profiles/${slug}`;

    return this.http.get(url).pipe(map((response: GetUserProfileResponseInterface) => response.profile));
  }
}
