import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import * as $ from "jquery";

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.scss']
})
export class LeftsidebarComponent implements OnInit {
name: string;
userRole:any;
url= "http://108.163.221.122:2004/";
  constructor(private router: Router,private dataservice: DataService) { }

  ngOnInit() {
    this.url = this.dataservice.getPhoto()
    this.userRole = this.dataservice.getRole();
    this.name = this.dataservice.getUserInfo();
  }
  cupdates(){
    this.router.navigateByUrl('/dash/kpiupdates');
  }
  kpiAll(){
    this.router.navigateByUrl('/kpi');
  }
  routeHome(){
    this.router.navigateByUrl('/dashboard');
  }
  mileAll(){
    this.router.navigateByUrl('/milestones');
  }
  next(){
    this.router.navigateByUrl('/quarterassign');
  }
  outStatement(){
    this.router.navigateByUrl('/dash/outstatement');
  }
  login(){
    this.router.navigateByUrl('/account/login');
  }
  resetKpi(){
    document.getElementById('openModalButton2').click();
    // this.dataService.resetKpi();
  }

  rvQuestion(){
    this.router.navigateByUrl('/step2Review');
  }

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
  rDept() {
    this.router.navigateByUrl('/admin/department');
  }
  rUser() {
    this.router.navigateByUrl('/admin/roles');
  }
  rUsers() {
    this.router.navigateByUrl('/admin/invites');
  }
  qupdates() {
    this.router.navigateByUrl('/dash/quaupdates');
  }
  updateProfile() {
    this.router.navigateByUrl('/dash/profile');
  }
  notify() {
    this.router.navigateByUrl('/dash/notification');
  }
  dash() {
    this.router.navigateByUrl('/dashboard');
  }
}
