import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import * as $ from "jquery";

import { Subscription } from "rxjs";

import { DataServiceService } from "../services/data-service/data-service.service";

@Component({
  selector: "app-notfication",
  templateUrl: "./notfication.component.html",
  styleUrls: ["./notfication.component.scss"]
})
export class NotficationComponent implements OnInit {
  notifications: any;
  name = "";
  userRole: any;
  url: any;
  notSub: Subscription;
  constructor(public router: Router, public dataservice: DataServiceService) {}

  ngOnInit() {
    this.url = this.dataservice.getPhoto();
    this.userRole = this.dataservice.getRole();
    this.name = this.dataservice.getUserInfo();
    this.notSub = this.dataservice.notifydata.subscribe(data => {
      this.notifications = data;
      this.dataservice.updateNotify();
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.notSub.unsubscribe();
  }
  updateCharp(driverID, mileID) {
    this.router.navigateByUrl(`/dash/kpiupdates/${mileID}/${driverID}`);
  }
  cupdates() {
    this.router.navigateByUrl("/dash/kpiupdates");
  }
  kpiAll() {
    this.router.navigateByUrl("/kpi");
  }
  routeHome() {
    this.router.navigateByUrl("/dashboard");
  }
  mileAll() {
    this.router.navigateByUrl("/milestones");
  }
  login() {
    this.router.navigateByUrl("/account/login");
  }
  outStatement() {
    this.router.navigateByUrl("/dash/outstatement");
  }
  resetKpi() {
    document.getElementById("openModalButton2").click();
    // this.dataService.resetKpi();
  }
  // confirm(){
  //   this.dataService.resetKpi();
  //   this.router.navigateByUrl('/journey/kpijourney');
  // }
  rvQuestion() {
    this.router.navigateByUrl("/step2Review");
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
    this.router.navigateByUrl("/admin/department");
  }
  rUser() {
    this.router.navigateByUrl("/admin/roles");
  }
  rUsers() {
    this.router.navigateByUrl("/admin/invites");
  }
  qupdates() {
    this.router.navigateByUrl("/dash/quaupdates");
  }
  updateProfile() {
    this.router.navigateByUrl("/dash/profile");
  }
  notify() {
    this.router.navigateByUrl("/dash/notification");
  }
  dash() {
    this.router.navigateByUrl("/dashboard");
  }
  home() {
    this.router.navigateByUrl("/userassign");
  }
  perfChange(ev: any) {
    console.log(ev);
  }
  confirm() {
    this.dataservice.resetKpi();
    this.router.navigateByUrl("/journey/kpijourney");
  }
  anchorClicked(event) {}
}
