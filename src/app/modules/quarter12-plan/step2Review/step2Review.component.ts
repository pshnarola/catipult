import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { DataServiceService } from '../services/data-service/data-service.service';
import { SharedDataService } from 'src/app/shared/services/data.service';
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
  templateUrl: './step2Review.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2ReviewComponent implements OnInit {
  subscription: Subscription;
  subQuestions: Subscription;
  questionBankDataSubscription:Subscription;

  dataf:boolean = false;
  headerObj:boolean = false;
  headerU:boolean = false;
  ansFlag:boolean = false;
  headerM:boolean = false;

  currentQuestion:number;
  totalQuestions:number;
  
  leftStyle = 'card';
  name = '';
  routeData: any;
  rfpOptions: any;
  descAns= '';
  currentIndex= 0;
  driverImg: any;
  drivers: any;
  currentDriver=0;

  favoriteSeason: string;
  seasons: string[] = ['Upto 10', 'between 10 to 30', '30 to 50', 'more than 50'];
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;

  qBankData: QBank[] =[];
  matcher = new MyErrorStateMatcher();
  constructor(breakpointObserver: BreakpointObserver,
              public dataService: DataServiceService,
              private dataservice: SharedDataService,
              public router: Router) {
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

  ngOnInit() {

    this.name = this.dataService.getUserInfo();
    this.rfpOptions= [];
    // this.subscription =  this.dataService.routeUrldata.subscribe((data) =>{
    //   this.routeData = data;
    //   console.log('routeData1');
    //   console.log(data);
    // });

    this.subQuestions = this.dataService.rfpOptionsdata.subscribe((data) =>{
      this.rfpOptions = data;
    });

    this.subscription = this.dataService.driversdata.subscribe((data)=>{
      this.drivers= data;
      this.routeData = data;
      if(this.drivers){
        this.dataService.getAllItems(this.drivers[this.currentDriver].driverID);
      }
    });

    this.dataService.getDrivers();

    this.questionBankDataSubscription = this.dataService.qBankdata.subscribe((data) => {
      this.rfpOptions = [];
      this.totalQuestions = data.length;
      if(data){
        this.dataf = true;
        this.qBankData= data;
      } else {
        this.dataf = false;
      }
    });
  }

     ngOnDestroy(): void {
       this.subscription ? this.subscription.unsubscribe() : null;
       this.subQuestions ? this.subQuestions.unsubscribe() : null;
       this.questionBankDataSubscription ? this.questionBankDataSubscription.unsubscribe() : null;
     }

    update(o, u, m) {
      this.headerObj = o;
      this.headerU = u;
      this.headerM = m;
    };
    
  timeout(){
    setTimeout(()=> {
      this.router.navigateByUrl(this.routeData[0].nextRoute);
    }, 2000);
  }
    
  next():void {
    let temp = this.currentIndex +1;

    this.ansFlag=false;
    
    if(temp === this.qBankData.length){
      this.currentDriver+=1;
      this.currentIndex=0;
      if(this.currentDriver > 6){
        this.router.navigateByUrl('/dashboard');
      }
      this.dataService.getAllItems(this.drivers[this.currentDriver].driverID);
    } else {
      this.currentIndex = temp;
    }
    this.descAns = '';
    this.rfpOptions=[];
    if(this.qBankData[this.currentIndex].QuestionType.typeName === 'rfp'){
      console.log('rfpOptions');
      this.dataService.getAllRfpOptions(this.qBankData[this.currentIndex].queID);
    }
  }

  nextD(){
    this.currentDriver+=1;
    this.currentIndex=0;

    if(this.currentDriver > 6){
      this.router.navigateByUrl('/dashboard');
    }
    if(this.currentDriver !== 7){
    this.dataService.getAllItems(this.drivers[this.currentDriver].driverID);
    }
  }

  back(){
    this.ansFlag=false;
    this.currentIndex -=1;
    this.rfpOptions=[];
    if(this.qBankData[this.currentIndex].QuestionType.typeName === 'rfp'){
      this.dataService.getAllRfpOptions(this.qBankData[this.currentIndex].queID);
    }
  }

  skip(){
    this.currentDriver +=1;
    this.currentIndex=0;
    if(this.currentDriver > 6){
    this.router.navigateByUrl('/dashboard');
      }
      if(this.currentDriver !== 7){
      this.dataService.getAllItems(this.drivers[this.currentDriver].driverID);
      }
  }

  submitAns(option:any, i: any):void {
    this.currentQuestion = i + 1;
    if(this.qBankData[this.currentIndex].answer){
      if(this.qBankData[this.currentIndex].QuestionType.typeName === 'Multiple Choice'){
        if(option.correctAns){
          this.dataService.addUserAns({ driverID:this.routeData[this.currentDriver].driverID,answer: option.option,queID: option.queID,optionID: option.optionID });
          this.qBankData[this.currentIndex].Options[i].correctAns=true;
        } else {
        }
      } else {
      this.dataService.updateUserAns({ answer: option.option,queID: option.queID,optionID: option.optionID });
      }
    } else {
      this.dataService.addUserAns({ driverID:this.routeData[this.currentDriver].driverID,answer: option.option,queID: option.queID,optionID: option.optionID });
      this.qBankData[this.currentIndex].Options[i].correctAns=true;
    }
    this.qBankData[this.currentIndex].answer = true;
    this.dataService.getAllItems(this.drivers[this.currentDriver].driverID);
  }

  submitAnsM(e:any, option:any, i: any){
    if(e.checked){
      this.dataService.addUserAns({
        driverID:this.routeData[this.currentDriver].driverID,
        answer: option.option,
        queID: option.queID,
        optionID: option.optionID,
        });
      this.qBankData[this.currentIndex].Options[i].correctAns=true;
    }
    else{
      this.dataService.rmoveUserAns(option.optionID);
      this.qBankData[this.currentIndex].Options[i].correctAns=false;
    }
    this.qBankData[this.currentIndex].answer = true;
  }

  submitAnsR(e:any, option:any, i: any){
    if(e.checked){
    this.dataService.addUserAns({
      answer: option.answer,
      });
    this.qBankData[this.currentIndex].Options[i].correctAns=true;
    }
    else{
      this.dataService.rmoveUserAns(option.optionID);
      this.qBankData[this.currentIndex].Options[i].correctAns=false;
    }
    this.qBankData[this.currentIndex].answer = true;
  }

  submitAnsRfpq(e:any, option:any, i: any){
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
      this.qBankData[this.currentIndex].Options[i].correctAns=false;
    }
    this.qBankData[this.currentIndex].answer = true;
  }
  
  submitDescription():void {
    var body:object;

    body = {
      uID: JSON.parse(this.dataservice.getToken()).uID,
      queID: this.qBankData[this.currentIndex].queID,
      answer: this.qBankData[this.currentIndex].desc
    }

    this.dataService.putUserAnswer(body);
  }
}
