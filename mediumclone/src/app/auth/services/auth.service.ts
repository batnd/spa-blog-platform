import {inject, Injectable} from '@angular/core';
import {RegisterRequestInterface} from '../types/registerRequest.interface';
import {map, Observable} from 'rxjs';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthResponseInterface} from '../types/authResponse.interface';
import {LoginRequestInterface} from '../types/loginRequest.interface';
import {CurrentUserInputInterface} from '../../shared/types/currentUserInput.interface';

@Injectable()
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  private getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  public register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url: string = environment.apiUrl + 'users';
    return this.http.post<AuthResponseInterface>(url, data).pipe(map(this.getUser));
  }

  public login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url: string = environment.apiUrl + 'users/login';
    return this.http.post<AuthResponseInterface>(url, data).pipe(map(this.getUser));
  }

  public getCurrentUser(): Observable<CurrentUserInterface> {
    const url: string = environment.apiUrl + 'user';
    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser));
  }

  public updateCurrentUser(currentUserInput: CurrentUserInputInterface): Observable<CurrentUserInterface> {
    const url: string = environment.apiUrl + 'user';

    return this.http.put(url, {user: currentUserInput}).pipe(map(this.getUser));
  }
}
