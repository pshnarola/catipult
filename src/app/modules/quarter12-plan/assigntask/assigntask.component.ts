import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';

import * as $ from "jquery";

import { DatepickerOptions } from 'ng2-datepicker';

import { Subscription } from 'rxjs';

import { DataServiceService } from '../services/data-service/data-service.service';
import { environment } from 'src/environments/environment';

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
  kpiList: any;
  selectElement: any;
  routeSub: Subscription;
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
  kpiData: any;
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;
  
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  matcher = new MyErrorStateMatcher();
  constructor(breakpointObserver: BreakpointObserver,
              public dataService: DataServiceService,
              public router: Router) {
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

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step2response';
      }
    });
    breakpointObserver.observe([
      Breakpoints.WebLandscape,
      Breakpoints.Large,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step2';
      }
    });
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  ngOnInit() {
    let flag=false;
    this.name = this.dataService.getUserInfo();
    this.dataService.detpUsersdata.subscribe((data) =>{
      this.users = data;
    });
    this.routeSub=this.dataService.routeUrldata.subscribe((data) =>{
      this.routeData = data;
      if(this.routeData){
        if(this.routeData.length > 0){
        this.router.navigateByUrl(this.routeData[0].route);
                }
      }
    });
    this.dataService.getActiveState();
    this.dataService.getDeptUsers();
    // this.dataService.milestonedata.subscribe((data) =>{
    //   this.kpiData = data;
    // });
    // this.dataService.getKpiMilestone();
    this.dataService.mileAlldata.subscribe((data) =>{
      this.kpiData = data;
    })
    this.dataService.getMilestoneAll('a');
  }
  clearUsers(){


  }
  home(){
    // this.dataService.assignTaskSelf();
    this.dataService.updateActiveState({
      pageName: this.routeData[0].nextPage
    }).subscribe(() => {
      this.router.navigateByUrl(this.routeData[0].nextRoute);
    });
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // tslint:disable-next-line: max-line-length
  }
  dateOpen(event){
    var dat = $("#startDate");
    dat.datepicker( {dateFormat : "yy-mm-dd"});
  }
  
  getFormatDate(date): any{
    const today = new Date(date);
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
    this.startDate = this.getFormatDate(e.startDate);
    let today = this.getFormatDate(new Date());
    let p = this.compareDate(this.startDate,today);
    if(p ===1){
      this.startDate = today;
    }
    this.endDate = this.getFormatDate(e.endDate);
    this.dataService.getDeptUsers();
    this.users.forEach(element => {
      element.dueDate = new Date();
      element.qty = 0;
      element.assign= false;
      element.mileID = e.mileID;
    });
   // this.totalQty = e.qty;
   this.modaltest();
  }
  select(element){
    this.selectElement = element;
  }
  save() {
    const element= this.selectElement;
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
      });
    this.kpiData.forEach(e => {
        if(e.mileID === this.currKpi) {
          e.assignName= element.name;
        }
      });
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
    this.aText = i.achieveText;
    if (e.checked) {
      i.assign = true;
      i.qty = this.totalQty - this.totalSumQty();
      this.qtyValid = i.qty;
    } else {
      i.assign = false;
      i.qty = 0;

    }

  }
  // assUser(e:any,i: any) {
  //   if(e.checked){
  //     i.assign = true;
  //     i.qty = this.totalQty - this.totalSumQty();
  //     this.qtyValid = i.qty;
  //   } else {
  //     i.assign = false;
  //     i.qty = 0;

  //   }

  // }

}
