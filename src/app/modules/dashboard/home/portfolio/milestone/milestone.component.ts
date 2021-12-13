import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';
import { DataService } from 'src/app/modules/admin/services/data.service';
import { controllers } from 'chart.js';

@Component({
  selector: 'app-portfolio-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})

export class PortfolioMilestoneComponent implements OnInit {
  modalRef: BsModalRef;

  displayMilestoneData: boolean = true;
  displayMilestoneDetail:boolean = false;
  displayMilestoneArchive:boolean = false;

  driverIdSubscription:Subscription;
  paramSubscription:Subscription;
  milestoneSubscription:Subscription;
  driverDataSubscription:Subscription;
  userSubscription:Subscription;
  dashStatusSubscription:Subscription;
  portfolioUserDepartmentSubscription:Subscription;
  portfolioUserLevelSubscription:Subscription;
  portfolioUserUserDataSubscription:Subscription;
  portfolioUserDataSubscription:Subscription;
  portfolioUserOrganizationSubscription:Subscription;

  milestoneDueDateEdit:string;
  milestoneMilestoneEdit:string;
  milestoneMileIdEdit:string;
  milestoneStatusEdit:string;
  MilestoneQsIdEdit:string;
  milestoneAssignedEdit:string;
  driverID:string;
  driverName:string;
  depID:string;
  userRole:string;
  level:string;
  
  user: User[] = []
  
  portfolioOrgId:any;
  portfolioUserId:any;
  portfolioUserDepId:any;
  portfolioUserLevel:any;
  milestoneDataEdit:any;
  userList:any
  milestoneQuarterList:any;
  milestoneusersKpi:any;
  milestoneUsersKpiRemaining:any;
  milestoneUsersKpiDone:any;
  driverImg: any;
  driverData:any;
  orgID: any;
  users: any;
  params:any;
  dashStatus:any;
  pieChartData:any;
  'form-control':any;
  form:any;
  control:any;

  charp : Charp[] = [
    { value: "C", viewValue: "Change" },
    { value: "H", viewValue: "Help" },
    { value: "A", viewValue: "Aware" },
    { value: "R", viewValue: "Redirect" },
    { value: "P", viewValue: "Plan" },
    { value: "D", viewValue: "Done" }
  ];

  constructor(
    private dataservice: DataServiceService,
    public dataService: DataService, 
    private modalService: BsModalService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
  
    this.setSubscriptions();
  
  }


  ngOnDestroy(){

    this.destroySubscriptions();

  }

  setSubscriptions():void{

    this.paramSubscription = this.route.params.subscribe(params => {
      if (params){
        this.params = params
      }
    });

      this.orgID = this.dataservice.getOrgID();

    this.driverIdSubscription = this.dataservice.driverIdData.subscribe(data =>{
      this.driverID = data.driverID;
      this.driverName = data.driverName;
    });

    this.depID = this.dataservice.getUserInfoList();

    this.dataservice.getMileStoneAssignUsersKpi(this.driverID, this.depID, null, 'dash');

    this.milestoneSubscription = this.dataservice.portfolioUserMilestoneData.subscribe(data => {
      if(data){
        this.milestoneUsersKpiRemaining = this.isNotDone(data);
        this.milestoneUsersKpiDone = this.isDone(data);
        if(!this.displayMilestoneArchive){
          this.milestoneusersKpi = this.milestoneUsersKpiRemaining;
        } else {
          this.milestoneusersKpi = this.milestoneUsersKpiDone;
        }
      }
    });

    this.driverDataSubscription = this.dataservice.driversdata.subscribe(data => {
      if (data) {
        this.driverData = data;
        this.setDriverImg();
      }
    });

    this.userRole = this.dataservice.getRole();

    this.getUserData();

    this.dataservice.quarterListdata.subscribe(data => {
      this.milestoneQuarterList = data;
    });

    this.driverIdSubscription = this.dataservice.driverIdData.subscribe(data =>{
      if (data){
        this.driverID = data.driverID;
        this.dashStatusSubscription ? this.dashStatusSubscription.unsubscribe() : null;
        this.dashStatusSubscription = this.dataservice.dashStatusdata.subscribe(data => {
          if (data) {
            this.dashStatus = this.setCharpData(data,this.driverID);
            this.pieChartData = [
              this.dashStatus.cCount,
              this.dashStatus.hCount,
              this.dashStatus.aCount,
              this.dashStatus.rCount,
              this.dashStatus.pCount
            ];
          }
        });
      }
    });

  }

  destroySubscriptions():void{

    this.driverIdSubscription ? this.driverIdSubscription.unsubscribe() : null;
    this.paramSubscription ? this.paramSubscription.unsubscribe() : null;
    this.milestoneSubscription ? this.milestoneSubscription.unsubscribe() : null;
    this.driverDataSubscription ? this.driverDataSubscription.unsubscribe() : null;
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
    this.portfolioUserDepartmentSubscription ? this.portfolioUserDepartmentSubscription.unsubscribe() : null;
    this.portfolioUserLevelSubscription ? this.portfolioUserLevelSubscription.unsubscribe() : null;
    this.portfolioUserUserDataSubscription ? this.portfolioUserUserDataSubscription.unsubscribe() : null;
    this.portfolioUserDataSubscription ? this.portfolioUserDataSubscription.unsubscribe() : null;
    this.portfolioUserOrganizationSubscription ? this.portfolioUserOrganizationSubscription.unsubscribe() : null;
  }

  refreshMilestoneData():void {
    this.dataservice.getMileStoneAssignUsersKpi(this.driverID, this.depID, null, 'dash');
  }

  getUserData(): void{
    this.portfolioUserDepartmentSubscription = this.dataservice.portfolioUserDepartmentData.subscribe(data => {
      if(data){
        this.portfolioUserDepId = data;
        this.portfolioUserLevelSubscription = this.dataservice.portfolioUserLevelData.subscribe(data => {
          if(data){
            this.portfolioUserLevel = data;
            this.portfolioUserUserDataSubscription = this.dataservice.portfolioAllDeptUsersData.subscribe(data => {
              this.userList = data;
            });
            this.portfolioUserDataSubscription = this.dataservice.portfolioUserData.subscribe(data => {
              this.portfolioUserId = data;
            })
            this.portfolioUserOrganizationSubscription = this.dataservice.portfolioUserOrganizationData.subscribe(data => {
              this.portfolioOrgId = data
              this.dataservice.getPortfolioUserAllDeptUsers(this.portfolioUserDepId,this.portfolioUserLevel,this.portfolioOrgId,this.portfolioUserId);
            })
          }
        })
      }
    })
  }

  updateQuarterList(): void {
    this.dataservice.getQuarterList(this.getEditUid());
  }

  milestoneEdit(template: TemplateRef<any>,element: any){
    this.setDriverImg();
    if (!this.displayMilestoneArchive){
      var data = this.milestoneUsersKpiRemaining[element];
    } else if (this.displayMilestoneArchive){
      var data = this.milestoneUsersKpiDone[element];
    }
    this.milestoneDataEdit = this.dataservice.currentMilestoneData;
    this.milestoneMilestoneEdit = data['achieveText'];
    this.milestoneMileIdEdit = data['mileID'];
    this.milestoneDueDateEdit = data['dueDate'];
    this.milestoneStatusEdit = data['charpStatus'];
    this.milestoneAssignedEdit = data['User']['name'] + ' ' + data['User']['lname'];
    this.dataservice.getQuarterList(data['User']['uID']);
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'modal-md' })  
    ); 
  }

  updateMilestoneData(){

    var milestoneData: any;
    var quarterData: any;
    var uId: string;

    uId = this.getEditUid();

    milestoneData = {
      dueDate: this.milestoneDueDateEdit,
      achieveText: this.milestoneMilestoneEdit,
      mileID: this.milestoneMileIdEdit,
      uID: uId,
      charpStatus: this.milestoneStatusEdit
    }

    quarterData = this.getQuarterData(this.milestoneDataEdit,this.milestoneMileIdEdit)
    quarterData.qsID = this.getEditQsid();
    quarterData.uID = uId;

    this.dataservice.updateMilestone(milestoneData);
    this.dataservice.updateMilestoneQuarter(quarterData);

    this.timeoutList();
    
    this.modalRef.hide();

  }
  
  getEditUid(): string {
    
    var uId: string = 'Unknown';
    var arr: any;
    var matchValue: string;
    
    arr = this.userList;
    matchValue = this.milestoneAssignedEdit;

    Object.keys(arr).forEach(function(i){
      if (arr[i]['name'] + ' ' + arr[i]['lname'] == matchValue) {
        uId = arr[i]['uId'] || arr[i]['uID'];
      }
    });
    return uId;
  }

  getEditQsid(): string {
    
    var qsId: string = 'Unknown';
    var arr: any;
    var matchValue: string;
    
    arr = this.milestoneQuarterList;
    matchValue = this.milestoneDueDateEdit;

    Object.keys(arr).forEach(function(i){
      if (arr[i]['startDate']<=matchValue && arr[i]['endDate']>=matchValue){
          qsId = arr[i]['qsID'];
        } else if (arr[0]['startDate']>matchValue){
          qsId = arr[0]['qsID'];
        } else if (arr[arr.length-1]['startDate']<matchValue){
          qsId = arr[arr.length-1]['qsID'];
        }
      });
    return qsId;
  }

  getQuarterData(arr:object, matchValue: string): object {
    
    var data: object = {};

    Object.keys(arr).forEach(function(i){
      Object.keys(arr[i]['Milestones']).forEach(function(n){
        if (arr[i]['Milestones'][n]['mileID'] == matchValue){
          if (arr[i]['Milestones'][n]['QuarterKpiAssigns'].length > 0 && arr[i]['Milestones'][n]['QuarterKpiAssigns'][0].hasOwnProperty('qkaID')){
            data = {qkaID: arr[i]['Milestones'][n]['QuarterKpiAssigns'][0]['qkaID']};
          } else {
            data = {qkaID: 'Unknown'};
          }
          } else {
            data = {qkaID: 'Unknown'};
        } 
      });
    });
    return data;
  }
  
  showMilestoneData(){
    this.displayMilestoneData = !this.displayMilestoneData;
  }

  showMilestoneDetail(){
    this.displayMilestoneDetail = !this.displayMilestoneDetail;
  }

  showMilestoneArchive(){
    this.displayMilestoneArchive = !this.displayMilestoneArchive;
    if(!this.displayMilestoneArchive){
      this.milestoneusersKpi = this.milestoneUsersKpiRemaining;
    } else {
      this.milestoneusersKpi = this.milestoneUsersKpiDone;
    }
  }

  setDriverImg(): void{
    Object.keys(this.driverData).forEach(function(i){
      if(this.driverData[i].driverID == this.driverID){
        this.driverImg = this.driverData[i].driverImage;
      }
    },this)
  }

  timeoutList():void {
    setTimeout(() => {
      this.dataservice.getMileStoneAssignUsersKpi(this.driverID, this.depID, null, 'dash');
      this.dataservice.getDashStatus(this.portfolioUserId);  
      this.dataservice.getPortfolioUserMilestoneData(this.driverID,this.depID,this.portfolioUserId,'dash')
    }, 1000);
  }

  setCharpData(data:any, driverID:any): void{
    var returnData:any = {};

    Object.keys(data).forEach(function(i){
      if(data[i].driverID == driverID){
        returnData = data[i];
      }
    },this)
    
    return returnData;
  }

  isNotDone(array){

    var arr:any = [];

    Object.keys(array).forEach(function(i){
      if (array[i].charpStatus!="D"){
        arr.push(array[i]);
      }
    });

    return arr;
  }

  isDone(array){

    var arr:any = [];

    Object.keys(array).forEach(function(i){
      if (array[i].charpStatus=="D"){
        arr.push(array[i]);
      }
    });

    return arr;
  }
  
}

export interface Charp {
  value: string;
  viewValue: string;
}

export interface User {
  uID: string;
  userName: string;
}