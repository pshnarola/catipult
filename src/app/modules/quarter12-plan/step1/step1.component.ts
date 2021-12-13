import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { DataServiceService } from '../services/data-service/data-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  leftStyle = 'card';
  routeData: any;
  routeSub: Subscription;
  name = '';
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;
  
  constructor(breakpointObserver: BreakpointObserver,
    public dataService: DataServiceService,
    public router: Router) {
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

  ngOnInit() {
    let flag= true;
    this.dataService.getActiveState();
    this.name = this.dataService.getUserInfo();
 //   console.log(this.qBankData);
    this.routeSub= this.dataService.routeUrldata.subscribe((data) =>{
      this.routeData = data;
      if(this.routeData){
        if(this.routeData.length === 0){
          this.dataService.addActiveState({
            pageName: 'qadriver1',
          });
          this.routeData = ['hell'];
          flag=false;
        }

      }

      console.log(this.routeData);
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.routeSub.unsubscribe();
  }
  timeout(){
    setTimeout(()=> {
      this.router.navigateByUrl('/plan/step3');
    }, 2000);
  }
  jumpStraight(){
    this.router.navigateByUrl('/plan/step2');
    // this.dataService.updateActiveState({
    //   pageName:'driver1OutStatement',
    // });
    // this.timeout();
  }

}
