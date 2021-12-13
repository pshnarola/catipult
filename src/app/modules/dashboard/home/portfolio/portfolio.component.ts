import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Chart } from "chart.js";

import { DataServiceService } from "src/app/modules/dashboard/services/data-service/data-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service'
import { PortfolioDataService } from './data.service'
import { environment } from 'src/environments/environment'

import * as notification from 'src/app/shared/libraries/exports.library';
// import * as moment from 'moment';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private dataservice: DataServiceService, private modalService: BsModalService,private dataService: SharedDataService, private portFolioDataSerivce: PortfolioDataService) { }

  userPortfolioDataSubscription:Subscription;
  driverIdSubscription:Subscription;
  milestoneDataSubscription:Subscription;
  inviteUserSubscription:Subscription;
  userActivitySubscription:Subscription;
  driverListSubscription:Subscription;
  driverDefaultSubscription:Subscription;
  kpiListSubscription:Subscription;
  userAssignmentSubscription:Subscription;
  userKpiSubscription:Subscription;
  userMilestoneSubscription:Subscription;
  statusDefaultSubscription:Subscription;
  removeUserSubscription:Subscription;
  milestoneManagerSubscription:Subscription;
  milestoneAssignUsersDataSubscription:Subscription;
  level3DisplayDataSubscription:Subscription;
  milestoneAssignUserDataL2Subscription:Subscription;
  submitFeatureRequestSubscription:Subscription;
  corporateKpiDataSubscription:Subscription;
  dataSubscription:Subscription[] = [];

  userSelected:boolean = false;
  displayL3Detail:boolean = false;
  displayUngroupedUsers:boolean = true;

  driverID:string;
  uID:string;
  userEmail:string;
  newElement:string;
  newKpiObjective:string;
  newKpiQuantity:string;
  newKpiUnit:string;
  newKpiUrl:string;
  newMilestoneAssigned:string;
  newMilestoneStatus:string;
  newAssignmentType:string;
  newAssignmentDriver:string;
  newAssignmentKpi:string;
  newAssignmentDescription:string;
  newAssignmentUrl:string;
  newMilestoneMilestone:string;
  newMilestoneDriver:string;
  newMilestoneKpi:string;
  newKpiDriver:string;
  newTaskDriver:string;
  newTaskKpi:string;
  newMilestoneDueDate:string;
  newTaskStatus:string;
  removeUserUid:string;
  level:string;
  driverName:string;
  featureDescription:string;
  featureType:string;
  imgUrl:string = environment.imgUrl;

  userIndex:number;

  canvas: any;
  ctx: any;
  userPortfolioData:any = null;
  userPortfolioUsers:any = null;
  dashStatus:any;
  drivers:any;
  milestoneData:any;
  userActivityData:any;
  driverList:any;
  kpiList:any;
  corporateKpiData:any;
  milestonemanagers:any = [];
  milestoneusers:any = [];
  milestoneusersl2:any = [];
  activeUser:any;

  newGroupArray:any = null;
  addUserArray:any = [];
  deleteGroupArray:any = [];

  portfolioGroupData:any;

  charp : Charp[] = [
    { value: "C", viewValue: "Change" },
    { value: "H", viewValue: "Help" },
    { value: "A", viewValue: "Aware" },
    { value: "R", viewValue: "Redirect" },
    { value: "P", viewValue: "Plan" },
    { value: "D", viewValue: "Done" }
  ];


  type: AssignmentType[] = [
    {value: 'Reading', viewValue: 'Reading'}
  ];
  
  featureTypeList: FeatureType[] = [
    { value: 'Enhancement', viewValue: 'Enhancement' },
    { value: 'Bug', viewValue: 'Bug' }
  ]

  selectedUser:any; 
  'form-control':any;

  ngOnInit() {
    this.startupFunctions();
    this.setSubscriptions();

  }

  ngOnDestroy(){
    this.destroySubscriptions();
  }

  setSubscriptions():void {
    this.userPortfolioDataSubscription = this.dataservice.userPortfolioData.subscribe(data =>{
      if(data){
        this.userPortfolioData = data;
      }
    })

    this.dataSubscription.push(this.dataservice.userPortfolioUserData.subscribe(data=>{
      this.userPortfolioUsers = data
    }));

    this.driverIdSubscription = this.dataservice.driverIdData.subscribe(data => {
      if (data) {
        this.driverID = data.driverID;
        this.driverName = data.driverName;

        this.dataservice.getPortfolioUserMilestoneData(this.driverID,null,this.uID,null);
        this.dataservice.getPortfolioUserKpiData(this.uID,this.driverID);
      }
    });

    this.milestoneDataSubscription = this.dataservice.userMilestoneData.subscribe(data => {
      if (data){
        this.milestoneData = data;
      }
    });

    this.userActivitySubscription = this.dataservice.userActivityData.subscribe(data =>{
      if(data){
        this.setUserActivityChart(data);
      }
    });

    this.driverListSubscription = this.dataservice.driversdata.subscribe(data => {
      if (data){
        this.driverList = data;
      }
    });

    this.driverDefaultSubscription = this.dataservice.driverDefaultData.subscribe((data:any)=>{
      this.newAssignmentDriver = data.driverID;
      this.newMilestoneDriver = data.driverID;
      this.newTaskDriver = data.driverID;
    });

    this.statusDefaultSubscription = this.dataservice.statusDefaultData.subscribe(data=>{
      this.newTaskStatus = data
    });

    this.kpiListSubscription = this.dataservice.portfolioUserKpiListData.subscribe(data => {
      if(data){
        this.kpiList = data;
      }
    });

    this.milestoneManagerSubscription = this.dataservice.mileStoneManagerUsersdata.subscribe(data => {
      if (data) {
        this.milestonemanagers = data;
      }
    });

    this.milestoneAssignUsersDataSubscription = this.dataservice.userListPlusOneData.subscribe(data => {
      this.milestoneusers = data;
    });

    this.level3DisplayDataSubscription = this.dataservice.level3DisplayData.subscribe(data=>{
        this.displayL3Detail = data
    });

    this.milestoneAssignUserDataL2Subscription = this.dataservice.userListPlusTwoData.subscribe(data => {
      this.milestoneusersl2 = data;
    });

    this.corporateKpiDataSubscription = this.dataservice.corporateKpiData.subscribe(data => {
      this.corporateKpiData = data;
    });

    this.dataSubscription.push(this.portFolioDataSerivce.getPortfolioGroupData.subscribe((data:any)=>{
      this.portfolioGroupData = data && data.length>0 ? data.sort((a,b)=>a.portfolioGroupName.localeCompare(b.portfolioGroupName)) : data;
      for (const d in this.portfolioGroupData){
        this.portfolioGroupData[d].display = 'collapsed';
      }
    }))

    this.refreshPortfolioGroupData();
  }

  startupFunctions():void{
    this.dataservice.getDrivers();
    this.dataservice.getUserPortfolioData(JSON.parse(this.dataService.getToken()).uID);
  }

  destroySubscriptions():void {
    this.userPortfolioDataSubscription ? this.userPortfolioDataSubscription.unsubscribe() : null;
    this.driverIdSubscription ? this.driverIdSubscription.unsubscribe() : null;
    this.milestoneDataSubscription ? this.milestoneDataSubscription.unsubscribe() : null;
    this.inviteUserSubscription ? this.inviteUserSubscription.unsubscribe() : null;
    this.userActivitySubscription ? this.userActivitySubscription.unsubscribe() : null;
    this.driverListSubscription ? this.driverListSubscription.unsubscribe() : null;
    this.driverDefaultSubscription ? this.driverDefaultSubscription.unsubscribe() : null;
    this.kpiListSubscription ? this.kpiListSubscription.unsubscribe() : null;
    this.userAssignmentSubscription ? this.userAssignmentSubscription.unsubscribe() : null;
    this.userKpiSubscription ? this.userKpiSubscription.unsubscribe() : null;
    this.userMilestoneSubscription ? this.userMilestoneSubscription.unsubscribe() : null;
    this.statusDefaultSubscription ? this.statusDefaultSubscription.unsubscribe() : null;
    this.removeUserSubscription ? this.removeUserSubscription.unsubscribe() : null;
    this.submitFeatureRequestSubscription ? this.submitFeatureRequestSubscription.unsubscribe() : null;
    this.dataSubscription.forEach(d=>d.unsubscribe());
  }

  showUserDetail(index:number,u:any):void {
    this.userSelected = true;
    this.uID = u.uID;
    this.level = u.level

    // this.dataservice.setActiveUid(u.uID);
    this.selectedUser = u;
    this.dataservice.getDashStatus(u.uID);
    this.dataservice.getPortfolioUserKpiData(u.uID,this.driverID);
    this.dataservice.getPortfolioUserMilestoneData(this.driverID,null,u.uID,null);
    this.dataservice.setPortfolioUserRole(u.roleName);
    this.dataservice.setPortfolioUserLevel(u.Role.leval);
    this.dataservice.setPortfolioUserDepartment(u.Role.Department.depID);
    this.dataservice.setPortfolioUser(u.uID);
    this.dataservice.setPortfolioUserOrganization(u.Role.Department.Organization.orgID);
    this.dataservice.getUserAssignment(u.uID,this.driverID,'Portfolio-ShowUserDetail');
    this.dataservice.getUserManagers(u.uID);
    this.dataservice.getUserListPlusOne(u.uID);
    // this.dataservice.getUserListPlusTwo(this.uID);
    this.dataservice.getMileStoneAssignUsersl2(this.driverID,u.uID,u.Role.leval);
    this.dataservice.getCorporateKpi(u.uID,this.driverID,'Portfolio');
  }

  sendUserInvite(userEmail:string):void {

    var body:any = {}

    body={
      inviteUID:JSON.parse(this.dataService.getToken()).uID,
      inviteType:'Client',
      inviteStatus:'Invited',
      userEmail:userEmail
    }

    this.inviteUserSubscription = this.dataservice.inviteUserData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
        this.userEmail = '';
      }
    });

    this.dataservice.postUserInvite(body);

    this.modalRef.hide();

  }

  showModal(template: TemplateRef<any>,cls:any){
    this.newElement = '';

    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: cls })  
    ); 
  }

  getUserActivity():void {
    this.dataservice.getUserActivity(this.selectedUser.uID);
  }

  setUserActivityChart(data:any):void {

    this.canvas = document.getElementById(`userActivity`);
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels:['log in'],
        datasets: [{
          label: 'Log In by Day',
          data: data,
          backgroundColor: 'rgba(54,162,235,.2)',
          borderColor: 'rgba(54,162,235,1)',
          borderWidth:1
        }]
      },
      options: {
        scales: {
          xAxes:[{
            gridLines:{
              drawOnChartArea: false
            },
            type: 'time',
            distribution:'linear',
            ticks: {
              min: DateTime.local().minus({days: 30}).toJSDate(),
              max: DateTime.local().minus({days: -1}).toJSDate()
            },
            time: {
              displayFormats: {
                day:'MMM DD YYYY'
              },
              unit: 'day'
            }
          }],
          yAxes: [{
            gridLines: {
              drawOnChartArea:false
            },
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              max:5              
            }
          }]
        }
      }
    })
  }

  addTask(taskType:string):void {
    if(taskType=='milestone'){
      // this.newMilestoneAssigned = this.userPortfolioData[this.userIndex].user;
      this.newMilestoneAssigned = this.selectedUser.name + this.selectedUser.lname;
      this.newMilestoneStatus = 'Change';
    }

    this.newElement = taskType;
    this.newAssignmentType = 'Reading'
    this.dataservice.getPortfolioUserKpiListData(this.selectedUser.uID,this.newTaskDriver); // what does this do? refreshes KPI list

  }

  setUserIndex(index:number,user:any):void {
    this.userIndex = index;
    this.activeUser = user;
  }

  refreshKpiData():void {
    this.dataservice.getPortfolioUserKpiListData(this.selectedUser.uID,this.newTaskDriver); // what does this do? refreshes KPI list
  }

  createNewAssignment():void {
    var body:Object = {};

    body = {
      uID: this.selectedUser.uID,
      kpiID: this.newTaskKpi,
      assignmentType: this.newAssignmentType,
      assignmentDisplayText: this.newAssignmentDescription,
      assignmentUrl: this.newAssignmentUrl,
      assignmentStatus: 'Assigned'
    }

    this.userAssignmentSubscription = this.dataservice.postUserAssignmentData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        this.userEmail = '';
        if(data.status.toLowerCase() == 'success'){
          this.modalRef.hide();
        }
      }
    });

    this.dataservice.postUserAssignment(body);
    this.timeoutList();
  };

  createNewKpi():void {
    var body:Object = {};
    body = {
      objective: this.newKpiObjective,
      qty: this.newKpiQuantity,
      unit: this.newKpiUnit,
      driverID: this.newTaskDriver,
      uID: this.selectedUser.uID
    }

    this.userKpiSubscription = this.dataservice.postUserKpiData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        this.userEmail = '';
        if(data.status.toLowerCase() == 'success'){
          this.modalRef.hide();
          this.clearModal();
        }
      }
    });

    this.dataservice.postUserKpi(body);
    this.timeoutList();
  }

  createNewMilestone():void {

    var body:Object = {
      achieveText: this.newMilestoneMilestone,
      kpiID: this.newTaskKpi,
      dueDate: this.newMilestoneDueDate,
      charpStatus: this.newTaskStatus,
      uID: this.selectedUser.uID
    }

    this.userMilestoneSubscription = this.dataservice.postPortfolioMilestoneData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        this.userEmail = '';
        if(data.status.toLowerCase() == 'success'){
          this.modalRef.hide();
          this.clearModal();
        }
      }
    });

    this.dataservice.postPortfolioMilestone(body);
    this.timeoutList();
  }

  timeoutList():void {
    setTimeout(() => {
      this.dataservice.getPortfolioUserKpiData(this.selectedUser.uID,this.driverID);
      this.dataservice.getPortfolioUserMilestoneData(this.driverID,null,this.selectedUser.uID,null);
      this.dataservice.getUserAssignment(this.selectedUser.uID,this.driverID,'Portfolio-TimeoutList');
      this.dataservice.getDashStatus(this.selectedUser.uID);  
      this.dataservice.getCorporateKpi(this.selectedUser.uID,this.driverID,'Portfolio');
    }, 1000);
  }

  clearModal():void {
    this.newKpiObjective = '';
    this.newKpiQuantity = '';
    this.newKpiUnit = '';

    this.newMilestoneMilestone = '';
    this.newTaskKpi = '';
    this.newMilestoneDueDate = '';
    this.newTaskStatus = '';

    this.removeUserUid = null;
  }

  removeUser():void {

    var body:Object = {
      uID: this.removeUserUid,
      userType: 'coach'
    }

    if(!this.isGrouped(this.removeUserUid)){
      this.removeUserSubscription = this.dataservice.removePortfolioUserData.pipe(take(1)).subscribe((data:any) =>{
        if(data){
          notification.notification(data.status,data.msg,5000)
          this.userEmail = '';
          if(data.status.toLowerCase() == 'success'){
            this.modalRef.hide();
            this.clearModal();
            this.dataservice.getUserPortfolioData(JSON.parse(this.dataService.getToken()).uID);
          }
        }
      });
      this.dataservice.removePortfolioUser(body);  
    } else {
      notification.notification('Error','Ungroup user before removing from portfolio.',5000);
      this.modalRef.hide();
      this.clearModal();
    }
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
          }
        }
      });

    this.dataservice.submitFeatureRequest(body);
  }

  initializeNewGroup():void {
    if(!this.newGroupArray){
      this.newGroupArray = { uID: JSON.parse(this.dataService.getToken()).uID, portfolioGroupName: "" };
    } else {
      this.newGroupArray = null;
    }
  }

  createNewGroup(): void {
    this.dataSubscription.push(this.portFolioDataSerivce.postPortfolioGroupData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          this.refreshPortfolioGroupData();
          this.newGroupArray = null
        }
      }
    }));
    this.portFolioDataSerivce.postPortfolioGroup(this.newGroupArray);
  }

  refreshPortfolioGroupData():void {
    this.portFolioDataSerivce.getPortfolioGroup(JSON.parse(this.dataService.getToken()).uID);
  }

  deletePortfolioGroup(index:number):void {
    this.dataSubscription.push(this.portFolioDataSerivce.deletePortfolioGroupData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          this.refreshPortfolioGroupData();
          this.refreshData();
          this.deleteGroupArray = [];
        }
      }
    }));
    this.portFolioDataSerivce.deletePortfolioGroup(this.deleteGroupArray[index].portfolioGroupId);
  }

  expandPortfolioGroup(index:number):void {
    for (const g in this.portfolioGroupData){
      if(g==index.toString() && this.portfolioGroupData[g].display!='expanded' && this.portfolioGroupData[g].PortfolioGroupUsers.length>0){
        this.portfolioGroupData[g].display = 'expanded'
      } else {
        this.portfolioGroupData[g].display = 'collapsed'        
      }
    }
  }

  collapsePortfolioGroups():void {
    for (const g in this.portfolioGroupData){
        this.portfolioGroupData[g].display = 'collapsed'
    }

    this.displayUngroupedUsers = false;
  }

  initializeUser(group:any,index:number):void {
    if(this.addUserArray.length>0 && this.addUserArray[index].status=='write'){
      this.addUserArray = []
    }else {
      this.addUserArray = [];
      for (const g in this.portfolioGroupData){
        this.addUserArray.push({ uID:"", portfolioGroupId:group.portfolioGroupId, status: 'read' });  
      }
        this.addUserArray[index].status = 'write';
    }
  }

  addUserToGroup(index:number):void {
    this.dataSubscription.push(this.portFolioDataSerivce.postPortfolioGroupUserData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          this.refreshPortfolioGroupData();
          this.addUserArray = [];
          this.refreshData();
        }
      }
    }));
    this.portFolioDataSerivce.postPortfolioGroupUser(this.addUserArray[index]);
  }

  addPortfolioGroupUser():void {
    console.log(this.addUserArray);
  }

  initializeDelete(objectReference:string,key:string,index:number):void {
    // console.log(key);
    if(objectReference=='portfolioGroup'){
      if(this.deleteGroupArray.length>0 && this.deleteGroupArray[index].status=='write'){
        this.deleteGroupArray = []
      }else {
        this.deleteGroupArray = [];
        for (const g in this.portfolioGroupData){
          this.deleteGroupArray.push({ uID:"", portfolioGroupId:key, status: 'read' });  
        }
          // console.log(this.deleteGroupArray);
          this.deleteGroupArray[index].status = 'write';
      }  
    }
  }

  refreshData():void {
    this.dataservice.getUserPortfolioData(JSON.parse(this.dataService.getToken()).uID);
    this.refreshPortfolioGroupData();
  }

  ungroupUser(user:any):void {
    this.dataSubscription.push(this.portFolioDataSerivce.deletePortfolioGroupUserData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          this.addUserArray = [];
          this.refreshData();
        }
      }
    }));
    this.portFolioDataSerivce.deletePortfolioGroupUser(user.portfolioGroupUserId);
  }

  dropSelectedUser():void {
    this.selectedUser = null;
    this.userSelected = false;
    this.displayUngroupedUsers = true;
  }

  isGrouped(uID:string):boolean {
    for (const g in this.portfolioGroupData){
      for (const u in this.portfolioGroupData[g].PortfolioGroupUsers){
        if(uID==this.portfolioGroupData[g].PortfolioGroupUsers[u].User.uID){
          return true;
        }
      }
    }
    return false;
  }
}

export interface Charp {
  value: string;
  viewValue: string;
}

export interface AssignmentType {
  value: string;
  viewValue: string;
}

export interface FeatureType {
  value:string;
  viewValue:string;
}