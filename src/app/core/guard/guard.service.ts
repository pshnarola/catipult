import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { SharedDataService } from 'src/app/shared/services/data.service'

@Injectable()

export class GuardService {

  public isLoggedIn:boolean = false;
  public redirectUrl:string;

  constructor(private router: Router, private dataService: SharedDataService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.dataService.getToken()){
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['account'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
