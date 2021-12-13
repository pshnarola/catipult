
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { HttpServiceService } from 'src/app/core/http-service/http-service.service';
export interface User {
  email: any;
  password: any;
}
export class UserInfo implements User {
  constructor(
    public email: any,
    public password: any,
  ) {}
}

@Injectable()
export class DataService {
  // Temporarily stores data from dialogs
  dialogData: any;
  bill: any = null;

  private billdataSource = new BehaviorSubject<any>(this.bill);
  billdata = this.billdataSource.asObservable();

  constructor(private apiService: HttpServiceService) {}
  login(data){
    this.apiService.post('/v1/login',data).subscribe((response) =>{
      this.bill = response;
      });
  }

  resetPassword(email){
    this.apiService.get('/v1/forgetPassword?email='+email).subscribe((response) =>{
      console.log('reset');
    });
  }
}


