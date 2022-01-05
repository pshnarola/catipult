import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';


import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';
import { DataService } from 'src/app/modules/admin/services/data.service';
import { TeamLevelAllDataService } from 'src/app/modules/dashboard/home/team-level-all/data.service';

import { environment } from 'src/environments/environment';
import * as notification from 'src/app/shared/libraries/exports.library';

import { DateTime } from 'luxon';

@Component({
  selector: 'app-dashboard-milestone',
  templateUrl: './milestone.component.html',
  styleUrls: ['./milestone.component.scss']
})

export class MilestoneDashboardComponent implements OnInit {

  modalRef: BsModalRef;

  displayMilestoneData: boolean = true;
  displayMilestoneDetail:boolean = false;
  displayMilestoneArchive:boolean = false;
  milestoneRecurringEdit:boolean = false;
  milestoneRecurringNew:boolean = false;
  isUserSharingAccess:boolean = false;

  driverIdSubscription:Subscription;
  paramSubscription:Subscription;
  milestoneSubscription:Subscription;
  driverDataSubscription:Subscription;
  userSubscription:Subscription;
  dashStatusSubscription:Subscription;
  driverListSubscription:Subscription;
  driverDefaultSubscription:Subscription;
  getUserUidSubscription:Subscription;
  statusDefaultSubscription:Subscription;
  kpiListSubscription:Subscription;
  userMilestoneSubscription:Subscription;
  userDeleteMilestoneSubscription:Subscription;
  postUserDataAccessSubscription:Subscription;
  userDataAccessListSubscription:Subscription;
  putUserDataAccessSubscription:Subscription;
  organizationUserListSubscription:Subscription;

  userIndex:number;
  
  videoUrl:string = environment.videoUrl + 'charp.mp4';
  milestoneDueDateEdit:string;
  milestoneMilestoneEdit:string;
  milestoneMileIdEdit:string;
  milestoneStatusEdit:string;
  MilestoneQsIdEdit:string;
  milestoneNoteEdit:string;
  editMilestoneKpiId:string;
  milestoneAssignedEdit:string;
  milestoneRecurringFrequencyEdit:string;
  driverID:string;
  driverName:string;
  depID:string;
  userRole:string;
  newElement:string;
  newTaskDriver:string;
  uID:string;
  newTaskStatus:string;
  newMilestoneMilestone:string;
  newTaskKpi:string;
  newMilestoneDueDate:string;
  newMilestoneEdit:string;
  milestoneRecurringFrequencyNew:string;
  newMilestoneNote:string;
  deleteText:string;
  
  newShareMilestoneUserEmail:string;
  
  editMilestoneShareStatus:string;
  editMilestoneDataAccessId:string;
  editMilestoneShareUser:string;

  user: User[] = []
  userDataAccessList:any = [];
  organizationUserList:any = [];
  newMilestoneAssigned:any = [];

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
  driverList:any;
  kpiList:any;

  charp : Charp[] = [
    { value: "C", viewValue: "Change" },
    { value: "H", viewValue: "Help" },
    { value: "A", viewValue: "Aware" },
    { value: "R", viewValue: "Redirect" },
    { value: "P", viewValue: "Plan" },
    { value: "D", viewValue: "Done" }
  ];

  frequency: RecurringFrequency[] = [
    { value: 'Weekly', viewValue: 'Weekly' },
    { value: 'Monthly', viewValue: 'Monthly' },
    { value: 'Quarterly', viewValue: 'Quarterly' },
    { value: 'Yearly', viewValue: 'Yearly' }
  ];

  shareStatusList:any = [
    {value: 'Granted', viewValue:'Granted'},
    {value: 'Denied', viewValue: 'Denied'}
  ]

  constructor(
    private dataservice: DataServiceService,
    public dataService: DataService, 
    private DataService: TeamLevelAllDataService,
    private modalService: BsModalService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {  
    this.setSubscriptions();  
    this.startupScript();
  }


  ngOnDestroy(){
    this.destroySubscriptions();
  }

  setSubscriptions():void{

    this.paramSubscription = this.route.params.subscribe(params => {
      if (params){
        this.params = params;
      }
    });

    this.orgID = this.dataservice.getOrgID();

    this.driverIdSubscription = this.dataservice.driverIdData.subscribe(data =>{
      this.driverID = data.driverID;
      this.driverName = data.driverName;
      this.newTaskDriver = data.driverID;
    });

    this.depID = this.dataservice.getUserInfoList();

    this.dataservice.getMileStoneAssignUsersKpi(this.driverID, this.depID, null, 'dash');

    this.milestoneSubscription = this.dataservice.mileStoneAssignUsersdataKpi.subscribe(data => {
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

    if(this.userRole == 'admin' || this.userRole == 'CEO' || this.userRole =='Chief Executive Officer'){

      this.dataService.getAllUsers(this.orgID);
      this.userSubscription = this.dataService.usersdata.subscribe((data) => {
        var value: any;
        var key: any;
  
        this.users = data;
        this.userList = data && data.length>0 ? data.sort((a,b)=>a.name.localeCompare(b.name)) : data;

        if (data){
          for ([key,value] of Object.entries(data)){
            this.user[key] = {uID: value.uID, userName: value.name + ' ' + value.lname}
          }
        }
      });  
    } else {
      this.users = null;
    }
    
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
    
    this.driverListSubscription = this.dataservice.driversdata.subscribe(data => {
      if (data){
        this.driverList = data;
      }
    });

    // this.driverDefaultSubscription = this.dataservice.driverDefaultData.subscribe((data:any)=>{
    //   this.newTaskDriver = data.driverID;
    // });

    this.uID = this.dataservice.userUidData;

    this.statusDefaultSubscription = this.dataservice.statusDefaultData.subscribe(data=>{
      this.newTaskStatus = data
    });

    this.kpiListSubscription = this.dataservice.userKpiMilestoneData.subscribe(data => {
      if(data){
        this.kpiList = data;
      }
    });

    this.userDataAccessListSubscription = this.dataservice.getUserDataAccessData.subscribe((data:any)=>{
      this.userDataAccessList = data;
      this.isUserSharingAccess = false;
      for(const i in data){
        if(data[i].status.toLowerCase() =='granted'){
          this.isUserSharingAccess = true;
        }
      }
    });

    this.dataservice.getUserDataAccess(this.uID);

    this.organizationUserListSubscription = this.DataService.userListData.subscribe((data:any)=>{
      this.organizationUserList = data && data.length>0 ? data.sort((a,b)=>a.User.localeCompare(b.User)) : data;
    })

    this.DataService.getUserList(this.orgID);
  }

  startupScript():void {
    // this.dataservice.getUserKpiMilestone(this.uID,this.newTaskDriver);
    this.dataservice.getUserKpiMilestone(this.uID,this.driverID);
  }

  destroySubscriptions():void{
    this.driverIdSubscription ? this.driverIdSubscription.unsubscribe() : null;
    this.paramSubscription ? this.paramSubscription.unsubscribe() : null;
    this.milestoneSubscription ? this.milestoneSubscription.unsubscribe() : null;
    this.driverDataSubscription ? this.driverDataSubscription.unsubscribe() : null;
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
    this.driverListSubscription ? this.driverListSubscription.unsubscribe() : null;
    this.driverDefaultSubscription ? this.driverDefaultSubscription.unsubscribe() : null;
    this.getUserUidSubscription ? this.getUserUidSubscription.unsubscribe() : null;
    this.statusDefaultSubscription ? this.statusDefaultSubscription.unsubscribe() : null;
    this.kpiListSubscription ? this.kpiListSubscription.unsubscribe() : null;
    this.userMilestoneSubscription ? this.userMilestoneSubscription.unsubscribe() : null;
    this.userDeleteMilestoneSubscription ? this.userDeleteMilestoneSubscription.unsubscribe() : null;
    this.postUserDataAccessSubscription ? this.postUserDataAccessSubscription.unsubscribe() : null;
    this.userDataAccessListSubscription ? this.userDataAccessListSubscription.unsubscribe() : null;
    this.putUserDataAccessSubscription ? this.putUserDataAccessSubscription.unsubscribe() : null;
    this.organizationUserListSubscription ? this.organizationUserListSubscription.unsubscribe() : null;
  }

  refreshMilestoneData():void {
    this.dataservice.getMileStoneAssignUsersKpi(this.driverID, this.depID, null, 'dash');
  }  
  
  refreshKpiData(driverID:any):void {
    // this.dataservice.getUserKpiMilestone(this.uID,this.newTaskDriver);
    this.dataservice.getUserKpiMilestone(this.uID,driverID ? driverID : this.driverID);
  }

  getUserData(): void{

    this.dataservice.getAllDeptUsers();

    if (this.userRole != 'admin' && this.userRole != 'CEO' && this.userRole !='Chief Executive Officer') {
      this.dataservice.allDeptUsersData.subscribe(data => {
        this.userList = data;
      });
    }
  }

  updateQuarterList(): void {
    
    this.dataservice.getQuarterList(this.getEditUid());

  }

  milestoneEdit(template: TemplateRef<any>,cls:any,element: any){

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
    this.milestoneAssignedEdit = data['User'] ? data['User']['name'] + ' ' + data['User']['lname'] : null;
    this.milestoneRecurringEdit = data['recurringFrequency'] ? true : false; // data['isRecurring'];
    this.milestoneRecurringFrequencyEdit = data['recurringFrequency'];
    this.milestoneNoteEdit = data['milestoneNote'];
    this.dataservice.getQuarterList(data['User'] ? data['User']['uID']: null);
    this.editMilestoneKpiId = data.kpiID;

    this.showModal(template,cls);
  }

  updateMilestoneData(){

    var milestoneData: any;
    var quarterData: any;
    var uId: string;
    var frequency:object = {};

    uId = this.getEditUid();

    milestoneData = {
      dueDate: this.milestoneDueDateEdit,
      achieveText: this.milestoneMilestoneEdit,
      mileID: this.milestoneMileIdEdit,
      uID: uId,
      charpStatus: this.milestoneStatusEdit,
      recurringFrequency: this.milestoneRecurringFrequencyEdit,
      milestoneNote: this.milestoneNoteEdit
    }

    quarterData = this.getQuarterData(this.milestoneDataEdit,this.milestoneMileIdEdit)
    quarterData.qsID = this.getEditQsid();
    quarterData.uID = uId;

    this.dataservice.updateMilestone(milestoneData);
    this.dataservice.updateMilestoneQuarter(quarterData);

    this.timeoutList();
    
    this.modalRef.hide();

    if(this.milestoneRecurringEdit&&this.milestoneStatusEdit=='D'){
      if(this.milestoneRecurringFrequencyEdit=='Weekly'){
        frequency['a'] = 'days';
        frequency['b'] = 7;
        frequency = {days: 7};
      } else if (this.milestoneRecurringFrequencyEdit=='Monthly'){
        frequency['a'] = 'months';
        frequency['b'] = 1;
        frequency = {months: 1};
      } else if (this.milestoneRecurringFrequencyEdit=='Quarterly'){
        frequency['a'] = 'quarters';
        frequency['b'] = 1;
        frequency = {quarters: 1};
      } else if (this.milestoneRecurringFrequencyEdit=='Yearly'){
        frequency['a']='years';
        frequency['b']=1;
        frequency = {years: 1}
      }
      this.createRecurringMilestone(this.milestoneMilestoneEdit,this.editMilestoneKpiId,DateTime.fromISO(this.milestoneDueDateEdit).plus(frequency).toISODate(),'P',uId,this.uID,this.milestoneRecurringFrequencyEdit);
    }

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
  
  getUid(fullName:string): string {
    
    var uId: string = 'Unknown';
    var arr: any;
    var matchValue: string;
    
    arr = this.userList;

    Object.keys(arr).forEach(function(i){
      if (arr[i]['name'] + ' ' + arr[i]['lname'] == fullName) {
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
      this.dataservice.getDashStatus(this.params.uID);  
      this.dataservice.getUserDataAccess(this.uID);
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

  showModal(template: TemplateRef<any>,cls:any){
    this.newElement = '';

    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: cls })  
    ); 
  }

  setUserIndex(index:number):void {
    this.userIndex = index;
  }

  createNewMilestone():void {

    var body:any = { }

    for (const i in this.newMilestoneAssigned){
      
      body.achieveText = this.newMilestoneMilestone;
      body.kpiID = this.newTaskKpi;
      body.dueDate = this.newMilestoneDueDate;
      body.charpStatus = this.newTaskStatus;
      body.uID = this.newMilestoneAssigned[i],
      body.superReferUserID = this.uID;
      body.recurringFrequency = this.milestoneRecurringFrequencyNew;
      body.milestoneNote = this.newMilestoneNote;

      this.userMilestoneSubscription = this.dataservice.postPortfolioMilestoneData.pipe(take(1)).subscribe((data:any) =>{
        if(data){
          notification.notification(data.status,data.msg,5000)
          if(data.status.toLowerCase() == 'success'){
            this.modalRef.hide();
            this.clearModal();
            this.clearDeleteModal();
          }
        }
      });
      this.dataservice.postQuarterSplitBulk({ uID: body['uID'] });

      this.dataservice.postPortfolioMilestone(body);
    }
    this.timeoutList();
  }
  
  createRecurringMilestone(achieveText:string,kpiID:string,dueDate:string,charpStatus:string,uID:string,superReferUserID:string,recurringFrequency:string):void {
    var body:Object = {
      achieveText: achieveText,
      kpiID: kpiID,
      dueDate: dueDate,
      charpStatus: charpStatus,
      uID: uID,
      superReferUserID: superReferUserID,
      recurringFrequency: recurringFrequency
    }

    this.userMilestoneSubscription = this.dataservice.postPortfolioMilestoneData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          this.modalRef.hide();
          this.clearModal();
          this.clearDeleteModal();
        }
      }
    });

    this.dataservice.postPortfolioMilestone(body);
    this.timeoutList();
  }

  clearModal():void {
    this.newMilestoneMilestone = '';
    this.newTaskKpi = '';
    this.newMilestoneDueDate = '';
    this.newTaskStatus = 'C';
    this.newMilestoneAssigned = '';
    this.milestoneRecurringFrequencyNew = null;
    this.milestoneRecurringNew = null;
    this.newMilestoneNote = null;
    this.newMilestoneEdit = null;
    this.newShareMilestoneUserEmail = null;
    this.editMilestoneShareStatus = null;
    this.editMilestoneShareUser = null;
  }

  clearDeleteModal():void {
    this.deleteText = '';
  }
  
  deleteMilestone(): void{
    if(this.deleteText==='delete'){
      this.userDeleteMilestoneSubscription = this.dataservice.deleteUserMilestoneData.pipe(take(1)).subscribe((data:any) =>{
        if(data){
          notification.notification(data.status,data.msg,5000)
          if(data.status.toLowerCase() == 'success'){
            this.modalRef.hide();
            this.clearModal();
            this.clearDeleteModal();
          }
        }
      });
      this.dataservice.deleteMilestone(this.milestoneMileIdEdit);
      this.timeoutList();
    }
  }

  setMilestoneRecurringEdit():void {
    this.milestoneRecurringEdit = !this.milestoneRecurringEdit;
    if(!this.milestoneRecurringEdit){
      this.milestoneRecurringFrequencyEdit = null;
    }
  }

  setMilestoneRecurringNew():void {
    this.milestoneRecurringNew = !this.milestoneRecurringNew;
    if(!this.milestoneRecurringNew){
      this.milestoneRecurringFrequencyNew = null;
    }
  }

  shareMilestones():void {
    var body:any = {};

    body = {
      grantorUserId:this.uID,
      granteeEmail:this.newShareMilestoneUserEmail,
      accessStatus:'Granted',
      dataElement:'Milestone',
    }
    this.postUserDataAccessSubscription = this.dataservice.postUserDataAccessData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success' || data.status.toLowerCase() == 'info'){
          this.modalRef.hide();
          this.clearModal();
        }
      }
    });
    this.dataservice.postUserDataAccess(body);
    this.timeoutList();
  }

  updateUserShareStatus(uID:any):void {
    Object.keys(this.userDataAccessList).forEach(function(i){
      if (this.userDataAccessList[i].uID==uID){
        this.editMilestoneShareStatus = this.userDataAccessList[i].status;
        this.editMilestoneDataAccessId = this.userDataAccessList[i].userDataAccessId;
      }
    },this);
  }

  updateShareMilestone(): void {
    var body:any = {};

    body = {
      userDataAccessId:this.editMilestoneDataAccessId,
      accessStatus:this.editMilestoneShareStatus,
      dataElement:'Milestone'
    }

    this.putUserDataAccessSubscription = this.dataservice.putUserDataAccessData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success' || data.status.toLowerCase() == 'info'){
          this.modalRef.hide();
          this.clearModal();
        }
      }
    });
    this.dataservice.putUserDataAccess(body);
    this.timeoutList();

  }

  printDashboard():void {
    console.log('printing dashboard');
    let content;

    content = document.getElementById('datatable-buttons');
    this.generatePdf(content);
  }

  generatePdf(content):void {
    html2canvas(content).then(canvas => {
      let imgWidth = 290;
      let imgHeight =  (canvas.height * imgWidth /canvas.width)
      const contentDataUrl = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l','mm','a4');
      var position = 10
      pdf.addImage(contentDataUrl,'PNG',0,position,imgWidth,imgHeight);
      pdf.save('dashboard.pdf');
    })
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

export interface RecurringFrequency {
  value: string;
  viewValue: string;
}