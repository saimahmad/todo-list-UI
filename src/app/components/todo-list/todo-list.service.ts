import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Config } from '../../config/config';
import { LoginService } from '../login-page/login.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTasks() {
    let url = this.baseUrl + '/tasks'
    return this.http.get(url)
  }

  saveTask(payload) {
    let url = this.baseUrl + '/tasks';
    return this.http.post(url,payload)
  }

  orderTasks(payload) {
    let url = this.baseUrl + '/tasks/order';
    return this.http.post(url,payload)
  }

  deleteTask(id) {
    let url = this.baseUrl + '/task/' + id;
    return this.http.delete(url)
  }

  editTask(id,payload) {
    let url = this.baseUrl + '/task/' + id;
    return this.http.patch(url,payload)
  }

  getOwnProfile() {
    let url = this.baseUrl + '/users/me';
    return this.http.get(url)
  }
}
