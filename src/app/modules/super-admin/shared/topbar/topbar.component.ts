import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';
import { SharedDataService } from 'src/app/shared/services/data.service'

import * as $ from "jquery";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
name: string;
role: any;
url= "http://108.163.221.122:2004/";
  constructor(private router: Router,private dataservice: DataService, private dataService: SharedDataService) { }

  ngOnInit() {
    this.name = this.dataservice.getUserInfo();
    const token =  this.dataService.getToken();
  const v = JSON.parse(token);
  console.log(v);
  if(v.roleAdmin){
    this.role= v.roleAdmin;
    console.log(this.role);
  }
  if(v.img){

    this.url = this.url+ v.img;
    console.log(this.url);
  }
  else{
    this.url = "assets/img.jpg";
  }
  }
  routeHome(){
    this.router.navigateByUrl('/journey/kpijourney');
  }
  updateProfile(){
    this.router.navigateByUrl('/dash/profile');
  }
  pushReset(){
    console.log('push reset');
   // this.dataservice.resetPush();
  }
  notify(){
    this.router.navigateByUrl('/dash/notification');
  }
  login(){
    this.router.navigateByUrl('/account/login');
  }
  confirm(){
    this.dataservice.resetPush();
  }
  dash(){
    this.router.navigateByUrl('/dashboard');
  }
  anchorClicked(event){}
  toggleClicked(event) {
    var target = event.srcElement.id;
    var body = $("body");
    var menu = $("#sidebar-menu");

    // toggle small or large menu
    if (body.hasClass("nav-md")) {
      menu.find("li.active ul").hide();
      menu
        .find("li.active")
        .addClass("active-sm")
        .removeClass("active");
    } else {
      menu.find("li.active-sm ul").show();
      menu
        .find("li.active-sm")
        .addClass("active")
        .removeClass("active-sm");
    }
    body.toggleClass("nav-md nav-sm");
  }

}
