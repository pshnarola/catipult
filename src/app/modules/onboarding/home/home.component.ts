import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  getSupportedInputTypes,
  Platform,
  supportsPassiveEventListeners,
  supportsScrollBehavior,
} from '@angular/cdk/platform';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  leftStyle = 'step1';
  isEdge: any;
  name= '';
  flag1=false;
  flag=true;
  routeData: any;
  role= '';
  routeSub: Subscription;
  supportedInputTypes = Array.from(getSupportedInputTypes()).join(', ');
  supportsPassiveEventListeners = supportsPassiveEventListeners();
  supportsScrollBehavior = supportsScrollBehavior();
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;
  
  constructor(breakpointObserver: BreakpointObserver,
    public dataService: DataService,
    public router: Router,
    public platform: Platform) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step1response'; //handset mode
      }
    });
    breakpointObserver.observe([
      Breakpoints.WebLandscape,
      Breakpoints.Large,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step1'; //desktop mode
      }
    });
   }

  ngOnInit() {
    this.flag1= true;
    this.isEdge =  /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)    ;
    this.name = this.dataService.getUserInfo();
    this.role = this.dataService.getRoleInfo();
    this.dataService.postQuarterSplitBulk({ uID: this.dataService.getUserUid() });
  }

  ngOnDestroy(): void {
  }

  /**
   * Best guess at what's happening:
   * 1) The DataService sends an http request to get the active state and then
   *    saves the returned route data.
   * 2) To get the route data the DataService saves, this component subscribes
   *    to the route URL data Observable.
   * 3) Since the DataService's request to get the route data is an async
   *    request, the first value emitted by the Observable will likely be null,
   *    so null route data is ignored.
   * 4) When non-null route data is received, it is used to determine which URL
   *    to navigate to.
   * 5) The flag1 variable appears to mark whether addActiveState() has ever
   *    been called and prevents it from being called more than once. 
   */
  key12(){
    this.dataService.getActiveState();
    this.routeSub= this.dataService.routeUrldata.subscribe((data) =>{
      this.routeData = data;
      if(this.routeData){
        if(this.routeData.length === 0 && this.flag1){
          this.dataService.addActiveState({
            pageName: 'qadriver1',
          }).subscribe(() => {
            this.router.navigateByUrl('/plan/step2');
          });
          this.routeData = ['hell'];
          this.flag1=false;
        } else{
          this.router.navigateByUrl(this.routeData[0] ? this.routeData[0].route : '/journey/driver1');
        }
      }
    });
  }

  confirm(){
    this.dataService.resetKpi();
    this.router.navigateByUrl('/journey/kpijourney');
  }

  resetKpi(){
    document.getElementById('openModalButton').click();
  }

  next(){
    this.dataService.getActiveState();
    this.routeSub =  this.dataService.routeUrldata.subscribe((data) =>{
      this.routeData = data;
      if(this.routeData){
        if(this.routeData.length === 0 && this.flag){
          this.dataService.addActiveState({
            pageName: 'driver112',
          }).subscribe(() => {
            this.router.navigateByUrl('/plan/step2');
          });
          this.flag=false;
        }
        else{
          this.router.navigateByUrl(this.routeData[0].route);
        }

      }
    });
  }

  private isIE() {
    const match = navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/);
    let isIE = false;

    if (match !== -1) {
        isIE = true;
    }
    return isIE;
  }

  gotoDashboard():void {
    this.router.navigateByUrl("/dashboard");
  }
}
