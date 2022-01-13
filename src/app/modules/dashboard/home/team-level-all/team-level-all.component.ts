import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { TeamLevelAllDataService } from 'src/app/modules/dashboard/home/team-level-all/data.service';
import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';

import { SharedDataService } from 'src/app/shared/services/data.service'
import * as notification from 'src/app/shared/libraries/exports.library';

import { DateTime } from 'luxon';

@Component({
  selector: 'app-team-level-all',
  templateUrl: './team-level-all.component.html',
  styleUrls: ['./team-level-all.component.scss']
})
export class TeamLevelAllComponent implements OnInit {

  modalRef: BsModalRef;

  @Input() uID:string;
  @Input() driverID:string;

  constructor(private dataService: TeamLevelAllDataService, private DataService: SharedDataService, private dataservice:DataServiceService, private modalService: BsModalService,) { }

  userMilestoneAllSubscription:Subscription;
  organizationUserListSubscription:Subscription;
  driverSubscription:Subscription;
  userKpiAllSubscription:Subscription;
  driverDataSubscription:Subscription;
  userMilestoneSubscription:Subscription;
  milestoneQuarterListSubscription:Subscription;
  displayDataSubscription:Subscription;
  userDeleteMilestoneSubscription:Subscription;

  orgID:string = JSON.parse(this.DataService.getToken()).orgID;
  userRole:string = this.dataservice.getRole().toLowerCase();
  driverImg: any;

  displayData:boolean = false;
  activeUser:string;
  activeUserUid:string;
  deleteText:string;
  depID:string = this.dataservice.getUserInfoList();

  editMilestoneIsRecurring:boolean
  editMilestoneAchieveText:string;
  editMilestoneDueDate:string;
  editMilestoneStatus:string;
  editMilestoneAssigned:string;
  editMilestoneRecurringFrequency:string;
  editMilestoneNote:string;
  editMilestoneMileId:string;
  editMilestoneKpiId:string;
  editMilestoneAssignedUid:string;
  editMilestoneQsId:string;
  editMilestoneQkaId: string;

  milestoneColumns:any = ['ID','Milestone','Due Date','KPI','Status','User'];
  // milestoneColumns:any = ['Milestone','Due Date','KPI','Status','User'];
  // milestoneIdColumn:any = ['ID'];
  kpiColumns:any = ['ID','KPI','Target','Unit','Actual'];
  userList:any = null;
  milestoneData:any = null;
  kpiData:any = null;
  driverData:any;
  milestoneQuarterList:any;

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

  ngOnInit() {
    this.setSubscriptions();
    this.startupScripts();
  }

  ngOnDestroy() {
    this.destroySubscriptions();
  }

  ngAfterViewInit(): void {
  }

  startupScripts():void {
  }

  setSubscriptions(): void {
    this.userMilestoneAllSubscription = this.dataService.userMilestonesAllData.subscribe((data:any)=>{
      this.milestoneData = data && data.length>0 ? this.isNotDone(data).sort((a,b)=>a["Due Date"].localeCompare(b["Due Date"])) : this.isNotDone(data);
    });

    this.userKpiAllSubscription = this.dataService.userKpiData.subscribe(data => {
      this.kpiData = data;
      console.log(': ===> this.kpiData', this.kpiData);
    });

    this.organizationUserListSubscription = this.dataService.dataAccessUserListdata.subscribe(data=>{
      this.userList = data;
      console.log("this.userList",this.userList);
      // this.userList = data && data.length>0 ? data.sort((a,b)=>a.name.localeCompare(b.name)) : data;
    });
    
    this.dataService.getUserList(this.orgID);
    this.dataService.getUserKpis(this.uID,this.driverID);
    
    this.driverDataSubscription = this.dataservice.driversdata.subscribe(data => {
        this.driverData = data;
        this.setDriverImg();
    });

    this.milestoneQuarterListSubscription = this.dataservice.quarterListdata.subscribe(data => {
      this.milestoneQuarterList = data;
    });

    this.displayDataSubscription = this.dataService.displayUserAccessUserData.subscribe((data:boolean)=>{
      this.displayData = data;
    })
  }

  afterLoadSubscriptions():void {
  }

  destroySubscriptions(): void{
    this.userMilestoneAllSubscription ? this.userMilestoneAllSubscription.unsubscribe() : null;
    this.organizationUserListSubscription ? this.organizationUserListSubscription.unsubscribe() : null;
    this.driverDataSubscription ? this.driverDataSubscription.unsubscribe() : null;
    this.milestoneQuarterListSubscription ? this.milestoneQuarterListSubscription.unsubscribe() : null;
    this.displayDataSubscription ? this.displayDataSubscription.unsubscribe() : null;
  }

  refreshUserDetail(userData:any): void{
    this.activeUser = userData.User;
    this.activeUserUid = userData.uID;
    this.dataService.getUserMilestonesAll(userData.uID,this.driverID);
    this.dataService.getUserKpis(userData.uID,this.driverID);
    this.dataService.showUserDataAccessData(true);
  }

  isNotDone(array){

    var arr:any = [];

    Object.keys(array).forEach(function(i){
      if (array[i].Status!="D"){
        arr.push(array[i]);
      }
    });

    return arr;
  }

  isDone(array){

    var arr:any = [];

    Object.keys(array).forEach(function(i){
      if (array[i].Status=="D"){
        arr.push(array[i]);
      }
    });

    return arr;
  }

  editMilestone(template: TemplateRef<any>,cls:any,element: any){

    this.showModal(template,cls);

    this.editMilestoneAchieveText = element.Milestone;
    this.editMilestoneMileId = element.mileID;
    this.editMilestoneDueDate = element['Due Date'];
    this.editMilestoneStatus = element.Status;
    this.editMilestoneAssigned = element.User;
    this.editMilestoneAssignedUid = element.uID
    this.editMilestoneIsRecurring = element.recurringFrequency ? true : false;
    this.editMilestoneRecurringFrequency = element.recurringFrequency;
    this.editMilestoneNote = element.note;
    this.dataservice.getQuarterList(element.uID);
    this.editMilestoneKpiId = element.kpiID;
    this.editMilestoneQsId = element.qsID;
    this.editMilestoneQkaId = element.qkaID;
  }

  showModal(template: TemplateRef<any>,cls:any){

    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: cls })  
    ); 
  }

  clearDeleteModal():void {
    this.deleteText = '';
  }

  clearModal():void {
  }
  
  setDriverImg(): void{
    Object.keys(this.driverData).forEach(function(i){
      if(this.driverData[i].driverID == this.driverID){
        this.driverImg = this.driverData[i].driverImage;
      }
    },this)
  }

  updateQuarterList(): void {
    
    this.dataservice.getQuarterList(this.editMilestoneAssignedUid);

  }
  
  setMilestoneRecurringEdit():void {
    this.editMilestoneIsRecurring = !this.editMilestoneIsRecurring;
    if(!this.editMilestoneIsRecurring){
      this.editMilestoneRecurringFrequency = null;
    }
  }

  updateMilestone():void {

    var milestoneData: any;
    var quarterData: any;
    var uId: string;
    var frequency:object = {};

    uId = this.editMilestoneAssignedUid;

    milestoneData = {
      dueDate: this.editMilestoneDueDate,
      achieveText: this.editMilestoneAchieveText,
      mileID: this.editMilestoneMileId,
      uID: uId,
      charpStatus: this.editMilestoneStatus,
      recurringFrequency: this.editMilestoneRecurringFrequency,
      milestoneNote: this.editMilestoneNote
    }


    quarterData = { qkaID: this.editMilestoneQkaId, qsID: this.editMilestoneQsId, uID: uId };
    
    this.dataservice.updateMilestone(milestoneData);
    this.dataservice.updateMilestoneQuarter(quarterData);

    this.timeoutList();
    
    this.modalRef.hide();

    if(this.editMilestoneIsRecurring&&this.editMilestoneStatus=='D'){
      if(this.editMilestoneRecurringFrequency=='Weekly'){
        frequency['a'] = 'days';
        frequency['b'] = 7;
        frequency = {days: 7};
      } else if (this.editMilestoneRecurringFrequency=='Monthly'){
        frequency['a'] = 'months';
        frequency['b'] = 1;
        frequency = {months: 1};
      } else if (this.editMilestoneRecurringFrequency=='Quarterly'){
        frequency['a'] = 'quarters';
        frequency['b'] = 1;
        frequency = {quarters: 1};
      } else if (this.editMilestoneRecurringFrequency=='Yearly'){
        frequency['a']='years';
        frequency['b']=1;
        frequency = {years: 1}
      }
      this.createRecurringMilestone(this.editMilestoneAchieveText,this.editMilestoneKpiId,DateTime.fromISO(this.editMilestoneDueDate).plus(frequency).toISODate(),'P',uId,this.uID,this.editMilestoneRecurringFrequency);
    }

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

  timeoutList():void {
    setTimeout(() => {
      this.dataservice.getMileStoneAssignUsersKpi(this.driverID, this.depID, null, 'dash');
      this.dataservice.getDashStatus(this.uID);  
      this.dataservice.getUserDataAccess(this.uID);
      this.dataService.getUserMilestonesAll(this.activeUserUid,this.driverID);
    }, 1000);
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

  getEditQsid(): string {
    
    var qsId: string = 'Unknown';
    var arr: any;
    var matchValue: string;
    
    arr = this.milestoneQuarterList;
    matchValue = this.editMilestoneDueDate;

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

  deleteMilestone(): void{
  //   if(this.deleteText==='delete'){
  //     this.userDeleteMilestoneSubscription = this.dataservice.deleteUserMilestoneData.pipe(take(1)).subscribe((data:any) =>{
  //       if(data){
  //         notification.notification(data.status,data.msg,5000)
  //         if(data.status.toLowerCase() == 'success'){
  //           this.modalRef.hide();
  //           this.clearModal();
  //           this.clearDeleteModal();
  //         }
  //       }
  //     });
  //     this.dataservice.deleteMilestone(this.milestoneMileIdEdit);
  //     this.timeoutList();
  //   }
  }
}

export interface Charp {
  value: string;
  viewValue: string;
}

export interface RecurringFrequency {
  value: string;
  viewValue: string;
}
