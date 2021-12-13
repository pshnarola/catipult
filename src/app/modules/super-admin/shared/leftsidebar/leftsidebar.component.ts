import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { SharedDataService } from 'src/app/shared/services/data.service'

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.scss']
})
export class LeftsidebarComponent implements OnInit {
name: string;
url= "http://108.163.221.122:2004/";
  constructor(private router: Router,private dataservice: DataService, private dataService: SharedDataService) { }

  ngOnInit() {
    this.name = this.dataservice.getUserInfo();
    const token =  this.dataService.getToken();
    const v = JSON.parse(token);
    console.log(v);
    if(v.img){

      this.url = this.url+ v.img;
      console.log(this.url);
    }
    else{
      this.url = "assets/img.jpg";
    }
  }
  qNavi(){
    this.router.navigateByUrl('/super/drivers');
  }
  org(){
    this.router.navigateByUrl('/super/org');
  }
  rUsers(){
    this.router.navigateByUrl('/admin/invites');
  }
  logout(){
    this.router.navigateByUrl('/account');
  }
  updateProfile(){
    this.router.navigateByUrl('/dash/profile');
  }
  notify(){
    this.router.navigateByUrl('/dash/notification');
  }
  dash(){
   //  this.router.navigateByUrl('/dashboard');
  }
}
