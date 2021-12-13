import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SharedDataService } from 'src/app/shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor( private dataService: SharedDataService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Null',
    };
    const token = this.dataService.getToken();

    if (token) {
      const v = JSON.parse(token);
      headersConfig['Authorization'] = `Bearer ${v.token}`;
      if(v.role === 'admin')
      headersConfig['role'] = v.role;
      else if(v.role === 'staff')
      headersConfig['role'] =v.role;
      else if(v.role === 'super'){
        headersConfig['role'] =v.role;
      }else if(v.role === 'CEO'){
        headersConfig['role'] ='admin';
      } else {
        headersConfig['role'] = 'user';
      }
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
