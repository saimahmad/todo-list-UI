import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Config } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
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

  
  logout() {
    let url = this.baseUrl + '/users/logout'
    return this.http.post(url,{})
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  setAuthToken(token:string) {
    localStorage.setItem('authToken',token);
    console.log(localStorage)
  }

  deleteAuthToken() {
    localStorage.removeItem('authToken')
  }
}
