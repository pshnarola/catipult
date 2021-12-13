import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Router, ActivatedRoute } from "@angular/router";

import { environment } from 'src/environments/environment';

import * as $ from "jquery";

import { ChartType, ChartOptions } from "chart.js";

import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip
} from "ng2-charts";

import { Subscription } from "rxjs";

import { DataServiceService } from "../services/data-service/data-service.service";

export interface Food {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
export interface PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  unit: string;
  ml1: string;
  ml4: string;
}
export class Drivers implements PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  ml1: string;
  ml4: string;
  unit: string;
}
@Component({
  selector: "app-kpi-updates",
  templateUrl: "./kpi-updates.component.html",
  styleUrls: ["./kpi-updates.component.scss"]
})
export class KpiUpdatesComponent implements OnInit {
  @ViewChild("objective", { static: false }) nameField: ElementRef;
  leftStyle = "card";
  url: any;
  ELEMENT_DATA: PeriodicElement[] = [];
  ELEMENT_DATA1: PeriodicElement[] = [];
  element: Drivers;
  activeFlag = 0;
  kpiData1: any;
  kpiData2: any;
  kpiData3: any;
  currentIndex: any;
  currentDriver: any;
  drivSub: Subscription;
  userSub: Subscription;
  kpiSub: Subscription;
  sub: Subscription;
  notSub: Subscription;
  kpiData4: any;
  kpiData5: any;
  notifications = [];
  name = "";
  kpiData6: any;
  kpiData7: any;
  id: any;
  selectedStatus = "c";
  displayedColumns = ["objective", "ml1", "ml4"];
  dataSource = this.ELEMENT_DATA;
  drivers: any;
  activeClass = "";
  userRole: any;
  graphFlag = false;
  dataSource1 = this.ELEMENT_DATA1;
  selectIndex = 0;
  cStatus = "";
  hStatus = "";
  aStatus = "";
  rStatus = "";
  pStatus = "";
  dStatus = "";
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;
  
  driverID: any;
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = [
    ["Success", "Pending"],
    ["C", "H", "A", "R", "P"],
    "Kpi Performance"
  ];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = "doughnut";
  public pieChartLegend = true;
  public pieChartPlugins = [];

  matcher = new MyErrorStateMatcher();
  foods: Food[] = [
    { value: "C", viewValue: "Change" },
    { value: "H", viewValue: "Help" },
    { value: "A", viewValue: "Aware" },
    { value: "R", viewValue: "Redirect" },
    { value: "P", viewValue: "Plan" },
    { value: "D", viewValue: "Done" }
  ];
  constructor(
    breakpointObserver: BreakpointObserver,
    public dataService: DataServiceService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.dataService.mileStoneAssignUsersSource.next(undefined);
    this.id = 12;
    this.sub = this.route.params.subscribe(params => {
      this.id = params["id"]; // (+) converts string 'id' to a number
      this.driverID = params["driverID"];
      // console.log(this.id, this.driverID);
    });
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        if (result.matches) {
          this.leftStyle = "mobile";
        }
      });
    breakpointObserver
      .observe([
        Breakpoints.WebLandscape,
        Breakpoints.Large,
        Breakpoints.Medium
      ])
      .subscribe(result => {
        if (result.matches) {
          this.leftStyle = "large";
        }
      });
    this.element = new Drivers();
    this.element.qty = 1;
    this.element.unit = "month";
    this.element.objective = "1:1 with Peter";
    this.ELEMENT_DATA.push(this.element);

    this.dataSource = [...this.ELEMENT_DATA];

    // Driver 2
    this.element = new Drivers();
    this.element.qty = 100;
    this.element.unit = "%";
    this.element.objective = "Aligned";
    this.ELEMENT_DATA.push(this.element);
    this.element = new Drivers();
    this.element.qty = 100;
    this.element.unit = "%";
    this.element.objective = "Check in on personal goals";
    this.ELEMENT_DATA.push(this.element);
    this.element = new Drivers();
    this.element.qty = 1;
    this.element.unit = "Week ";
    this.element.objective = "Maintain team meetings";
    this.ELEMENT_DATA.push(this.element);
    this.dataSource = [...this.ELEMENT_DATA];
  }

  ngOnInit() {

    this.notSub = this.dataService.notifydata.subscribe(data => {
      this.notifications = data;
    });

    this.dataService.getDrivers();
    this.currentDriver = 0;
    this.currentIndex = 0;
    this.name = this.dataService.getUserInfo();
    this.url = this.dataService.getPhoto();
    this.userRole = this.dataService.getRole();
    this.drivers = [];
    this.kpiData1 = [];

    this.drivSub = this.dataService.driversdata.subscribe(data => {
      this.drivers = data;
      if (this.drivers && this.leftStyle === "mobile" && this.id == 123) {
        this.driverChangeMobile(0);
      } else if (this.drivers) {
        let v = 0;
        if (this.driverID) {
          v = this.drivers.findIndex(x => x.driverID === this.driverID);
          this.selectIndex = v;
        }
        this.driverChange(v);
      }
    });
    this.userSub = this.dataService.mileStoneAssignUsersdata.subscribe(data => {
      this.kpiData1 = data;
      if (this.kpiData1) {
        if (this.kpiData1.length === 0 && this.leftStyle === "mobile") {
          if (this.drivers.length - 1 === this.currentDriver) {
            this.router.navigateByUrl("/dashboard");
          } else {
            this.currentDriver++;
          }
          this.driverChange(this.currentDriver);
        } else if (this.leftStyle === "mobile") {
          if (this.id) {
            let v = 0;
            v = this.kpiData1.findIndex(x => x.mileID === this.id);
            this.currentIndex = v;
          }
          this.getActiveClass(this.kpiData1[this.currentIndex]);
        }
      }
    });
    this.dataService.kpiListdata.subscribe(data => {
      this.kpiData1 = data;
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.dataService.mileStoneAssignUsersSource.next(undefined);
    this.userSub.unsubscribe();
    this.drivSub.unsubscribe();
    this.notSub.unsubscribe();
    // this.kpiSub.unsubscribe();
  }

  getActiveClass(milestone) {
    // console.log(milestone);
    this.cStatus = "";
    this.hStatus = "";
    this.aStatus = "";
    this.rStatus = "";
    this.pStatus = "";
    this.dStatus = "";
    if (milestone.charpStatus === "C") {
      this.cStatus = "active";
      this.hStatus = "";
      this.aStatus = "";
      this.rStatus = "";
      this.pStatus = "";
      this.dStatus = "";
    }
    if (milestone.charpStatus === "H") {
      this.cStatus = "";
      this.hStatus = "active";
      this.aStatus = "";
      this.rStatus = "";
      this.pStatus = "";
      this.dStatus = "";
    }
    if (milestone.charpStatus === "A") {
      this.cStatus = "";
      this.hStatus = "";
      this.aStatus = "active";
      this.rStatus = "";
      this.pStatus = "";
      this.dStatus = "";
    }
    if (milestone.charpStatus === "R") {
      this.cStatus = "";
      this.hStatus = "";
      this.aStatus = "";
      this.rStatus = "active";
      this.pStatus = "";
      this.dStatus = "";
    }
    if (milestone.charpStatus === "P") {
      this.cStatus = "";
      this.hStatus = "";
      this.aStatus = "";
      this.rStatus = "";
      this.pStatus = "active";
      this.dStatus = "";
    }
    if (milestone.charpStatus === "D"){
      this.cStatus = "";
      this.hStatus = "";
      this.aStatus = "";
      this.rStatus = "";
      this.pStatus = "";
      this.dStatus = "active";
    }
  }

  public driverChangeMobile(c: any) {
    this.activeFlag = c;
    this.dataService.getMileStoneAssignUsersList2(this.drivers[c].driverID);
  }

  public driverChange(c: any) {
    this.activeFlag = c;
    if (this.drivers && this.leftStyle === "mobile") {
      this.dataService.getMileStoneAssignUsersList2(this.drivers[c].driverID);
    } else {
      this.dataService.getMileStoneAssignUsersList(this.drivers[c].driverID,null,null,"update","");
    }
  }
  drive(item: any) {
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  outStatement() {
    this.router.navigateByUrl("/dash/outstatement");
  }

  next() {
    if (this.kpiData1.length - 1 === this.currentIndex) {
      if (this.drivers.length - 1 === this.currentDriver) {
        this.router.navigateByUrl("/dashboard");
      } else {
        this.currentDriver += 1;
      }
      this.driverChange(this.currentDriver);
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
      this.getActiveClass(this.kpiData1[this.currentIndex]);
    }
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
  anchorClicked(e) {}
  edit(element: any) {
    // console.log(element);
    this.element = element;
    // this.editFlag = true;
  }
  chart() {
    this.graphFlag = true;
  }
  maincall() {
    this.graphFlag = false;
  }
  charpUpdate(element) {
    // console.log(element, this.selectedStatus);
    // this.dataService.updateKpiCharpStatus({
    //   charpStatus: element.charpStatus,
    //   kpiID: element.kpiID
    // });
    this.dataService.updateMileCharpStatus({
      charpStatus: element.charpStatus,
      mileID: element.mileID
    });
    this.getActiveClass(element);
  }
}
