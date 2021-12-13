import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import * as $ from "jquery";

import { DataServiceService } from '../services/data-service/data-service.service';
export interface Food {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  unit: string;
  ml1: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
}
export class Drivers implements PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  ml1: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  unit: string;

}
@Component({
  selector: 'app-quarterupdate',
  templateUrl: './quarterupdate.component.html',
  styleUrls: ['./quarterupdate.component.scss']
})
export class QuarterupdateComponent implements OnInit {
  @ViewChild('objective', { static: false }) nameField: ElementRef;
  leftStyle = 'card';
  temp={
    qty:'',
    achieveQty:'',
    kpiID:''
  };
  name= '0';
  kpiData: any;
  userRole: any;
  notifications: any;
  url: any;
  ELEMENT_DATA: PeriodicElement[] = [
  ];
  element: Drivers;
  displayedColumns = ['objective', 'ml1', 'q1', 'q2', 'q3', 'q4'];
  dataSource = this.ELEMENT_DATA;
  matcher = new MyErrorStateMatcher();

  constructor(public dataService: DataServiceService,
    public router: Router) {
    this.element = new Drivers();
    this.element.qty = 100;
    this.element.unit= '%';
    this.element.objective = 'Aligned';
    this.ELEMENT_DATA.push(this.element);
    this.element =  new Drivers();
    this.element.qty = 100;
    this.element.unit= '%';
    this.element.objective = 'Check in on personal goals';
    this.ELEMENT_DATA.push(this.element);
    this.element =  new Drivers();
    this.element.qty = 1;
    this.element.unit= 'Week ';
    this.element.objective = 'Maintain team meetings';
    this.ELEMENT_DATA.push(this.element);
    this.dataSource = [...this.ELEMENT_DATA];
  }

  ngOnInit() {

    this.url = this.dataService.getPhoto();
    this.name = this.dataService.getUserInfo();
    this.userRole = this.dataService.getRole();

    this.dataService.notifydata.subscribe((data) =>{
      this.notifications = data;
    });

    this.dataService.kpiListdata.subscribe((data) =>{
      this.kpiData  = data;
    })
    this.dataService.getUserKpiAll(null,null);
  }

  save(element){
    console.log(element);
    this.dataService.updateQuarterStatus({
      achieveQty: element.achieveQty.toString(),
      kpiID: element.kpiID,
    });
    this.dataService.getUserKpiAll(null,null);
    this.temp ={
      kpiID:'',
      qty:'',
      achieveQty:''
    };

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
  outStatement(){
    this.router.navigateByUrl('/dash/outstatement');
  }
  confirm(){
    this.dataService.resetKpi();
    this.router.navigateByUrl('/journey/kpijourney');
  }
  rvQuestion(){
    this.router.navigateByUrl('/step2Review');
  }
  delete(element: any) {
    this.dataService.deleteKpi(element.kpiID);
  }
    open(element: any){
      console.log(element);
      this.temp.achieveQty= element.achieveQty;
      this.temp.kpiID= element.kpiID;
      this.temp.qty= element.qty;
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
  anchorClicked(e){}
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  edit(element: any) {
    console.log(element);
    this.element = element;
    // this.editFlag = true;
  }
}
