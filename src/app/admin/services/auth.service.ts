import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface AuthResponse {
  idToken: string
  expiresIn: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get token(): string | null {
    if (new Date().getTime() > Number(localStorage.getItem('fb-token-exp'))) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem('fb-token');
    }
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    // do http request
    return of({idToken: 'someAdminToken', expiresIn: '3000'}).pipe(tap(this.setToken))
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated() {
    return !!this.token;
  }

  private setToken(response: AuthResponse) {
    const expDateInMs = new Date().getTime() + +response.expiresIn * 1000;
    localStorage.setItem('fb-token', response.idToken);
    localStorage.setItem('fb-token-exp', expDateInMs.toString());
  }
}
