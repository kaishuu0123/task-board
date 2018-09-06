import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginUser } from '../models/app-models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http:HttpClient) { }

  login(loginUser: LoginUser) {
    const loginParameter =  {
      email: loginUser.email,
      password: loginUser.password
    }
    return this.http.post<any>('/api/v1/login', loginParameter)
      .pipe(
        tap(user => {
          this.email = user.email;
          this.jwtToken = user.token;
        }),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error);
        })
      );
  }

  logout() {
    this.http.delete<any>('/api/v1/logout').subscribe(() => {
      localStorage.removeItem('email');
      localStorage.removeItem('access_token');
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token != null;
  }

  get email() {
    return localStorage.getItem('email');
  }

  set email(email: string) {
    localStorage.setItem('email', email);
  }

  get jwtToken() {
    return localStorage.getItem('access_token');
  }

  set jwtToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  get
}