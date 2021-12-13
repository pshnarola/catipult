import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { DataServiceService } from '../services/data-service/data-service.service';
import { environment } from 'src/environments/environment';

export interface Food {
  value: string;
  viewValue: string;
}
export interface Question {
  queID?: string;
  question?: string;
  Options?: any;
  QuestionType?: any;
  answer?: boolean;
  desc?: string;
}
export class QBank implements Question {
  constructor(
    public queID?: string,
    public question?: string,
    public Options?: any,
    public QuestionType?: any,
    public answer?: any,
    public desc?: any,
  ) {}
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  leftStyle = 'web';
  headerObj = false;
  checked =false;
  currIndex=0;
  name = '';
  subscription: Subscription;
  subQuestions: Subscription;
  subQBank: Subscription;
  routeSub: Subscription;
  routeSub1: Subscription;
  headerU = false;
  ansFlag = false;
  headerM = false;
  routeData: any;
  dataf = false;
  rfpOptions: any;
  descAns= '';
  currentIndex= 0;
  driverImg: any;
  driverVideo: any;
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;
  driver1Image:string = this.imageUrl + 'driver/tab/driver1.png';

  favoriteSeason: string;
  seasons: string[] = ['Upto 10', 'between 10 to 30', '30 to 50', 'more than 50'];
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

qBankData: QBank[] =[];
  matcher = new MyErrorStateMatcher();
  constructor(breakpointObserver: BreakpointObserver,
              public dataService: DataServiceService,
              public router: Router) {
                this.dataService.routedataSource.next(undefined);
                breakpointObserver.observe([
                  Breakpoints.HandsetLandscape,
                  Breakpoints.HandsetPortrait
                ]).subscribe(result => {
                  if (result.matches) {
                    this.leftStyle = 'mobile';
                    console.log('mobile mode');
                  }
                });
                breakpointObserver.observe([
                  Breakpoints.WebLandscape,
                  Breakpoints.Large,
                  Breakpoints.Medium
                ]).subscribe(result => {
                  if (result.matches) {
                    this.leftStyle = 'web';
                  }
                });
   }

  ngOnInit() {
    let flag= true;
    this.name = this.dataService.getUserInfo();
    this.rfpOptions= [];
    this.routeData = [];

    this.subQuestions = this.dataService.rfpOptionsdata.subscribe((data) =>{
      this.rfpOptions = data;
    });

    this.routeSub=this.dataService.routeUrldata.subscribe((data) =>{
      this.routeData = data;
      if(this.routeData){
        if(this.routeData.length > 0){
          this.driverImg = this.routeData[0].driverImage;
          this.driverVideo = this.videoUrl + this.routeData[0].driverVideo
          if(flag){
            this.dataService.getAllItems(this.routeData[0].driverID);
            flag=false;
          } else {
          flag=true;
          }
          this.router.navigateByUrl(this.routeData[0].route);
        }
      }
    });

    this.subQBank=  this.dataService.qBankdata.subscribe((data) => {
      this.rfpOptions = [];
      if(data){
        this.dataf = true;
        this.qBankData= data;
      } else {
        this.dataf = false;
      } 
    });
    this.dataService.getActiveState();
 }

     ngOnDestroy(): void {
       //Called once, before the instance is destroyed.
       //Add 'implements OnDestroy' to the class.
       this.qBankData=[];
       this.dataService.qBankdataSource.next([]);
       this.subQuestions.unsubscribe();
       this.subQBank.unsubscribe();
     }

     nextrfpq(){
      if(this.rfpOptions.length-1 === this.currIndex){
        this.nextD();
      } else {
        this.currIndex++;
        this.checked=false;
      }
     }

    update(o, u, m) {
      this.headerObj = o;
      this.headerU = u;
      this.headerM = m;
    }
           next(){
            //  this.rfpOptions = [];
             let temp = this.currentIndex +1;

             this.ansFlag=false;
             if(temp === this.qBankData.length){
              // /plan/step3
              this.dataService.updateActiveState({
                pageName: this.routeData[0].nextPage
              }).subscribe(() => {
                this.router.navigateByUrl(this.routeData[0].nextRoute);
              });
             }
             else{
              this.currentIndex = temp;
             }
             this.descAns = '';
             this.rfpOptions=[];
             if(this.qBankData[this.currentIndex].QuestionType.typeName === 'rfp'){
               this.dataService.getAllRfpOptions(this.qBankData[this.currentIndex].queID);
             }
           }
           nextD(){

             if(this.qBankData[this.currentIndex].answer){
              this.dataService.updateUserAns({
                answer: this.qBankData[this.currentIndex].desc,
                queID: this.qBankData[this.currentIndex].queID,
              });
              this.qBankData[this.currentIndex].answer = true;
            }
            else{
            this.dataService.addUserAns({
              driverID:this.routeData[0].driverID,
              answer: this.qBankData[this.currentIndex].desc,
              queID: this.qBankData[this.currentIndex].queID,
             });
            this.qBankData[this.currentIndex].answer = true;
            }
             this.currentIndex +=1;
             this.ansFlag=false;
             if(this.currentIndex === this.qBankData.length){
             // /plan/step3
             this.dataService.updateActiveState({
              pageName:this.routeData[0].nextPage
            }).subscribe(() => {});
            // this.dataService.destroyRouteData();
             this.routeSub.unsubscribe();
             if(this.routeData[0].nextPage ==='driver1OutStatement')
            {
            this.router.navigateByUrl('/plan/step3');
            }
            else{
              this.router.navigateByUrl(this.routeData[0].nextRoute);
            }
            }
             this.descAns = '';
             this.rfpOptions= [];
             if(this.qBankData[this.currentIndex].QuestionType.typeName === 'rfp'){
              // console.log('rfpOptions');
              this.dataService.getAllRfpOptions(this.qBankData[this.currentIndex].queID);
            }
          }
           back(){
            this.ansFlag=false;
            this.currentIndex -=1;
            this.rfpOptions=[];
            if(this.qBankData[this.currentIndex].QuestionType.typeName === 'rfp'){
              // console.log('rfpOptions');
              this.dataService.getAllRfpOptions(this.qBankData[this.currentIndex].queID);
            }
           }

           skip(){
             this.dataService.updateActiveState({
               pageName: this.routeData[0].nextPage
             }).subscribe(() => {
               this.dataService.getActiveState();
               this.routeSub.unsubscribe();
               if (this.routeData[0].nextPage === 'driver1OutStatement') {
                 this.router.navigateByUrl('/plan/step3');
               } else {
                 this.router.navigateByUrl(this.routeData[0].nextRoute);
               }
             });
           }

           submitAns(option:any, i: any){
            //  console.log(option,i);
             if(this.qBankData[this.currentIndex].answer){
              // console.log('update');
              if(this.qBankData[this.currentIndex].QuestionType.typeName === 'Multiple Choice'){
                if(option.correctAns){
                this.dataService.addUserAns({
                  driverID:this.routeData[0].driverID,
                  answer: option.option,
                  queID: option.queID,
                  optionID: option.optionID,
                 });
                this.qBankData[this.currentIndex].Options[i].correctAns=true;
                }
                else {
                  // console.log('remove');
                }
              } else {
              this.dataService.updateUserAns({
                answer: option.option,
                queID: option.queID,
                optionID: option.optionID,
              });
            }
            } else {
             this.dataService.addUserAns({
              driverID:this.routeData[0].driverID,
              answer: option.option,
              queID: option.queID,
              optionID: option.optionID,
             });
             this.qBankData[this.currentIndex].Options[i].correctAns=true;
            }
             this.qBankData[this.currentIndex].answer = true;
           }
           submitAnsM(e:any, option:any, i: any){
            // console.log(option,i,e);
            if(e.checked){
            this.dataService.addUserAns({
              driverID:this.routeData[0].driverID,
              answer: option.option,
              queID: option.queID,
              optionID: option.optionID,
             });
            this.qBankData[this.currentIndex].Options[i].correctAns=true;
            }
            else{
              // console.log('remove');
              this.dataService.rmoveUserAns(option.optionID);
              this.qBankData[this.currentIndex].Options[i].correctAns=false;
            }
            this.qBankData[this.currentIndex].answer = true;
          }

          submitAnsR(e:any, option:any, i: any){
            // console.log(option,i,e);
            if(e.checked){
            this.dataService.addUserAns({
              answer: option.answer,
             });
            this.qBankData[this.currentIndex].Options[i].correctAns=true;
            }
            else{
              // console.log('remove');
              this.dataService.rmoveUserAns(option.optionID);
              this.qBankData[this.currentIndex].Options[i].correctAns=false;
            }
            this.qBankData[this.currentIndex].answer = true;
          }

          submitAnsRfpq(e:any, option:any, i: any){
            // console.log(option,i,e);

            if(e.checked){
            this.dataService.addUserRfpqAns({
              driverID:this.routeData[0].driverID,
              answer: option.answer,
              rfpqID: option.queID,
              queID: this.qBankData[this.currentIndex].queID
             },this.routeData[0].driverID);
            this.qBankData[this.currentIndex].Options[i].correctAns=true;
            }
            else{
              // console.log('remove');
            //  this.dataService.rmoveUserAns(option.optionID);
              this.qBankData[this.currentIndex].Options[i].correctAns=false;
            }
            this.qBankData[this.currentIndex].answer = true;
          }

}
