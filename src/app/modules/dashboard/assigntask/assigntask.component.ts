import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';

import * as $ from "jquery";

import { DatepickerOptions } from 'ng2-datepicker';

import { Subscription } from 'rxjs';

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
  selector: 'app-assigntask',
  templateUrl: './assigntask.component.html',
  styleUrls: ['./assigntask.component.scss']
})
export class AssigntaskComponent implements OnInit {
  @ViewChild('objective', { static: false }) nameField: ElementRef;
  @ViewChild('sd', { static: false }) sdate : ElementRef;
dueDate: any;
  leftStyle = 'card';
  selectElement: any;
  quarterList: any;
  quarterID: any;
  kpiList: any;
  id =12;
  routeSub: Subscription;
  sub: Subscription;
  routeData: any;
  qtyValid =0;
  totalQty: any;
  headerObj = false;
  date: Date;
  ELEMENT_DATA: PeriodicElement[] = [
  ];
  editFlag = false;
  mil1Flag = false;
  mil2Flag = false;
  element: Drivers;
  headerU = false;
  headerM = false;
  currKpi: any;
  startDate: any;
  endDate: any;
  kpiID: any;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  displayedColumns = ['objective', 'ml1', 'ml2', 'ml3'];
  dataSource = this.ELEMENT_DATA;
  users: any;
  aText='';
  name='';
  userRole: any;
  url: any;
  kpiData: any;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  matcher = new MyErrorStateMatcher();
  constructor(breakpointObserver: BreakpointObserver,
              public dataService: DataServiceService,
              public route: ActivatedRoute,
              public router: Router) {
                this.id = 12;
                this.sub = this.route.params.subscribe(params => {
                  this.id = +params['id']; // (+) converts string 'id' to a number
                  console.log(this.id);
                });
                this.date = new Date();
    this.element = new Drivers();
    this.element.objective = 'Walk 100 miles';
    this.element.ml1 = '100';
    this.element.qty = 100;
    this.ELEMENT_DATA.push(this.element);
    this.element =  new Drivers();
    this.element.objective = 'LOSS 40 kg';
    this.element.ml1 = '40';
    this.element.qty = 40;
    this.ELEMENT_DATA.push(this.element);
    this.element =  new Drivers();
    this.element.objective = 'Earn 12 Millions';
    this.element.ml1 = '12';
    this.element.qty = 12;
    this.ELEMENT_DATA.push(this.element);
    this.dataSource = [...this.ELEMENT_DATA];

    console.log(this.dataSource);

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step2response';
        console.log('handset mode');
      }
    });
    breakpointObserver.observe([
      Breakpoints.WebLandscape,
      Breakpoints.Large,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step2';
        console.log('handset mode');
      }
    });
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  ngOnInit() {
    let flag=false;
    this.url = this.dataService.getPhoto()
    this.userRole = this.dataService.getRole();
    this.name = this.dataService.getUserInfo();
    this.dataService.quarterListdata.subscribe((data) =>{
      this.quarterList = data;
      console.log(this.quarterList);
    })
    this.dataService.detpUsersdata.subscribe((data) =>{
      this.users = data;
      console.log(this.users);
    });
    this.dataService.getDeptUsers();
    this.dataService.getQuarterList();

    this.sub=  this.dataService.mileAlldata.subscribe((data) =>{
      this.kpiData = data;
      // this.dataService.getSingle(this.kpiData[0]['kpiID']);
      console.log(this.kpiData);
    })
    console.log(this.id);
    // tslint:disable-next-line: use-isnan
    if(isNaN(this.id)){
      this.dataService.getMilestoneAll1('a',1);
    }
    else{
    this.dataService.getMilestoneAll1('a',0);
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }
  onChange(ev){
    console.log(ev);
  }
  clearUsers(){


  }
  cupdates(){
    this.router.navigateByUrl('/dash/kpiupdates');
  }
  outStatement(){
    this.router.navigateByUrl('/dash/outstatement');
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
    this.dataService.resetKpi();
    this.router.navigateByUrl('/journey/kpijourney');
  }
  rvQuestion(){
    this.router.navigateByUrl('/step2Review');
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
  home(){
    this.dataService.assignTaskSelf();
    this.router.navigateByUrl('/dashboard');
    // this.dataService.updateActiveState({
    //   pageName:this.routeData[0].nextPage
    // });
    // this.timeout();
  }
  select(element){
    this.selectElement = element;
  }
  timeout(){
    setTimeout(()=> {
      this.router.navigateByUrl(this.routeData[0].nextRoute);
    }, 2000);
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // tslint:disable-next-line: max-line-length
   console.log(event,type);
  }
  dateOpen(event){
 // var target = event.srElement.id;
  var dat = $("#startDate");
dat.datepicker( {dateFormat : "yy-mm-dd"});
  }
  getFormatDate(date): any{
    const today = new Date(date);
    // const dd = today.getDate();
    // const mm = today.getMonth() + 1; // January is 0!
    // const yyyy = today.getFullYear();
    // if(dd<10) {
    //     dd='0'+dd;
    // }
    // if(mm<10) {
    //     mm='0'+mm;
    // }
    // today = yyyy+'-'+mm+'-'+dd;
    return `${today.getFullYear()}-${ (today.getMonth() + 1)> 9 ? (today.getMonth() + 1): '0'+ (today.getMonth() + 1) }-${today.getDate()> 9 ? today.getDate() : '0' + today.getDate()}`;
  }
  compareDate(d1,d2): any{
    const g1 = new Date(d1);
    // (YYYY, MM, DD, Hr, Min, Sec)
    const g2 = new Date(d2);
    if (g1.getTime() < g2.getTime())
       return 1;
    else if (g1.getTime() > g2.getTime())
        return 2;
    else
        return 0;
  }
  modaltest(){
    document.getElementById('openModalButton4').click();
  }
  assign(e) {
    this.aText= e.objective;
    this.currKpi = e.mileID;
    this.kpiID = e.kpiID;
    this.dueDate= e.dueDate;
    this.quarterID = e.quarterID;
    this.startDate = this.getFormatDate(e.startDate);
    let today = this.getFormatDate(new Date());
    let p = this.compareDate(this.startDate,today);
    if(p ===1){
      this.startDate = today;
    }
    this.endDate = this.getFormatDate(e.endDate);
    this.dataService.getDeptUsers1();
    this.users.forEach(element => {
      element.dueDate = new Date();
      element.qty = 0;
      element.assign= false;
      element.mileID = e.mileID;
    });
   // this.totalQty = e.qty;
   this.modaltest();
  }
  save() {
    const element= this.selectElement;
    console.log(this.users,this.aText, this.kpiID);
    // let temp = [];
    // this.users.forEach(element => {
    //     if(element.assign) {
    //       temp.push(element);
    //     }
    //   });
    //   const data = JSON.stringify(temp);
    //   this.dataService.assignUsers({
    //     data,
    //   });
    this.dataService.assignUsers({
        uID: element.uID,
        mileID: this.currKpi,
        dueDate: this.dueDate
      });
    console.log(this.currKpi);
    this.kpiData.forEach(e => {
        if(e.mileID === this.currKpi) {
          e.assignName= element.name;
        }
      });
    console.log(this.kpiData);
      // console.log(temp,data);
  }
  totalSumQty(): any {
    let qty=0;
    this.users.forEach(element => {
      qty = qty + element.qty;
    });
    return qty;
  }
  totalSumRemoveQty(): any {
    let qty=0;
    this.users.forEach(element => {
      qty = qty - element.qty;
    });
    return qty;
  }
  assUser(e: any,i: any) {
    console.log(e,i);
    this.aText = i.achieveText;
    if (e.checked) {
      i.assign = true;
      i.qty = this.totalQty - this.totalSumQty();
      this.qtyValid = i.qty;
    } else {
      i.assign = false;
      i.qty = 0;
      console.log('remove');

    }
    console.log(i, this.users);

  }
  // assUser(e:any,i: any) {
  //   console.log(e,i);
  //   if(e.checked){
  //     i.assign = true;
  //     i.qty = this.totalQty - this.totalSumQty();
  //     this.qtyValid = i.qty;
  //   } else {
  //     i.assign = false;
  //     i.qty = 0;
  //     console.log('remove');

  //   }
  //   console.log(i, this.users);

  // }

}
