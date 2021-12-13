import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

import { DataServiceService } from '../services/data-service/data-service.service';
import { Subscription } from 'rxjs';
declare var $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component implements OnInit {
  leftStyle = 'card';
  userRole: any;
  url: any;
  quarterList: any;
  startDate: any;
  endDate: any;
  minDate: any;
  activeMileID: any;
  activeQuarter: any;
  routeSub: Subscription;
  routeData: any;
  name= '';
  todo = [];
  done = [];
  done1 = [];
  done2 = [];
  done3 = [];
  done4=[];
  done5=[];
  done6=[];
  done7=[];
  done8=[];
  done9=[];
  done10=[];
  done11=[];
  done12=[];
  done13=[];
  mileData: any;

  matcher = new MyErrorStateMatcher();
  constructor(breakpointObserver: BreakpointObserver, public dataService: DataServiceService, public router: Router) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step5response';
      }
    });

    breakpointObserver.observe([
      Breakpoints.WebLandscape,
      Breakpoints.Large,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step5';
      }
    });
   }

  ngOnInit() {

    let flag=false;
    this.url = this.dataService.getPhoto()
    this.userRole = this.dataService.getRole();
    this.name = this.dataService.getUserInfo();
    this.dataService.kpiListdata.subscribe((data) =>{
      this.mileData = data;
      if(data){
      this.todo = data;
    }
    });

    this.dataService.quarterListdata.subscribe((data) =>{
      this.quarterList = data;
      console.log('quarterList');
      console.log(this.quarterList);
    })

    this.dataService.mileAlldata.subscribe((data) =>{
      this.mileData = data;
      this.todo  = data;
    })

    this.dataService.getMilestoneAll1('q',1);
    this.dataService.getQuarterList();
     }

     drop(event: CdkDragDrop<string[]>,qkID: any,qitem: any,startDate:any,endDate:any, donelist: any) {

      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      } else {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

        this.activeQuarter = qitem.type;
        $('#invite_user_modal4').modal({ backdrop: 'static' });
        this.startDate = this.getFormatDate(startDate);
        let today = this.getFormatDate(new Date());
        let p = this.compareDate(this.startDate,today);

        if(p ===1){
          this.startDate = today;
        }

        this.minDate = this.startDate;
        this.endDate = this.getFormatDate(qitem.endDate);
      }
        this.activeMileID = donelist[event.currentIndex].mileID;
        if(qkID === 0){

        } else {
          this.dataService.assignKpiQuarter({
            qsID: qkID,
            mileID: donelist[event.currentIndex].mileID,
          });
        }
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

    getFormatDate(date): any{
      const today = new Date(date);
      return `${today.getFullYear()}-${ (today.getMonth() + 1)> 9 ? (today.getMonth() + 1): '0'+ (today.getMonth() + 1) }-${today.getDate()> 9 ? today.getDate() : '0' + today.getDate()}`;
    }

    confirm(status){
     this.dataService.updateMilestone({
       dueDate: this.getFormatDate(this.startDate),
       mileID: this.activeMileID,
     });
     if(!confirm){
      document.getElementById('openModalButton3').click();
     }
    }

    resetKpi(){
      document.getElementById('openModalButton2').click();
    }

    delete(element: any) {
      this.dataService.deleteKpi(element.kpiID);
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

    timeout(){
      setTimeout(()=> {
        this.router.navigateByUrl(this.routeData[0].nextRoute);
      }, 2000);
    }

    home(){
      this.router.navigateByUrl('/userassign')
     }
}
