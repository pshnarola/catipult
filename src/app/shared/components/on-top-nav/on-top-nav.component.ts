import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Subscription } from "rxjs";

import { take } from 'rxjs/operators';

import * as $ from "jquery";

import { environment } from 'src/environments/environment';
import { SharedDataService } from '../../services/data.service';
import { DataServiceService } from "src/app/modules/dashboard/services/data-service/data-service.service";
import * as notification from 'src/app/shared/libraries/exports.library';

@Component({
  selector: 'app-on-top-nav',
  templateUrl: './on-top-nav.component.html',
  styleUrls: ['./on-top-nav.component.scss']
})

export class OnTopNavComponent implements OnInit {
  modalRef: BsModalRef;
  
  isCoachSubscription:Subscription;
  isCoachedSubscription:Subscription;
  notificationSubscription:Subscription;
  removeCoachSubscription:Subscription
  userNameSubscription:Subscription;

  coachName:string;
  
  isPortfolioAccount:boolean = false;
  isCoached:boolean = false;
  flag:boolean = true;

  role= '';
  name= '';
  url= "http://108.163.221.122:2004/";
  headerTitle = "";

  notifications = [];
  notificationCount: number;

  constructor(public dataService: SharedDataService, public dataServiceService: DataServiceService, public router: Router, private modalService: BsModalService) { 

  }

  ngOnInit() {

    let curentRoute = this.router.url.split('/');
    console.log(': ===> curentRoute', curentRoute);
    if(curentRoute[1] === 'dashboard') {
      this.headerTitle = "World class company";
    } else if(curentRoute[1] === 'meeting') {
      this.headerTitle = "Meeting";
    }else {
      this.headerTitle = ""
    }

    this.role = this.dataService.getRoleInfo();
    const token =  this.dataService.getToken();
    const v = JSON.parse(token);
    this.url= environment.imgUrl ? environment.imgUrl: "http://108.163.221.122:2004/";

    this.setSubscriptions();
    this.startupScript();
    
    if(v.img){
      this.url = this.url+ v.img;
    }else{
      this.url = "assets/img.jpg";
    }
  }

  ngOnDestroy(){
    this.destroySubscriptions();
  }

  startupScript():void {
    this.dataServiceService.setIsCoachedStatus();
    this.dataService.getUserInfo();
  }

  setSubscriptions():void {
    this.isCoachSubscription = this.dataServiceService.isCoachData.subscribe(data=>{
      this.isPortfolioAccount = data;
    });

    this.isCoachedSubscription = this.dataServiceService.isCoachedData.subscribe(data=>{
      this.isCoached = data
    });

    this.notificationSubscription = this.dataServiceService.notifydata.subscribe(data => {
      this.notifications = data;
      if(this.notifications){
        this.notificationCount = data.length;
      }
    });

    this.dataServiceService.getNotifications("n");

    this.userNameSubscription = this.dataServiceService.userNameData.subscribe((data:string) =>{
      this.name = data
    });

    this.dataServiceService.getUserInfo();

    this.coachName = this.dataServiceService.getCoachName
  }

  destroySubscriptions():void {
    this.notificationSubscription ? this.notificationSubscription.unsubscribe() : null;
    this.isCoachSubscription ? this.isCoachSubscription.unsubscribe() : null;
    this.isCoachedSubscription ? this.isCoachedSubscription.unsubscribe() : null;
    this.userNameSubscription ? this.userNameSubscription.unsubscribe() : null;
  }

  confirm(){
    this.dataService.resetKpi();
    this.router.navigateByUrl('/journey/kpijourney');
  }

  adminRoute(){
    this.router.navigateByUrl('/admin');
  }

  login(){
    this.router.navigateByUrl('/account/login');
  }

  updateProfile(){
    this.router.navigateByUrl('/dash/profile');
  }

  routeHome(){
    // this.router.navigateByUrl('/journey/kpijourney');
    this.router.navigateByUrl('dashboard');
  }

  routePlanning(){
    this.router.navigateByUrl('/journey/kpijourney');
  }
  
  resetKpi(){
    document.getElementById('openModalButton2').click();
  }

  notify() {
    this.router.navigateByUrl("/dash/notification");
  }

  goToUrl(url:any):void {
    const link = document.createElement('a');

    if(url){
      if (!/^http[s]?:\/\//.test(url)) {
        url = 'http://' + url;
      }
  
      link.target = '_blank';
      link.href = url;
      
      link.setAttribute('visibility', 'hidden');
      link.click();  
    }
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

  getConnected():void {
    
    notification.notification('Info',"We're scanning our network of coaches to find you a perfect fit.",10000);
    this.dataServiceService.requestCoachData.pipe(take(1)).subscribe((data:any)=>{
      if (data){
            notification.notification(data.status,data.msg,10000);
          }
    });
    this.dataServiceService.requestCoach({email:JSON.parse(this.dataService.getToken()).email,name:JSON.parse(this.dataService.getToken()).name});
  }

  removeCoach():void {
    var body:Object = {
      uID: JSON.parse(this.dataService.getToken()).uID,
      userType: 'user'
    }

    var token:any;

    this.removeCoachSubscription = this.dataServiceService.removePortfolioUserData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          this.modalRef.hide();
          token = JSON.parse(this.dataService.getToken());
          token.isCoached = false;
          token.coachName = null;
          sessionStorage.setItem('user',JSON.stringify(token));
          this.dataServiceService.setIsCoachedStatus();
        }
      }
    });

    this.dataServiceService.removePortfolioUser(body);
  }
  
  hideModal():void {
    this.modalRef.hide();
  }
  
  showModal(template: TemplateRef<any>,cls:any){
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: cls })  
    ); 
  }

}
