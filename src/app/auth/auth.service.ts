import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginUser } from './login-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    const body = {
      user: {
        email,
        password
      }
    };

    return this.httpClient.post<LoginUser>(`${environment.apiUrl}/api/users/login`, body);
  }

  isLogin() {
    return !!localStorage.getItem('apiKey');
  }

  setLogin(token: string) {
    localStorage.setItem('apiKey', token);
  }

  getToken() {
    return localStorage.getItem('apiKey');
  }
}
