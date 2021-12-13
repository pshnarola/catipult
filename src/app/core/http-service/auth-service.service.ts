import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

// const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isLoggedIn: boolean = false;
  role: any;

  constructor() { }

  isLogin(){
    return this.isLoggedIn;
  }
  setStatus(s: boolean, role){
    this.isLoggedIn = s;
    this.role = role;
  }
  checkRole(r:string){
    return true;
  }
}
