import { Component, OnInit } from '@angular/core';

import { Subscription } from "rxjs";

import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';
import { DataService } from 'src/app/modules/admin/services/data.service';
import { SharedDataService } from 'src/app/shared/services/data.service'
import { expandableTableRowAnimation } from 'src/app/shared/animations/exports.animation';

@Component({
  selector: 'app-portfolio-team-level-two',
  templateUrl: './team-level-two.component.html',
  styleUrls: ['./team-level-two.component.scss'],
  animations: [ expandableTableRowAnimation ]
})
export class PortfolioTeamLevelTwoComponent implements OnInit {

  expandedElement: Milestone | null;

  milestoneUsersSubscription:Subscription;
  driverDetailSubscription:Subscription;
  milestoneSummarySubscription:Subscription;
  userKpiDataSubscription:Subscription;
  milestoneDataSubscription:Subscription;
  deptUserDataSubscription:Subscription;
  portfolioUserDataSubscription:Subscription;

  currState:number = 0;
  userCurrentIndex:number = 0;
  start:number = + JSON.parse(this.DataService.getToken())['level'].split('L')[1];
  lv2:number = this.start + 1;
  lv3:number = this.lv2 + 1;
  milestoneSummaryL2ActualData:number;
  milestoneSummaryL2TargetData:number;
  milestoneSummaryL2PerformanceData:number;

  driverID:string;
  l2User:string = '';
  l2Uid:string = '';
  depID:string;
  driverName:string;
  orgID:string;
  userRole:string;

  milestoneusers: any;
  userKpiData: any;
  milestoneSummaryL2Data: any;
  kpiColumns:any = ['KPI','Target','Unit','Actual','% of Target'];
  milestoneColumns:any = ['Milestone','Due Date','Status','User'];
  milestoneL2DataDisplay:any;
  userList:any = null;
  users:any;
  user: User[] = []

  constructor(private dataservice: DataServiceService, private dataService: DataService, private DataService: SharedDataService) { }

  ngOnInit() {
    this.resetMilestoneData();
    this.setSubscriptions();
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  setSubscriptions():void {

    this.depID = this.dataservice.getUserInfoList();
    this.orgID = this.dataservice.getOrgID();
    this.userRole = this.dataservice.getRole();
        
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
        this.dataservice.getMileStoneAssignUsersList(this.orgID, null, this.depID, 'dash', 'L' + this.lv2.toString());
        this.resetMilestoneData();  
      }
    });

    this.milestoneUsersSubscription = this.dataservice.userListPlusOneData.subscribe(data => {
      this.milestoneusers = data;
    });

    this.portfolioUserDataSubscription = this.dataservice.portfolioUserData.subscribe(data => {
      this.dataservice.getUserListPlusOne(data);
    });

    this.milestoneSummarySubscription = this.dataservice.userMilestoneSummaryData.subscribe(data => {
      Object.keys(data).forEach(function(i){
        if(data[i].driverID == this.driverID){
          if(data[i].level == 2){
            this.milestoneSummaryL2ActualData = data[i].pCount
            this.milestoneSummaryL2TargetData = data[i].total
            this.milestoneSummaryL2PerformanceData = (data[i].pCount / data[i].total)  
          }
        }
      },this)
    });

    this.userKpiDataSubscription = this.dataservice.kpiListdata.subscribe(data => {
      this.userKpiData = data;
    });
  }

  destroySubscriptions():void {
    this.milestoneUsersSubscription ? this.milestoneUsersSubscription.unsubscribe() : null;
    this.driverDetailSubscription ? this.driverDetailSubscription.unsubscribe() : null;
    this.milestoneSummarySubscription ? this.milestoneSummarySubscription.unsubscribe() : null;
    this.milestoneDataSubscription ? this.milestoneDataSubscription.unsubscribe() : null;
    this.deptUserDataSubscription ? this.deptUserDataSubscription.unsubscribe() : null;
    this.portfolioUserDataSubscription ? this.portfolioUserDataSubscription.unsubscribe() : null;
  }

  getKpi(item, i) {

    this.dataservice.getUserKpiMilestone(item.uID,this.driverID);
    this.dataservice.getUserMilestoneStatus(item.uID,2);
    this.dataservice.getUserListPlusTwo(item.uID);
    this.dataservice.setUserPlusOne(item.uID);
    
    this.currState = i;
    this.userCurrentIndex = i;
    this.userKpiData = [];
    this.l2User = item['name'] + ' ' + item['lname']

    this.l2Uid = item.uID;

    const deptID = item.Role ? item.Role.depID : this.depID;

    this.dataservice.getUserKpiAll(item.uID, this.driverID);  
    this.dataservice.getUserKpiAllC1('false',null,null);
    this.dataservice.setLevel3Display(true);
  }

  showMilestoneData(kpiID:string, level:number = 2):void {

    var arr:any = null;
    var uID:string;
    var user:string;
    var milestones: any = [];

    var driverID: string = this.driverID;

    if (level == 2){
      user = this.l2User;
      uID = this.l2Uid; 
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
          
          if (level == 2){
            this.milestoneL2DataDisplay = milestones;
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
    this.milestoneL2DataDisplay = null;
    this.milestoneSummaryL2TargetData = null;

    this.userKpiData = [];

    this.dataservice.getUserMilestoneStatus('unknown');

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
