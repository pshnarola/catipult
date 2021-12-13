import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

import { Subscription } from 'rxjs';

import { DataServiceService } from '../services/data-service/data-service.service';
import { SwPush } from '@angular/service-worker';
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

export interface KpiList {
  kpiID: string;
  objective: string;
  qty: string;
  Milestones: any;
  unit: any;
  action: boolean;
}
export class KpiClass implements KpiList {
  kpiID: string;
  objective: string;
  qty: string;
  unit: any;
  Milestones: any;
  action: boolean;
}
@Component({
  selector: 'app-step7',
  templateUrl: './step7.component.html',
  styleUrls: ['./step7.component.scss']
})
export class Step7Component implements OnInit {
  @ViewChild('objective', { static: false }) nameField: ElementRef;
  leftStyle = 'card';
  headerObj = false;
  sub: Subscription;
  name='';
  ELEMENT_DATA: PeriodicElement[] = [
  ];
  ELEMENT_DATA1: KpiList[] = [
  ];
  milestone = '';
  kpilist1: any;
  editFlag = false;
  mil1Flag = false;
  mil2Flag = false;
  routeSub: Subscription;
  routeData: any;
  element: Drivers;
  VAPID_PUBLIC_KEY  = 'BAPxLCaL28DrFRSS1zU31orSjtG7Al2bAC9VmzuK8ieYYaVPoSpeoGZ54RgVy3_SK5YOT_mur4jsuNIzqMX94qo';
privateKey = 'ApUIaavuNHi_Ey6Jj0gs00D5aH-BVmJJeexX6RUSLlM';

  headerU = false;
  headerM = false;
  ele: any;
  displayedColumns = ['objective', 'ml1', 'ml2', 'ml3'];
  dataSource = this.ELEMENT_DATA1;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;

  matcher = new MyErrorStateMatcher();
  constructor(breakpointObserver: BreakpointObserver,
    private swPush: SwPush,
    public dataService: DataServiceService,
              public router: Router) {
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
    this.dataSource = [...this.ELEMENT_DATA1];
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
    let flag=true;
    this.name = this.dataService.getUserInfo();
    this.sub = this.dataService.milestonedata.subscribe((data) => {
      if(data){
        this.kpilist1 = data;
        this.dataSource = [...this.kpilist1];
        }
    });
    this.routeSub=this.dataService.routeUrldata.subscribe((data) =>{
      this.routeData = data;
      if(this.routeData){
        if(this.routeData.length > 0){
if(flag){
        flag=false;
        }
        else{
          flag=true;
        }
        this.router.navigateByUrl(this.routeData[0].route);
                }
      }
    });
    this.dataService.getActiveState();
    this.dataService.getKpiMilestone();
     }
     ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.sub.unsubscribe();
      this.routeSub.unsubscribe();

    }
    onSubscribe() {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      // const p256dh = sub.getKey('p256dh');
      // const auth = sub.getKey('auth');
      const keys = sub.toJSON().keys;
      this.dataService.registerDevice(sub);
    })
    .catch(err => console.error('Could not subscribe to notifications', err));
    }
    timeoutList(){
      setTimeout(()=> {
        this.dataService.getKpiMilestone();
        this.milestone='';
      }, 1000);
    }
     mile1Calc(element,cElement){
      // element.Milestones[0].m1
      //  if(!element.qty || element.cinput){
      //    element.qty = cElement;
      //    element.cinput = true;
      //  }
       const temp = element.qty - cElement;
       if(cElement > element.qty){
         this.mil1Flag = true;
         element.Milestones[1].m2 = 0;
       }
       else {
         this.mil1Flag =false;
         element.Milestones[1].m2 = temp;
       }
       element.Milestones[2].m3 = 0;
      //  console.log(element, this.ELEMENT_DATA);
     }
     mile2Calc(element,cElement){
      const temp  = (element.qty - (cElement + element.Milestones[0].m1));
      if(temp<0){
        this.mil2Flag = true;
        element.Milestones[2].m3= 0;
      }
      else {
        this.mil2Flag =false;
        element.Milestones[2].m3 = temp;
      }
    }
     add() {
      if (!this.element.position) {
        this.element.position = this.ELEMENT_DATA.length + 1;
      }
      const ele = this.element;
      this.ELEMENT_DATA.push(ele);
      this.dataSource = [...this.ELEMENT_DATA1];
      this.element = new Drivers();
      this.nameField.nativeElement.focus();
    }
    pick(e){
      this.ele= e;
    }
    save() {
      this.dataService.addMilestone({
        achieveText: this.milestone,
        kpiID: this.ele.kpiID,
      });
      this.onSubscribe();
      this.timeoutList();
      // const l = this.element;
      // this.ELEMENT_DATA = this.ELEMENT_DATA.filter(function (value, index, arr) {
      //   return value.position !== l.position;
      // });
      // const ele = this.element;
      // this.ELEMENT_DATA.push(ele);
      // this.dataSource = [...this.ELEMENT_DATA1];
      // this.element = new Drivers();
      // this.editFlag = false;
      // this.nameField.nativeElement.focus();
    }

    skip() {
      this.dataService.updateActiveState({
        pageName: this.routeData[0].nextPage
      }).subscribe(() => {
        this.router.navigateByUrl(this.routeData[0].nextRoute);
      });
    }

    next(){
      // [routerLink]="['/plan/step5']"
      const temp = JSON.stringify(this.kpilist1);
      this.dataService.addUserMileStones({
        mileStones: temp,
      });
      this.dataService.updateActiveState({
        pageName: this.routeData[0].nextPage
      }).subscribe(() => {
        this.router.navigateByUrl(this.routeData[0].nextRoute);
      });
    }

    edit(element: any) {
      this.element = element;
      this.editFlag = true;
      //   this.ELEMENT_DATA = this.ELEMENT_DATA.filter(function(value, index, arr) {
      //     return value.position !== element.position;
      // });
      // this.dataSource = [...this.ELEMENT_DATA];

    }
    delete(element: any) {
      // this.ELEMENT_DATA.
      // tslint:disable-next-line:only-arrow-functions
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(function (value, index, arr) {
        return value.position !== element.position;
      });
      this.dataSource = [...this.ELEMENT_DATA1];
    }
    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }
     update(o, u, m) {
      this.headerObj = o;
      this.headerU = u;
      this.headerM = m;
           }
           numberOnly(event): boolean {
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
              return false;
            }
            return true;

          }

}
