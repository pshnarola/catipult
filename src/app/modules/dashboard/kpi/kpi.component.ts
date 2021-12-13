import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service/data-service.service';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { Subscription } from 'rxjs';
export interface KpiList {
  kpiID: string;
  objective: string;
  qty: string;
  unit: string;
  action: boolean;
}
export class KpiClass implements KpiList {
  kpiID: string;
  objective: string;
  qty: string;
  unit: string;
  action: boolean;
}
@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

  drivers: any;
  driver: any;
  kpilist: any;
  element1: any;
  dataSource: any;
  driverImg: any;
  userRole: any;
  notifications: any;
  notsub: Subscription;
  url: any;
  name: any;
  constructor(public dataservice: DataServiceService,
              public router: Router) { }

  ngOnInit() {

    this.url = this.dataservice.getPhoto()
    this.userRole = this.dataservice.getRole();
    this.name = this.dataservice.getUserInfo();
    this.element1 = new KpiClass();
    this.notsub = this.dataservice.notifydata.subscribe((data) =>{
      this.notifications = data;
    });

    this.dataservice.driversdata.subscribe(data => {
      this.drivers = data;
      if (this.drivers) {
        this.driver = this.drivers[0].driverID;
        this.driverImg = this.drivers[0].driverImage;
        this.dataservice.getkpislist(this.driver);
      }
    });
    this.dataservice.getDrivers();
    this.dataservice.kpislistdata.subscribe((data) => {
      if (data) {
      this.kpilist = data.kpis;
      this.dataSource = [...this.kpilist];
      } else {
        this.kpilist = [];
      }
    });
  }

  ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.notsub.unsubscribe();
}
  edit(element: any) {
    console.log(element);
    this.element1 = element;

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
  login(){
    this.router.navigateByUrl('/account/login');
  }
  resetKpi(){
    document.getElementById('openModalButton2').click();
    // this.dataService.resetKpi();
  }
  confirm(){
    this.dataservice.resetKpi();
    this.router.navigateByUrl('/journey/kpijourney');
  }
  rvQuestion(){
    this.router.navigateByUrl('/step2Review');
  }
  outStatement(){
    this.router.navigateByUrl('/dash/outstatement');
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
  saveAdd() {
    console.log(this.element1);
    this.dataservice.addUserKpi({
      objective: this.element1.objective,
      qty: this.element1.qty.toString(),
      unit: this.element1.unit,
      driverID: this.driver,
    });
    this.element1 = new KpiClass();
   // this.nameField.nativeElement.focus();
    this.timeoutList();
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode != 46 && charCode != 36 && charCode != 44) {
      return false;
    }
      return true;
    }
  addNew() {
    this.element1 = new KpiClass();

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
  save() {
    console.log(this.element1);
    this.element1.qty = this.element1.qty.toString();
    delete this.element1.uID;
    delete this.element1.Driver;
    this.dataservice.updateUserKpi(this.element1);
    this.timeoutList();
 //   this.nameField.nativeElement.focus();
  }
  onChange(deviceValue) {
    console.log(deviceValue);
    this.drivers.forEach(element => {
      if(element.driverID ===deviceValue){
        this.driverImg= element.driverImage;
      }
    });
    // this.drivers.include
    this.driver = deviceValue;
    // this.driverImg= this.drivers[0].driverImage;
    this.dataservice.getkpislist(this.driver);
}
  timeoutList() {
    setTimeout(() => {
      this.dataservice.getkpislist(this.driver);
    }, 1000);
  }

}
