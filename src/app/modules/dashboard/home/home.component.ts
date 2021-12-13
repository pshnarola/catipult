import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { DomSanitizer } from '@angular/platform-browser';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from "ng2-charts";
import { Subscription } from "rxjs";
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { DateTime } from 'luxon';

import { expandableTableRowAnimation } from 'src/app/shared/animations/exports.animation';

import { HttpServiceService } from "src/app/core/http-service/http-service.service";

import { DataServiceService } from "src/app/modules/dashboard/services/data-service/data-service.service";
import { DataService } from 'src/app/modules/admin/services/data.service';
import { SharedDataService } from 'src/app/shared/services/data.service'
import { TeamLevelAllDataService } from 'src/app/modules/dashboard/home/team-level-all/data.service';
import { IssueDataService } from '../../issue/data.service';

import * as notification from 'src/app/shared/libraries/exports.library';

declare var $: any;

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [ expandableTableRowAnimation ],
})
export class HomeComponent implements OnInit {

  @ViewChild('template', { static: true }) template: TemplateRef<any>;
  @ViewChild('id_milestone',{ static: false }) id_milestone!: ElementRef;

  modalRef: BsModalRef;

  expandedElement: Milestone | null;

  dataSubscription:Subscription[] = [];

  level3DisplayDataSubscription:Subscription;
  portfolioViewDataSubscription:Subscription;
  userInviteSubscription:Subscription;
  milestoneDataSubscription: Subscription;
  driverDetailSubscription:Subscription;
  portfolioAccountSubscription:Subscription;
  updateUserInviteSubscription:Subscription;
  notSub: Subscription;
  notSubC: Subscription;
  notSubC1: Subscription;
  notSubC2: Subscription;
  subM: Subscription;
  paramSub:Subscription;
  sub: Subscription;
  routeSub: Subscription;
  milestoneAssignUsersDataSubscription:Subscription;
  milestoneAssignUserDataL2Subscription:Subscription;
  userUidSubscription:Subscription;
  coachNameSubscription:Subscription;
  quarterListDataSubscription:Subscription
  driversDataSubscription:Subscription;
  milestoneAssignUsersDataL3Subscription:Subscription
  corporateKpiDataSubscription:Subscription;
  organizationUserListSubscription:Subscription;

  displayL3Detail:boolean = false;

  userUid:string = '';

  token = "";
  uID = this.DataService.getUserId();
  name = "";
  start = 1;
  lv2 = 0;
  lv3 = 0;
  lv4 = 0;
  currState = 0;
  currState1 = 0;
  currState2 = 0;
  currState3 = 0;
  currStateM = 0;
  driverID: any;
  userKpiDatal3: any;

  isResume = true;
  userCurrentIndex = 0;
  userCurrentIndex1 = 0;
  userCurrentIndex2 = 0;
  userCurrentIndex3 = 0;
  userCurrentIndexM = 0;
  notifications = [];
  flag = true;
  milestoneusers: any;
  userKpiDataM: any;
  milestonemanagers: any;
  milestoneusers1: any;
  milestoneusersl2: any;
  milestoneusersl3: any;
  userKpiDatal2: any;
  userKpiDatal4: any;
  milestoneusersKpi: any;
  depID: any;
  userInviteData:any;
  corporateKpiData:any;

  displayYouData: boolean = false;
  driverImg: any;
  kpiObjectiveEdit: string;
  kpiQuantityEdit: string;
  kpiUnitEdit: string;
  kpiAchievedQuantityEdit: string;
  kpiIdEdit: string;
  milestoneMilestoneEdit: string;
  milestoneDueDateEdit: string;
  milestoneStatusEdit: string;
  milestoneAssignedEdit: string;
  milestoneMileIdEdit: string;
  milestoneQuarterList: any;
  milestoneQuarterEdit: string;
  milestoneDataEdit: any;
  MilestoneQsIdEdit: string;
  driverName:string;
  coachName:string;

  kpiData: any;

  users: any;
  milestoneL2Displayed: boolean = false;
  showPortfolioView:boolean = false;
  milestoneL2Data: any;
  milestoneL2DataDisplay:any = null;
  milestoneL3DataDisplay:any = null;
  milestoneL4DataDisplay:any = null;

  userList: any = null;
  teamLevelAllUserList:any = null;

  url = "http://108.163.221.122:2004/";
  kpiData1: any;
  userRole: any;
  userKpiData: any;
  dashStatus: any;
  level: any;
  displayedColumns = ["position", "name", "weight", "symbol"];

  kpiColumns = ['KPI','Target','Unit','Actual','% of Target'];
  milestoneColumns = ['Milestone','Due Date','Status','User'];
  l2Uid:string = '';
  l2User:string = '';
  l3Uid:string = '';
  l3User:string = '';
  l4Uid:string = '';
  l4User:string = '';

  milestoneSummaryL2Data: any;
  milestoneSummaryL2ActualData: number;
  milestoneSummaryL2TargetData: number;
  milestoneSummaryL2PerformanceData: number;
  milestoneSummaryL3Data: any;
  milestoneSummaryL3ActualData: number;
  milestoneSummaryL3TargetData: number;
  milestoneSummaryL3PerformanceData: number;
  milestoneSummaryL4Data: any;
  milestoneSummaryL4ActualData: number;
  milestoneSummaryL4TargetData: number;
  milestoneSummaryL4PerformanceData: number;
  milestoneSummarySubscription: Subscription;


  leftStyle = "large";
  
  drivers: any;
  orgID: any;
  kpiMileData: any;
  issueData:any = [];

  PrintToolTip:string = 'Automatically generates a printable, real-time PDF report of the existing quarter’s progress. Any typos or formatting irregularities or missing information that exist in your account will be pulled into and/or missing from this report. To correct them, please review your data, including the information in the My Company section.'
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  }

  constructor(
    public router: Router,
    breakpointObserver: BreakpointObserver,
    public route: ActivatedRoute,
    public dataservice: DataServiceService,
    public dataService: DataService,
    public httpservice: HttpServiceService,
    private modalService: BsModalService,
    private DataService: SharedDataService,
    private TeamLevelAllDataService: TeamLevelAllDataService,
    private IssueDataService: IssueDataService,
    private sanitizer: DomSanitizer
  ) {

    this.routeSub = this.dataservice.routeUrldata.subscribe(data => {
      if (data && data.length>0) {
        if (data[0].route === "/dashboard") {
          this.isResume = false;
        } else {
          this.isResume = true;
        }
      }
    });
    this.dataservice.getActiveState();
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        if (result.matches) {
          this.leftStyle = "mobile";
        }
      });
    breakpointObserver
      .observe([
        Breakpoints.WebLandscape,
        Breakpoints.Large,
        Breakpoints.Medium
      ])
      .subscribe(result => {
        if (result.matches) {
          this.leftStyle = "large";
        }
      });
    
    
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  setUserStart(level) {
    switch (level) {
      case "L1":
        this.start = 2;
        break;
      case "L2":
        this.start = 3;
        break;
      case "L3":
        this.start = 4;
        break;
      default:
        break;
    }
    this.lv2 = this.start;
  }
  
  ngOnInit() {
    var arr: any; 
    
    this.dataservice.setShowPortfolioView(false);
    this.dataservice.getUserKpiMilestone(this.uID,this.driverID);
    this.setSubscriptions();
    this.runStartupScript();
    
    $(".nav-tabs").scrollingTabs({scrollToTabEdge: true});
    this.notSub = this.dataservice.notifydata.subscribe(data => {
      this.notifications = data;
    });
    const flag = false;

    this.url = this.dataservice.getPhoto();
    this.userRole = this.dataservice.getRole();
    this.level = this.dataservice.getLevel();
    this.setUserStart(this.level);

    this.milestoneusers = [];
    this.milestoneusers1 = [];
    this.milestonemanagers = [];
    this.userKpiDataM = [];
    this.name = this.dataservice.getUserInfo();
    this.depID = this.dataservice.getUserInfoList();
    this.orgID = this.dataservice.getOrgID();
    this.dataservice.mileStoneManagerUsersdata.subscribe(data => {
      this.milestonemanagers = data;
      if (data) {
      }
    });
    this.dataservice.getUserManagers(JSON.parse(this.DataService.getToken()).uID);

    this.milestoneAssignUsersDataSubscription = this.dataservice.userListPlusOneData.subscribe(data=>{
      this.milestoneusers = data;
    });

    this.dataservice.getUserListPlusOne(this.uID);

    this.dataService.orgFetch();

    this.dataService.orgIDdata.subscribe((data) =>{
      this.orgID = data;
    });

    // if(this.userRole == 'admin' || this.userRole == 'CEO' || this.userRole == 'Chief Executive Officer'){

    //   this.dataService.getAllUsers(this.orgID);
    //   this.dataService.usersdata.subscribe((data) => {
    //     var value: any;
    //     var key: any;
  
    //     this.users = data;
    //     this.userList = data;

    //     if (data){
    //       for ([key,value] of Object.entries(data)){
    //         this.user[key] = {uID: value.uID, userName: value.name + ' ' + value.lname}
    //       }
    //     }
    //   });  
    // } else {
    //   this.users = null;
    // }

    // this.dataservice.mileStoneAssignUsersdataKpi.subscribe(data => {
    //   this.milestoneusersKpi = data;
    // });

    this.dataservice.mileStoneAssignUsersdata1.subscribe(data => {
      this.milestoneusers1 = data;
      if (this.milestoneusers1) {
        this.milestoneusers1.forEach(element => {
          if (!element.User) {
            // delete element;
            element.User = {
              Kpis: []
            };
          }
        });
      }
    });

    this.milestoneAssignUserDataL2Subscription = this.dataservice.userListPlusTwoData.subscribe(data=>{
      this.milestoneusersl2 = data;
    });

    this.milestoneAssignUsersDataL3Subscription = this.dataservice.mileStoneAssignUsersdatal3.subscribe(data => {
      this.milestoneusersl3 = data;
      if (this.milestoneusersl3) {
        this.milestoneusersl3.forEach(element => {
          if (!element.User) {
            // delete element;
            element.User = {
              Kpis: []
            };
          }
        });
      }
    });

    this.driversDataSubscription = this.dataservice.driversdata.subscribe(data => {
      if (data) {
        this.drivers = data;

        // this.dataservice.getMileStoneAssignUsersKpi(this.drivers[0].driverID, this.depID, null, 'dash');
        this.dataservice.getMileStoneAssignUsers(this.drivers[0].driverID, null);
        this.dataservice.getKpiDriver(this.drivers[0].driverID);
        
        this.kpiMileData = [];
        this.driverImg = this.drivers[0].driverImage;
        this.driverID = this.drivers[0].driverID;
      }
    });
    this.sub = this.dataservice.milestonedata.subscribe(data => {
      this.kpiMileData = data;
    });

    this.subM = this.dataservice.kpiListdataM.subscribe(data => {
      this.userKpiDataM = data;
    });

    this.notSub = this.dataservice.kpiListdata.subscribe(data => {
      this.userKpiData = data;
    });

    this.notSubC = this.dataservice.kpiListdataC.subscribe(data => {
      this.userKpiDatal2 = data;
    });

    this.notSubC1 = this.dataservice.kpiListdataC1.subscribe(data => {
      this.userKpiDatal3 = data;
    });

    this.notSubC2 = this.dataservice.kpiListdataC2.subscribe(data => {
      this.userKpiDatal4 = data;
    });

    this.dataservice.getDrivers();

    this.paramSub = this.route.params.subscribe(params => {
      this.dataservice.getDashStatus(params.uID);
    });
    
    this.getUserData();

    this.quarterListDataSubscription = this.dataservice.quarterListdata.subscribe(data => {
      this.milestoneQuarterList = data;
    })

    this.dataservice.getMileStoneAssignUsersList(this.orgID, null, this.depID, 'dash', 'L' + this.start.toString());

    this.driverDetailSubscription = this.dataservice.driverIdData.subscribe(data => {
      if(data){
        this.driverName = data.driverName;
        this.driverID = data.driverID;
      }
    });

    this.level3DisplayDataSubscription = this.dataservice.level3DisplayData.subscribe(data=>{
        this.displayL3Detail = data
    })

    this.corporateKpiDataSubscription = this.dataservice.corporateKpiData.subscribe(data => {
      this.corporateKpiData = data;
    });

    this.TeamLevelAllDataService.getUserList(this.orgID);    

  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.destroySubscriptions();
  }
  
  setSubscriptions():void {
    this.portfolioViewDataSubscription = this.dataservice.showPortfolioViewData.subscribe(data=>{
      this.showPortfolioView = data
    })
    this.dataservice.getUserPortfolioData(this.DataService.getUserId());
    this.portfolioAccountSubscription = this.dataservice.userPortfolioData.subscribe(data => {
      if(data){
        this.dataservice.setPortfolioViewClass(true);
      }
    });
    
    this.userInviteSubscription = this.dataservice.userInviteData.subscribe((data:any) => {
      if(data.payload && data.payload.length>0){
        this.userInviteData = data.payload;
        if(!JSON.parse(this.DataService.getToken()).dismissNotifications){
          this.checkInvites(this.template);
        }
      }
    }); 

    this.coachNameSubscription = this.dataservice.coachInfoData.subscribe((data:any) => {
      if (data){
        this.coachName = data.coachName;
      }
    });

    this.organizationUserListSubscription = this.TeamLevelAllDataService.dataAccessUserListdata.subscribe(data=>{
      this.teamLevelAllUserList = data;
    });

    this.TeamLevelAllDataService.getDataAccessUserList(this.uID);

    this.dataSubscription.push(this.IssueDataService.getUserIssueData.subscribe((data:any)=>{
      this.issueData = data;
    }));

    this.IssueDataService.getMeetingUserIssue(this.uID);

  }

  destroySubscriptions():void {
    this.kpiMileData = [];
    this.dataservice.kpiListdataSource.next([]);
    this.sub ? this.sub.unsubscribe() : null;
    this.notSub ? this.notSub.unsubscribe() : null;
    this.notSubC ? this.notSubC.unsubscribe() : null;
    this.notSubC1 ? this.notSubC1.unsubscribe() : null;
    this.notSubC2 ? this.notSubC2.unsubscribe() : null;
    this.subM ? this.subM.unsubscribe() : null;
    this.milestoneSummarySubscription ? this.milestoneSummarySubscription.unsubscribe() : null;
    this.driverDetailSubscription ? this.driverDetailSubscription.unsubscribe() : null;
    this.milestoneAssignUsersDataSubscription ? this.milestoneAssignUsersDataSubscription.unsubscribe() : null;
    this.milestoneAssignUserDataL2Subscription ? this.milestoneAssignUserDataL2Subscription.unsubscribe : null;
    this.level3DisplayDataSubscription ? this.level3DisplayDataSubscription.unsubscribe() : null;
    this.paramSub ? this.paramSub.unsubscribe() : null;
    this.portfolioViewDataSubscription ? this.portfolioViewDataSubscription.unsubscribe() : null;
    // this.portfolioAccountSubscription ? this.portfolioAccountSubscription.unsubscribe() : null;
    this.userInviteSubscription ? this.userInviteSubscription.unsubscribe() : null;
    this.updateUserInviteSubscription ? this.updateUserInviteSubscription.unsubscribe() : null;
    this.userUidSubscription ? this.userUidSubscription.unsubscribe() : null;
    this.coachNameSubscription ? this.coachNameSubscription.unsubscribe() : null;
    this.quarterListDataSubscription ? this.quarterListDataSubscription.unsubscribe() : null;
    this.driversDataSubscription ? this.driversDataSubscription.unsubscribe() : null;
    this.milestoneAssignUsersDataL3Subscription ? this.milestoneAssignUsersDataL3Subscription.unsubscribe() : null;
    this.dataSubscription.forEach(s=>s.unsubscribe());
  }

  runStartupScript():void {
    this.dataservice.getUserInvite(this.DataService.getUserId());
    this.dataservice.getUserCoach();
  }

  ngAfterViewInit():void {
    var uId: string;

    uId = this.dataservice.userUidData
    this.dataservice.getUserAssignment(uId,this.driverID,'Home');
    // this.dataservice.setActiveUid(uId);
  }

  toggleClass() {
    const body = document.getElementsByTagName("body")[0];
    body.classList.remove("nav-sm");
    body.classList.add("nav-md");
  }

  getPassedData(ev) {
  }

  check(ev) {
    const v = ev ? ev : [];
    return v;
  }

  avg(ele) {
    let avg = 0.0;
    if (ele) {
      ele.forEach(element => {
        avg = avg + (element.achieveQty / element.qty) * 100;
      });
    } else {
      ele = [];
    }
    return avg / ele.length;
  }

  changeD(driverID, index) {

    this.resetMilestoneData();

    this.driverID = driverID;
    this.driverImg = this.parseArray(this.drivers,this.driverID,'driverID','driverImage');

    this.userKpiData = [];
    this.milestoneusers = [];
    this.milestoneusersl2 = [];
    this.milestoneusersl3 = [];
    this.userCurrentIndex = 0;
    this.userCurrentIndex1 = 0;
    // this.dataservice.getMileStoneAssignUsersList(this.orgID, null, this.depID, 'dash', 'L' + this.start.toString());
    // this.dataservice.getMileStoneAssignUsersKpi(driverID, this.depID, null, 'dash');
    this.dataservice.getMileStoneAssignUsers(driverID, null);

    this.dataservice.getKpiDriver(driverID);
  }

  getKpiM(item, i) {
    this.currStateM = i;
    this.userCurrentIndexM = i;
    this.userKpiDataM = [];

    this.dataservice.getUserKpiAllM(item.uID, this.driverID);
  }

  getKpi(item, i) {
    console.log('getKpi called');
  }

  getKpi1(item, i) {
    this.currState1 = i;
    this.userCurrentIndex1 = i;
    this.userKpiDatal2 = [];
    
    const deptID = item.Role ? item.Role.depID : this.depID;

    this.lv4 = this.start + 2;
    this.dataservice.getUserKpiAllC(item.uID, this.driverID, this.orgID);
    this.dataservice.getMileStoneAssignUsersl3(
      deptID,
      item.uID,
      "L" + this.lv4.toString()
    );
  }

  getKpi2(item, i) {

    this.dataservice.getUserMilestoneStatus(item.uID,3);

    this.currState2 = i;
    this.userCurrentIndex2 = i;
    this.userKpiDatal3 = [];
    this.l3User = item['name'] + ' ' + item['lname']

    this.l3Uid = item.uID;

    const deptID = item.Role ? item.Role.depID : this.depID;
    this.dataservice.getUserKpiAllC1(item.uID, this.driverID, this.orgID);
    this.lv4 = this.start + 2;
    if (this.level !== "L1") {
      this.dataservice.getMileStoneAssignUsersl3(
        deptID,
        item.uID,
        "L" + this.lv4.toString()
      );
    }
  }

  getKpi3(item, i) {

    this.dataservice.getUserMilestoneStatus(item.uID,4);

    this.currState3 = i;
    this.userCurrentIndex3 = i;
    this.userKpiDatal4 = [];
    this.l4User = item['name'] + ' ' + item['lname']

    this.l4Uid = item.uID;

    const deptID = item.Role ? item.Role.depID : this.depID;
    this.dataservice.getUserKpiAllC2(item.uID, this.driverID, this.orgID);
  }

  userChange(index) {
    this.getKpi(this.milestoneusers[index], 0);
  }

  dashStatusDegree(from, to) {
    if (from === 0 && to === 0) {
      return `rotate(-88deg)`;
    }
    return `rotate(${(from / to) * 180 - 88}deg)`;
  }

  perfChange(ev: any) {
  }

  resetKpi() {
    document.getElementById("openModalButton2").click();
  }

  anchorClicked(event) {}

  toggleClicked(event) {
    const target = event.srcElement.id;
    const body = $("body");
    const menu = $("#sidebar-menu");

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

  showYouData(){
    this.displayYouData = !this.displayYouData;
  }

  edit(element: any) {

    this.kpiObjectiveEdit = this.kpiMileData[element]['objective'];
    this.kpiQuantityEdit = this.kpiMileData[element]['qty'];
    this.kpiUnitEdit = this.kpiMileData[element]['unit'];
    this.kpiAchievedQuantityEdit = this.kpiMileData[element]['achieveQty'];
    this.kpiIdEdit = this.kpiMileData[element]['kpiID']

  }

  milestoneEdit(element:number){

    var data = this.milestoneusersKpi[element];

    this.milestoneDataEdit = this.dataservice.currentMilestoneData;

    this.milestoneMilestoneEdit = data['achieveText'];
    this.milestoneMileIdEdit = data['mileID'];
    this.milestoneDueDateEdit = data['dueDate'];
    this.milestoneStatusEdit = data['charpStatus'];
    this.milestoneAssignedEdit = data['User']['name'] + ' ' + data['User']['lname'];

    this.dataservice.getQuarterList(data['User']['uID']);

  }

  parseArray(arr: any, value: string, sourceAttribute: string, returnAttribute: string): string{

    let returnValue: string = 'unknown';

    Object.keys(arr).forEach(function(i){
      if (arr[i][sourceAttribute] == value) {
        returnValue = arr[i][returnAttribute];
      }
    });
    return returnValue;
  }

  updateKpiData(){
    this.kpiData = {
      achieveQty: this.kpiAchievedQuantityEdit,
      dependFlag: false,
      driverID: this.driverID,
      dueData: null,
      kpiID: this.kpiIdEdit,
      objective: this.kpiObjectiveEdit,
      qty: this.kpiQuantityEdit,
      unit: this.kpiUnitEdit
    }
    this.dataservice.updateUserKpi(this.kpiData)
    
    this.timeoutList();

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

    // this.dataservice.getMileStoneAssignUsersKpi(this.driverID, this.depID, null, 'dash');

  }

  timeoutList():void {
    setTimeout(() => {
      this.dataservice.getKpiDriver(this.driverID);
    }, 1000);
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
    } else if (level == 3){
      user = this.l3User;
      uID = this.l3Uid; 
    } else if (level == 4){
      user = this.l4User;
      uID = this.l4Uid; 
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
          } else if (level == 3){
            this.milestoneL3DataDisplay = milestones;
          } else if (level == 4){
            this.milestoneL4DataDisplay = milestones;
          }
        }
      })
  }

  resetMilestoneData(){
    this.milestoneL2DataDisplay = null;
    this.milestoneL3DataDisplay = null;
    this.milestoneL4DataDisplay = null;
    this.milestoneSummaryL2TargetData = null;
    this.milestoneSummaryL3TargetData = null
    this.milestoneSummaryL4TargetData = null;

    this.userKpiData = [];
    this.userKpiDatal2 = [];
    this.userKpiDatal3 = [];
    this.userKpiDatal4 = [];

    this.dataservice.getUserMilestoneStatus('unknown');

    if (this.milestoneDataSubscription){
      this.milestoneDataSubscription.unsubscribe();
    }
  }

  setMilestoneSubscription(){
    // this is to contain a single instance of the getUSerMilestoneData subscription
  }

  getUserData(): void{
    this.dataservice.getAllDeptUsers();
    if (this.userRole != 'admin' && this.userRole != 'CEO' && this.userRole != 'Chief Executive Officer') {
      this.dataservice.allDeptUsersData.subscribe(data => {
        this.userList = data;
      });
    }
  }

  updateQuarterList(): void {
    
    this.dataservice.getQuarterList(this.getEditUid());

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

  refreshMilestoneData():void {
    // this.dataservice.getMileStoneAssignUsersKpi(this.driverID, this.depID, null, 'dash');
  }

  checkInvites(template: TemplateRef<any>,):void {

    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'modal-md' })  
    ); 
  }
  
  dismissNotification():void {
    var sessionstorage:any = {}

    sessionstorage = JSON.parse(this.DataService.getToken())
    sessionstorage.dismissNotifications = true
    sessionStorage.setItem('user',JSON.stringify(sessionstorage));

    this.modalRef.hide();
  }

  sendNotificationResponse(response:string):void {

    var body = {
      userInviteId: this.userInviteData[0].userInviteId,
      inviteStatus: response,
      uID: this.DataService.getUserId()
    }

    var token:any;

    this.updateUserInviteSubscription = this.dataservice.updateUserInviteData.subscribe((data:any) => {
      if(data){
        this.modalRef.hide()
        notification.notification(data.status,data.msg,5000);
      }
    })
    this.dataservice.updateUserInvite(body);
  }

  async printDashboard():Promise<void> {
    let milestoneData:any;
    let kpiData:any;
    let kpiDetail:any=[];
    let orgData:any;
    let issueData:any;
    let issueDetail:any=[];
    let openData:any=[];
    let closedData:any=[];
    let reportDate:string;
    let q0:string =DateTime.now().startOf('quarter').toFormat('LL/dd/yyyy').toLocaleString()
    let q1:string = DateTime.now().startOf('quarter').plus({ months:3 }).toFormat('LL/dd/yyyy').toLocaleString()
    let q2:string = DateTime.now().startOf('quarter').plus({ months:6 }).toFormat('LL/dd/yyyy').toLocaleString()
    let qnegative1:string = DateTime.now().startOf('quarter').plus({ months:-3 }).toFormat('LL/dd/yyyy').toLocaleString() 
    let logo:string = null ? this.DataService.getUserOrgImg() : 'https://s3.amazonaws.com/catipult.ai.assets/images/icon.png'

    const colors = [
      {1:'#CCCCCC',2:'#5AA6D8'}
      ,{1:'#aaaaaa',
        2:'#b0b0b0',
        3:'#b6b6b6',
        4:'#bcbcbc',
        5:'#c2c2c2',
        6:'#c8c8c8',
        7:'#cecece',
        8:'#d4d4d4',
        9:'#dadada',
        10:'#e0e0e0',
        11:'#e6e6e6',
        12:'#ececec',
        13:'#f2f2f2',
        14:'#f9f9f9',
        15:'#ffffff'}
      ,{1:'#3ca9e0'}
    ];

    milestoneData = await this.dataservice.getOrgMilestones(this.orgID).toPromise();
    kpiData = await this.dataservice.getCorporateKpis(this.orgID,true).toPromise();
    orgData = await this.dataservice.getOrgInfo(this.orgID).toPromise();
    issueData = await this.dataservice.getOrgIssues(this.orgID).toPromise();
    reportDate = DateTime.now().toLocaleString(DateTime.DATE_MED)

    for (const i in issueData.payload){
      if(issueData.payload[i].issueStatus!='D'){
        issueDetail.push({
          Issue: issueData.payload[i].issueName,
          Status: issueData.payload[i].issueStatus,
          Owner: issueData.payload[i].User.name + ' ' + issueData.payload[i].User.lname
        })
      }
    }

    for (const m in milestoneData.payload){
      if(milestoneData.payload[m].Kpi.User.Role.leval=='L1'){
        if(milestoneData.payload[m].charpStatus!='D'){
          openData.push({
            KPI: milestoneData.payload[m].Kpi.objective,
            Rock: milestoneData.payload[m].achieveText,
            'Due Date': DateTime.fromISO(milestoneData.payload[m].dueDate).toFormat('LL/dd/yyyy'),
            Status: milestoneData.payload[m].charpStatus,
            Who: milestoneData.payload[m].User.name + ' ' + milestoneData.payload[m].User.lname
          });
        } else {
          closedData.push({
            KPI: milestoneData.payload[m].Kpi.objective,
            Rock: milestoneData.payload[m].achieveText,
            'Due Date': DateTime.fromISO(milestoneData.payload[m].dueDate).toFormat('LL/dd/yyyy'),
            Status: milestoneData.payload[m].charpStatus,
            Who: milestoneData.payload[m].User.name + ' ' + milestoneData.payload[m].User.lname
          });
        }
      }
    };

    for (const k in kpiData.payload) {
      kpiDetail.push({
        Driver: kpiData.payload[k].Driver.driverName,
        Target: this.numberWithCommas(kpiData.payload[k].qty),
        Actual: this.numberWithCommas(kpiData.payload[k].achieveQty),
        KPI: kpiData.payload[k].objective,
        Frequency: kpiData.payload[k].unit
      })
    }

    kpiDetail = kpiDetail.length>0 ? kpiDetail.sort((a,b)=>a.Driver.localeCompare(b.Driver)) : kpiDetail;
    openData = openData.length>0 ? openData.sort((a,b)=>a['Due Date'].localeCompare(b['Due Date'])) : openData;
    closedData = closedData.length>0 ? closedData.sort((a,b)=>a['Due Date'].localeCompare(b['Due Date'])) : closedData;
    
    let docDefinition = {
      defaultStyle:{
        font: 'HeroLight'
      },
      info:{
        title: 'Quarterly Report'
      },
      footer: {
        columns: [
          { text: 'CATIPULT.AI, INC. ALL RIGHTS RESERVED',style:'Footer', alignment: 'left',margin:[20,20,0,0] }
        ]
      },

      background: function (index) {
        var canvas=[];
        if (index==1){
          canvas = [{}
          ];  
        } else {
          canvas = [
            { type: 'rect',x:100,y:0,w:400,h:15,color: colors[2]['1'] },
          ]
        }
        return {
          canvas: canvas
        };
      },
      images: {
        FrontPage: await this.getBase64ImageFromURL('https://s3.amazonaws.com/catipult.ai.assets/images/Mug.jpg'),
        logo: await this.getBase64ImageFromURL(`${logo}`)
      },
      content: [  
        { text: reportDate, style: 'FrontPage-Date',margin:[0,20,0,0]},
        { text: this.DataService.getUserOrgName(), style: 'FrontPage-Company',margin:[0,20,0,0]},
        { text: 'Quarterly', style: 'FrontPage-Title-1',margin:[0,10,0,0]},
        { text: 'Report', style: 'FrontPage-Title-2'},
        { image: 'FrontPage' , width: 400,margin:[80,110,0,0] },
        { text: 'Mission', style: 'OrgPage-Title-Mission', pageBreak: 'before',margin:[0,30,0,0]},
        { text: 'Vision',style:'OrgPage-Title-Vision' },
        { text: 'Values',style:'OrgPage-Title-Values' },
        { text: 'Outcome',style:'OrgPage-Title-Outcome' },
        { text: 'Mission',style:'OrgPage-Subtitle',margin:[0,10,0,10] },
        { text: orgData.org.mission,style:'OrgPage-Detail',lineHeight:1.25 },
        { text: 'Vision',style:'OrgPage-Subtitle',margin:[0,20,0,10]},
        { text: orgData.org.vision,style:'OrgPage-Detail',lineHeight:1.25 },
        { text: 'Values',style:'OrgPage-Subtitle',margin:[0,20,0,10] },
        { text: orgData.org.values,style:'OrgPage-Detail',lineHeight:1.25},
        { text: '3-Year Outcome',style:'OrgPage-Subtitle',margin:[0,20,0,10]},
        { text: orgData.org.outcomeStatement,style:'OrgPage-Detail',lineHeight:1.25},
        { text: 'Corporate KPI Scorecard',style:'ScorecardPage-Title',pageBreak: 'before',margin:[0,30,0,0]},
        { text: 'What do we have to achieve to reach our 3 year objective?',style:'ScorecardPage-Subtitle',margin:[5,0,0,10]},
        this.table(kpiDetail, ['Driver','KPI','Target','Frequency','Actual'],'milestoneTable'),
        { text: 'THIS QUARTER\'S ROCKS', style: 'OpenMilestonePage-Title', pageBreak: 'before',margin:[0,30,0,0]},
        { text: 'How are we going to achieve our three-year KPIs?',style:'subheader',margin:[5,0,0,10]},
        this.table(openData.filter(data=>DateTime.fromFormat(data['Due Date'],'LL/dd/yyyy').ts>=DateTime.fromFormat(q0,'LL/dd/yyyy').ts&&DateTime.fromFormat(data['Due Date'],'LL/dd/yyyy').ts<DateTime.fromFormat(q1,'LL/dd/yyyy').ts), ['KPI', 'Rock','Due Date','Status','Who'],'milestoneTable'),
        { text: 'NEXT QUARTER\'S ROCKS', style: 'OpenMilestonePage-Title', pageBreak: 'before',margin:[0,30,0,0]},
        { text: 'How are we going to achieve our three-year KPIs?',style:'subheader',margin:[5,0,0,10]},
        // this.table(openData.filter(data=>data['Due Date']>=q1&&data['Due Date']<q2), ['KPI', 'Rock','Due Date','Status','Who'],'milestoneTable'),
        this.table(openData.filter(data=>DateTime.fromFormat(data['Due Date'],'LL/dd/yyyy').ts>=DateTime.fromFormat(q1,'LL/dd/yyyy').ts&&DateTime.fromFormat(data['Due Date'],'LL/dd/yyyy').ts<DateTime.fromFormat(q2,'LL/dd/yyyy').ts), ['KPI', 'Rock','Due Date','Status','Who'],'milestoneTable'),
        { text: 'CELEBRATING THE "DONE" BOX', style: 'DoneMilestonePage-Title',pageBreak: 'before',margin:[0,30,0,0]},
        { text: 'Getting it done!',style:'subheader',margin:[5,0,0,10]},
        this.table(closedData.filter(data=>DateTime.fromFormat(data['Due Date'],'LL/dd/yyyy').ts>=DateTime.fromFormat(qnegative1,'LL/dd/yyyy').ts&&DateTime.fromFormat(data['Due Date'],'LL/dd/yyyy').ts<DateTime.fromFormat(q0,'LL/dd/yyyy').ts), ['KPI','Rock','Due Date','Status','Who'], 'milestoneTable'),
        { text: 'Appendix', style: 'Appendix-Title',pageBreak:'before',margin:[0,30,0,0]},
        { text: 'Issues',style:'Issues-Title',pageBreak:'before',margin:[0,30,0,10]},
        this.table(issueDetail,['Issue','Status','Owner'],'milestoneTable')
      ],
      styles: {
        'Footer': {
          fontSize:9
        },
        'FrontPage-Date': {
          fontSize: 20,
          color: '#000000',
          bold: true
        },
        'FrontPage-Company': {
          fontSize: 20,
          color: '#000000',
          bold: true
        },
        'FrontPage-Title-1': {
          fontSize: 54,
          color: '#3ca9e0',
          bold: true
        },
        'FrontPage-Title-2': {
          fontSize: 54,
          color: '#3ca9e0',
          bold: true
        },
        'OrgPage-Title': {
          fontSize: 42,
          color: '#1f2532',
        },
        'OrgPage-Title-Mission':{
          fontSize:42,
          color:'#3ca9e0'
        },
        'OrgPage-Title-Vision':{
          fontSize:42,
          color:'#3ca9e0'
        },
        'OrgPage-Title-Values':{
          fontSize:42,
          color:'#3ca9e0'
        },
        'OrgPage-Title-Outcome':{
          fontSize:42,
          color:'#3ca9e0'
        },
        'OrgPage-Subtitle': {
          fontSize:24,
          color:'#3ca9e0'
        },
        'OrgPage-Detail': {
          fontSize:9,
          color:'#000000'
        },
        'ScorecardPage-Title': {
          fontSize: 42,
          color: '#114874',
        },
        'ScorecardPage-Subtitle': {
          fontSize:12,
          color: '#114874'
        },
        'DoneMilestonePage-Title': {
          fontSize:32,
          color:'#114874'
        },
        'OpenMilestonePage-Title': {
          fontSize:32,
          color:'#114874'
        },
        'Appendix-Title': {
          fontSize:48,
          color:'#114874',
          alignment:'center'
        },
        'Issues-Title':{
          fontSize:32,
          color:'#114874'
        },
        header: {
          fontSize:15,
          bold: true,
          color: '#114874'
        },
        subheader: {
          fontSize:9,
          color:'#114874'
        },
        milestoneTable: {
          border: [false,true,false,false],
          fontSize:9
        },
        'tableHeader': {
          fontSize:15
        },
        'tableBody': {
          fontSize:5
        }
      }
    }

    pdfMake.fonts = {
      HeroLight: {
        normal: 'https://s3.amazonaws.com/catipult.ai.assets/fonts/HeroLight-Light.otf',
        bold: 'https://s3.amazonaws.com/catipult.ai.assets/fonts/HeroLight-Light.otf',
        italics: 'https://s3.amazonaws.com/catipult.ai.assets/fonts/HeroLight-Light.otf',
        bolditalics: 'https://s3.amazonaws.com/catipult.ai.assets/fonts/HeroLight-Light.otf',
      }
    }
    pdfMake.createPdf(docDefinition).open();
  }

  buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
  }

  table(data, columns,style) {
      return {
          style:style,
          table: {
              headerRows: 1,
              body: this.buildTableBody(data,columns)
          },
          widths:[100,100,100,100],
          layout: {
            fillColor: function(rowIndex,node,columnIndex){
              return rowIndex == 0 ? '#3ca9e0' : (rowIndex % 2 ==0) ? '#e4f3fb' : null;
            },
            color: function(rowIndex,node,columnIndex){
              return rowIndex==0 ? '#ffffff' : '#000000'
            },
            defaultBorder: false
          }
      };
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result)
    }
    return reader.readAsDataURL(file);
  }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }
}

export interface Milestone {
  Milestone: string;
  'Due Date': string;
  Status: string;
  User: string
}

export interface Kpi {
 KPI: string;
 Target: string;
 Unit: string;
 Actual: string;
 '% of Target': string; 
}
