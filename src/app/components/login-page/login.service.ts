import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = Config.baseUrl;
  authToken;
  name;

  constructor(private http: HttpClient) { }

  login(payload) {
    let url = this.baseUrl+'/users/login'
    return this.http.post(url,payload);
  }

  signUp(payload) {
    let url = this.baseUrl + '/users/signup'
    return this.http.post(url,payload);
  }

  setAuthToken(token:string) {
    this.authToken = token;
    localStorage.setItem('authToken',token);
    console.log(localStorage)
  }
}
