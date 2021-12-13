import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SwPush } from "@angular/service-worker";

import * as $ from "jquery";

import { Subscription } from "rxjs";

import { DataServiceService } from "../services/data-service/data-service.service";

export interface PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  ml1: string;
  ml2: string;
  ml3: string;
}
export class Drivers implements PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  ml1: string;
  ml2: string;
  ml3: string;
}
@Component({
  selector: "app-milestone",
  templateUrl: "./milestone.component.html",
  styleUrls: ["./milestone.component.scss"]
})
export class MilestoneComponent implements OnInit {
  userRole: any;
  mileText = "";
  mileID: any;
  isupdate = false;
  qkaID: any;
  qsID: any;
  url: any;
  naFlag = false;
  dueDate = null;
  startDate: any;
  endDate: any;
  minDate: any;
  kpilist1: any;
  notsub: Subscription;
  notifications: any;
  dataSource: any;
  selectQuarter = "";
  element: Drivers;
  milestone = "";
  quarterList: any;
  VAPID_PUBLIC_KEY =
    "BAPxLCaL28DrFRSS1zU31orSjtG7Al2bAC9VmzuK8ieYYaVPoSpeoGZ54RgVy3_SK5YOT_mur4jsuNIzqMX94qo";
  privateKey = "ApUIaavuNHi_Ey6Jj0gs00D5aH-BVmJJeexX6RUSLlM";
  name: any;
  ele: any;
  sub: Subscription;
  constructor(
    public dataservice: DataServiceService,
    private swPush: SwPush,
    public router: Router
  ) {}

  ngOnInit() {
    this.element = new Drivers();
    this.url = this.dataservice.getPhoto();
    this.userRole = this.dataservice.getRole();
    this.name = this.dataservice.getUserInfo();
    this.dataservice.quarterListdata.subscribe(data => {
      this.quarterList = data;
    });
    this.dataservice.getQuarterList();
    this.notsub = this.dataservice.notifydata.subscribe(data => {
      this.notifications = data;
    });

    this.sub = this.dataservice.milestonedata.subscribe(data => {
      if (data) {
        this.kpilist1 = data;
        this.dataSource = [...this.kpilist1];
      }
    });
    this.dataservice.getKpiMilestone(null);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.notsub.unsubscribe();
  }
  pick(e) {
    this.ele = e;
    this.milestone = "";
  }
  selectqu(item) {
    this.selectQuarter = item.type;
    this.qsID = item.qsID;
    this.startDate = this.getFormatDate(item.startDate);
    let today = this.getFormatDate(new Date());
    let p = this.compareDate(this.startDate, today);
    if (p === 1) {
      this.startDate = today;
    }
    this.minDate = this.startDate;

    this.endDate = this.getFormatDate(item.endDate);
    let end = this.compareDate(this.endDate, today);
    if (end === 1) {
      this.isupdate = true;
    } else {
      this.isupdate = false;
    }
  }
  assignUsers() {
    this.router.navigateByUrl("/dash/userassign/1");
  }
  save() {
    this.dataservice.addMilestone({
      achieveText: this.milestone,
      kpiID: this.ele.kpiID
    });
    this.onSubscribe();
    this.timeoutList();
  }
  onSubscribe() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
      .then(sub => {
        // const p256dh = sub.getKey('p256dh');
        // const auth = sub.getKey('auth');
        const keys = sub.toJSON().keys;
        this.dataservice.registerDevice(sub);
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
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
  mileAll() {}
  timeoutList() {
    setTimeout(() => {
      this.dataservice.getKpiMilestone(null);
    }, 1000);
  }
  next() {
    this.router.navigateByUrl("/quarterassign");
  }

  login() {
    this.router.navigateByUrl("/account/login");
  }
  resetKpi() {
    document.getElementById("openModalButton2").click();
    // this.dataService.resetKpi();
  }
  compareDate(d1, d2): any {
    const g1 = new Date(d1);
    // (YYYY, MM, DD, Hr, Min, Sec)
    const g2 = new Date(d2);
    if (g1.getTime() < g2.getTime()) return 1;
    else if (g1.getTime() > g2.getTime()) return 2;
    else return 0;
  }
  getFormatDate(date): any {
    const today = new Date(date);
    return `${today.getFullYear()}-${
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)
    }-${today.getDate() > 9 ? today.getDate() : "0" + today.getDate()}`;
  }
  updateM(e) {
    this.mileText = e.achieveText;
    this.mileID = e.mileID;
    this.dueDate = e.dueDate;

    if (e.QuarterKpiAssigns.length > 0) {
      this.quarterList.forEach(element => {
        if (element.qsID === e.QuarterKpiAssigns[0].qsID) {
          this.selectQuarter = element.type;
        }
      });
      this.qkaID = e.QuarterKpiAssigns[0].qkaID;
      this.startDate = this.getFormatDate(
        e.QuarterKpiAssigns[0].QuarterSplit.startDate
      );
      let today = this.getFormatDate(new Date());
      let p = this.compareDate(this.startDate, today);

      if (p === 1) {
        this.startDate = today;
      }
      this.minDate = this.startDate;
      if (this.dueDate) {
        this.startDate = this.dueDate;
      }
      this.endDate = this.getFormatDate(
        e.QuarterKpiAssigns[0].QuarterSplit.endDate
      );
    }
    document.getElementById("openModalMile").click();
  }
  confirmD() {
    this.dataservice.deleteMilestone(this.mileID);
    this.dataservice.getKpiMilestone(null);
  }
  confirmU() {
    this.dataservice.updateMilestone({
      dueDate: this.getFormatDate(this.startDate),
      achieveText: this.mileText,
      mileID: this.mileID
    });
    this.dataservice.assignMileQuarter({
      qsID: this.qsID,
      qkaID: this.qkaID
    });
    setTimeout(() => {
      this.dataservice.getKpiMilestone(null);
    }, 1000);
  }
  confirm() {
    this.dataservice.resetKpi();
    this.router.navigateByUrl("/journey/kpijourney");
  }
  rvQuestion() {
    this.router.navigateByUrl("/step2Review");
  }
  outStatement() {
    this.router.navigateByUrl("/dash/outstatement");
  }
  delete(element: any) {
    this.dataservice.deleteKpi(element.kpiID);
    this.timeoutList();
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
}
