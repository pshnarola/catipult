import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import * as $ from "jquery";
import 'bootstrap-notify';

import { DataServiceService } from "src/app/modules/dashboard/services/data-service/data-service.service";
import { SharedDataService } from '../../services/data.service';
import { SideNavDataService } from './data.service';

import { environment } from 'src/environments/environment';
import * as notification from 'src/app/shared/libraries/exports.library';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(public router: Router, public dataservice: DataServiceService, public route: ActivatedRoute, private dataService: SharedDataService, private modalService: BsModalService, private sideNavDataService: SideNavDataService) { }

  paramSubscription:Subscription;
  portfolioAccountSubscription:Subscription;
  isCoachSubscription:Subscription;
  userNameSubscription:Subscription;
  submitFeatureRequestSubscription:Subscription;
  organizationSubscription:Subscription;

  isPortfolioAccount:boolean = false;

  featureType:string;
  featureDescription:string;
  userEmail:string;
  newElement:string;
  url:string = environment.imgUrl + '/';
  name: string = null;
  version:string = environment.version;

  params:any;
  userRole: any;
  organizationData:any;

  featureTypeList: FeatureType[] = [
    { value: 'Enhancement', viewValue: 'Enhancement' },
    { value: 'Bug', viewValue: 'Bug' }
  ]
  
  ngOnInit() {
    this.setSubscriptions();
    this.startupScript();
  }

  ngOnDestroy(){
    this.destroySubscriptions();
  }

  setSubscriptions():void {
    this.paramSubscription = this.route.params.subscribe(params => {
      if (params){
        this.params = params;
      }
    });

    this.dataservice.setCoachStatus();
    this.isCoachSubscription = this.dataservice.isCoachData.subscribe(data=>{
      this.isPortfolioAccount = data;
    });

    this.userNameSubscription = this.dataservice.userNameData.subscribe((data:string) =>{
      this.name = data
    });

    this.organizationSubscription = this.sideNavDataService.organizationData.subscribe(data=>{
      this.organizationData = data;
    });
    
    this.sideNavDataService.getOrganizationData(this.dataservice.getOrgID());

  }

  startupScript():void {
    this.url = this.dataservice.getPhoto();
    this.dataservice.getUserInfo();
    this.userRole = this.dataservice.getRole().toLowerCase();
  }

  destroySubscriptions():void {
    this.paramSubscription ? this.paramSubscription.unsubscribe() : null;
    this.portfolioAccountSubscription ? this.portfolioAccountSubscription.unsubscribe() : null;
    this.isCoachSubscription ? this.isCoachSubscription.unsubscribe() : null;
    this.userNameSubscription ? this.userNameSubscription.unsubscribe() : null;
    this.submitFeatureRequestSubscription ? this.submitFeatureRequestSubscription.unsubscribe() : null;
  }

  qupdates() {
    this.router.navigateByUrl("/dash/quaupdates");
  }

  cupdates() {
    this.router.navigateByUrl("/dash/kpiupdates");
  }

  kpiAll() {
    this.router.navigateByUrl("/kpi");
  }

  mileAll() {
    this.router.navigateByUrl("/milestones");
  }

  rvQuestion() {
    this.router.navigateByUrl("/step2Review");
  }

  outStatement() {
    this.router.navigateByUrl("/dash/outstatement");
  }

  rDept() {
    this.router.navigateByUrl("/admin/department");
  }

  rUser() {
    this.router.navigateByUrl("/admin/roles");
  }

  rUsers() {
    this.router.navigateByUrl("/admin/invites");
  }

  manager() {
    this.router.navigateByUrl("/managers");
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

  dash() {
    // this.dataservice.setShowPortfolioView(false);
    this.router.navigateByUrl("/dashboard");
  }

  showPortfolioView():void {
    // this.dataservice.setShowPortfolioView(true);
    this.router.navigateByUrl('/portfolio');
  }

  goToCompanySetup():void {
    this.router.navigateByUrl('/admin/companySetup');
  }

  goToMeetings():void {
    this.router.navigateByUrl('meeting/home')
  }

  goToTutorials():void {
    this.router.navigateByUrl('/tutorials');
  }

  setNavFormatting(event):void{

    var header = document.getElementById("sidebar-menu");
    var cards = header.getElementsByClassName("nav-link");

    for (var i = 0; i < cards.length; i++) {
      cards[i].className = cards[i].className.replace(' isActive','');
    }
    document.getElementById(event.srcElement.id).className+= ' isActive';
  }

  showModal(template: TemplateRef<any>,cls:any){
    this.newElement = '';

    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: cls })  
    ); 
  }
  
  submitSuggestion():void {
    var body:any = {}

    body = { uID: JSON.parse(this.dataService.getToken()).uID,
      featureRequestType: this.featureType,
      featureRequestDescription: this.featureDescription,
      featureRequestStatus: 'Requested' }

      this.submitFeatureRequestSubscription = this.dataservice.submitFeatureRequestData.pipe(take(1)).subscribe((data:any) =>{
        if(data){
          notification.notification(data.status,data.msg,5000)
          this.userEmail = '';
          if(data.status.toLowerCase() == 'success'){
            this.modalRef.hide();
            this.clearModal();
            // this.dataservice.getUserPortfolioData(JSON.parse(this.dataService.getToken()).uID);
          }
        }
      });

    this.dataservice.submitFeatureRequest(body);
  }

  clearModal():void {
    this.featureDescription = '';
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
}

export interface FeatureType {
  value:string;
  viewValue:string;
}