import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import * as $ from 'jquery';

import { SharedDataService } from '../../services/data.service';


@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;
    public menu: string;
    userName: '';
    role: any;

    constructor(public router: Router,
      public dataService: SharedDataService) {
    }
    getUserName(){
      const token =  this.dataService.getToken();
      const v = JSON.parse(token);
      this.userName = v.name;

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
    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.menu = 'tog';
        this.getUserName();
        this.role = this.dataService.getRoleInfo();
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
        const dom1: any = document.querySelector('app-topnav');
        dom1.classList.toggle(this.menu);
    }
    plan(){
        this.router.navigate(['/plan/step1']);
    }
    userRedirect(){
      this.router.navigate(['/journey/kpijourney']);
    }
    drivers(){
        this.router.navigate(['/journey/kpijourney']);
    }
    home(){
      let role = this.dataService.getRole();
      console.log(role);
      if(role ==='admin'){
      this.router.navigate(['/admin']);
      }
      else if(role ==='super'){
        this.router.navigate(['/super/org']);

      }else{
        this.router.navigate(['/dashboard']);
      }
    }
    onLoggedout() {
        sessionStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
    }

    changeLang(language: string) {

    }
}
