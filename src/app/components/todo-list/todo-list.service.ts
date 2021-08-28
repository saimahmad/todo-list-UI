import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../config/config';
import { LoginService } from '../login-page/login.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  baseUrl = Config.baseUrl;

  constructor(private http: HttpClient) { }

  getTasks() {
    let url = this.baseUrl + '/tasks'
    return this.http.get(url)
  }
}
