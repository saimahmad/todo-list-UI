import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseUrl =  'http://localhost:3000/'
  constructor(private http: HttpClient) { }

  getMonthlyPolicyData(value: string) {
    return this.http.get(this.baseUrl+'monthlyPolicy?region='+value);
  }

  getPolicyList(value: number) {
    return this.http.get(this.baseUrl+'policyIdList?customerId='+value);
  }

  getPolicyDetails(value: number) {
    return this.http.get(this.baseUrl+'policyDetails?policyId='+value);
  }

  savePolicyDetails(payload: any) {
    return this.http.post(this.baseUrl+'savePolicy',payload)
  }
}
