import { Component, OnInit } from '@angular/core';

import { Subscription } from "rxjs";

import {DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';
import { DataService } from 'src/app/modules/admin/services/data.service';
import { SharedDataService } from 'src/app/shared/services/data.service'
import { expandableTableRowAnimation } from 'src/app/shared/animations/exports.animation';

@Component({
  selector: 'app-team-level-three',
  templateUrl: './team-level-three.component.html',
  styleUrls: ['./team-level-three.component.scss'],
  animations: [ expandableTableRowAnimation ]
})
export class TeamLevelThreeComponent implements OnInit {

  expandedElement: Milestone | null;

  milestoneUsersSubscription:Subscription;
  driverDetailSubscription:Subscription;
  milestoneSummarySubscription:Subscription;
  userKpiDataSubscription:Subscription;
  milestoneDataSubscription:Subscription;
  deptUserDataSubscription:Subscription;
  milestoneDataL2Subscription:Subscription;
  level3DisplayDataSubscription:Subscription;
  userPlusOneSubscription:Subscription;

  currState1:number = 0;
  currState2:number = 0;
  userCurrentIndex1:number = 0;
  userCurrentIndex2:number = 0;
  start:number = + JSON.parse(this.DataService.getToken())['level'].split('L')[1];
  lv2:number = this.start + 1
  lv3:number = this.lv2 + 1;
  lv4:number = this.lv3 + 1;
  milestoneSummaryL3ActualData:number;
  milestoneSummaryL3TargetData:number;
  milestoneSummaryL3PerformanceData:number;

  driverID:string;
  l3User:string = '';
  l3Uid:string = '';
  depID:string;
  driverName:string;
  orgID:string;
  userRole:string;
  level:string;

  milestoneusersl2: any;
  userKpiDatal3: any;
  milestoneSummaryL3Data: any;
  kpiColumns:any = ['KPI','Target','Unit','Actual','% of Target'];
  milestoneColumns:any = ['Milestone','Due Date','Status','User'];
  milestoneL3DataDisplay:any;
  userList:any = null;
  users:any;
  user: User[] = []

  constructor(private dataservice: DataServiceService, private dataService: DataService, private DataService: SharedDataService) { }

  ngOnInit() {
    this.setSubscriptions();
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  setSubscriptions():void {

    this.depID = this.dataservice.getUserInfoList();
    this.orgID = this.dataservice.getOrgID();
    this.userRole = this.dataservice.getRole();
    this.level = this.dataservice.getLevel();
        
    if(this.userRole == 'admin' || this.userRole == 'CEO' || this.userRole == 'Chief Executive Officer'){

      this.dataService.getAllUsers(this.orgID);
      this.dataService.usersdata.subscribe((data) => {
        var value: any;
        var key: any;
  
        this.users = data;
        this.userList = data;

        if (data){
          for ([key,value] of Object.entries(data)){
            this.user[key] = {uID: value.uID, userName: value.name + ' ' + value.lname}
          }
        }
      });  
    } else {
      this.deptUserDataSubscription = this.dataservice.allDeptUsersData.subscribe(data => {
        this.userList = data;
      });
    }
    
    this.driverDetailSubscription = this.dataservice.driverIdData.subscribe(data => {
      if(data){
        this.driverID = data.driverID;
        this.driverName = data.driverName;
        // this.dataservice.getMileStoneAssignUsersList(this.orgID, null, this.depID, 'dash', 'L' + this.start.toString());
        this.resetMilestoneData();  
      }
    });

    this.dataservice.mileStoneAssignUsersdatal2.subscribe(data => {
      this.milestoneusersl2 = data;
      if (this.milestoneusersl2) {
        this.milestoneusersl2.forEach(element => {
          if (!element.User) {
            element.User = {
              Kpis: []
            };
          }
        });
      }
    });

    this.milestoneSummarySubscription = this.dataservice.l2UserMilestoneSummaryData.subscribe(data => {
      Object.keys(data).forEach(function(i){
        if(data[i].driverID == this.driverID){
          if(data[i].level == 3){
            this.milestoneSummaryL3ActualData = data[i].pCount
            this.milestoneSummaryL3TargetData = data[i].total
            this.milestoneSummaryL3PerformanceData = (data[i].pCount / data[i].total)  
          }
        }
      },this)
    });

    this.userKpiDataSubscription = this.dataservice.kpiListdataC1.subscribe(data => {
      this.userKpiDatal3 = data;
    });

    this.milestoneDataL2Subscription = this.dataservice.userListPlusTwoData.subscribe(data=>{
      this.milestoneusersl2 = data;
    });

    this.userPlusOneSubscription = this.dataservice.userPlusOneData.subscribe(data=>{
      this.dataservice.getUserListPlusTwo(data);
    });
  }

  destroySubscriptions():void {
    this.milestoneUsersSubscription ? this.milestoneUsersSubscription.unsubscribe() : null;
    this.driverDetailSubscription ? this.driverDetailSubscription.unsubscribe() : null;
    this.milestoneSummarySubscription ? this.milestoneSummarySubscription.unsubscribe() : null;
    this.milestoneDataSubscription ? this.milestoneDataSubscription.unsubscribe() : null;
    this.deptUserDataSubscription ? this.deptUserDataSubscription.unsubscribe() : null;
    this.milestoneDataL2Subscription ? this.milestoneDataL2Subscription.unsubscribe() : null;
    this.userKpiDataSubscription ? this.userKpiDataSubscription.unsubscribe() : null;
    this.userPlusOneSubscription ? this.userPlusOneSubscription.unsubscribe() : null;
  }

  getKpi2(item, i) {

    this.dataservice.getUserMilestoneStatus(item.uID,this.lv3);

    this.currState2 = i;
    this.userCurrentIndex2 = i;
    this.userKpiDatal3 = [];
    this.l3User = item['name'] + ' ' + item['lname']

    this.l3Uid = item.uID;

    const deptID = item.Role ? item.Role.depID : this.depID;
    this.dataservice.getUserKpiAllC1(item.uID, this.driverID, this.orgID);

    if (this.level !== "L1") {
      this.dataservice.getMileStoneAssignUsersl3(
        deptID,
        item.uID,
        "L" + this.lv3.toString()
      );
    }
  }

  showMilestoneData(kpiID:string, level:number = 2):void {

    var arr:any = null;
    var uID:string;
    var user:string;
    var milestones: any = [];

    var driverID: string = this.driverID;

    if (level == 3){
      user = this.l3User;
      uID = this.l3Uid; 
    }

    this.dataservice.getUserKpiMilestone(uID,driverID);

    this.milestoneDataSubscription = this.dataservice.userMilestoneData.subscribe(data => {
        arr = data
        if (arr){
          milestones = [];
          Object.keys(arr).forEach(function(i){
            if (arr[i]['kpiID'] == kpiID) {
              Object.keys(arr[i].milestones).forEach(function(d){
                milestones.push({
                  Milestone: arr[i].milestones[d].achieveText,
                  Status: arr[i].milestones[d].charpStatus,
                  ['Due Date']: arr[i].milestones[d].dueDate,
                  User: this.getUserName(arr[i].milestones[d].uID)
                })  
              }, this)
              }
          }, this);
          
          if (level == 3){
            this.milestoneL3DataDisplay = milestones;
          } 
        }
      })
  }

  getUserName(uID:string = 'Unknown'):string {

    var arr: object = this.userList;
    var returnData: string = 'Unknown';

    Object.keys(arr).forEach(function(i){
      if (arr[i].uId == uID || arr[i].uID == uID){
        returnData = arr[i].name + ' ' + arr[i].lname;
      }
    })  

    return returnData;

  }

  getUserData(): void{
    this.dataservice.getAllDeptUsers();
    
  }

  resetMilestoneData():void {
    this.milestoneL3DataDisplay = null;
    this.milestoneSummaryL3TargetData = null;

    this.milestoneusersl2 = [];
    this.userKpiDatal3 = [];

    if (this.milestoneDataSubscription){
      this.milestoneDataSubscription.unsubscribe();
    }
  }
}

export interface Milestone {
  Milestone: string;
  'Due Date': string;
  Status: string;
  User: string
}

export interface User {
  uID: string;
  userName: string;
}
