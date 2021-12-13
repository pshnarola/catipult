import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDatepickerInputEvent } from "@angular/material";

import * as $ from "jquery";

import { DatepickerOptions } from "ng2-datepicker";

import { Subscription } from "rxjs";

import { DataServiceService } from "../services/data-service/data-service.service";
@Component({
  selector: "app-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.scss"]
})
export class ManagerComponent implements OnInit {
  url: any;
  userRole: any;
  milestonemanagers: any;
  userKpiData: any;
  notSub: Subscription;
  userCurrentIndex = 0;
  currState = 0;
  name: any;
  constructor(
    public dataService: DataServiceService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.url = this.dataService.getPhoto();
    this.userRole = this.dataService.getRole();
    this.name = this.dataService.getUserInfo();
    this.milestonemanagers = [];
    this.notSub = this.dataService.kpiListdata.subscribe(data => {
      console.log(data);
      this.userKpiData = data;
    });
    this.dataService.mileStoneManagerUsersdata.subscribe(data => {
      this.milestonemanagers = data;
      console.log(this.milestonemanagers);
      if (data) {
        // this.dataservice.getUserKpiAll(this.milestoneusers[0].User.uID,this.driverID);
      }
      console.log(data);
    });
    // this.dataService.getUserManagers("L2", "fdfd", "sfdsd");
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.notSub.unsubscribe();
  }
  cupdates() {
    this.router.navigateByUrl("/dash/kpiupdates");
  }
  outStatement() {
    this.router.navigateByUrl("/dash/outstatement");
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
  resetKpi() {
    document.getElementById("openModalButton2").click();
    // this.dataService.resetKpi();
  }
  confirm() {
    this.dataService.resetKpi();
    this.router.navigateByUrl("/journey/kpijourney");
  }
  rvQuestion() {
    this.router.navigateByUrl("/step2Review");
  }
  delete(element: any) {
    this.dataService.deleteKpi(element.kpiID);
    // this.timeoutList();
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
    this.dataService.assignTaskSelf();
    this.router.navigateByUrl("/dashboard");
    // this.dataService.updateActiveState({
    //   pageName:this.routeData[0].nextPage
    // });
    // this.timeout();
  }
  getKpi(item, i) {
    this.dataService.getUserKpiAll(item.uID, null);
    //this.router.navigateByUrl(`dashboard/manager/${item.uID}`);
    console.log(item);
  }
}
