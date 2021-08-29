import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login-page/login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
//inserting auth token in headers of the api requests
  constructor(private loginService: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.loginService.getAuthToken()) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+this.loginService.getAuthToken()
        })
      })
      return next.handle(authReq)
    }
    return next.handle(req);
  }
}
