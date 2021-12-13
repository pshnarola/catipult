import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from "jquery";

import { environment } from 'src/environments/environment';

import { DataService } from '../../services/data.service';
import { SharedDataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
name: string;
url= "http://108.163.221.122:2004/";
  constructor(private router: Router,private dataservice: DataService, private DataService: SharedDataService) { }

  ngOnInit() {
    this.name = this.dataservice.getUserInfo();

    const token = this.DataService.getToken();
    const v = JSON.parse(token);

    this.url= environment.imgUrl ? environment.imgUrl: "http://108.163.221.122:2004/";
    if(v.img){
      this.url = this.url+ v.img;
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
  notify(){
    this.router.navigateByUrl('/dash/notification');
  }
  confirm(){
    this.dataservice.resetKpi();
    this.router.navigateByUrl('/journey/kpijourney');
  }
  resetKpi(){
    document.getElementById('openModalButton2').click();
    // this.dataService.resetKpi();
  }
  login(){
    this.router.navigateByUrl('/account/login');
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
