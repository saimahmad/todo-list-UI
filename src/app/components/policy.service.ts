import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseUrl =  'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  getMonthlyPolicyData(value: string) {
    return this.http.get(this.baseUrl+'monthlyPolicy?region='+value)
  }
}
