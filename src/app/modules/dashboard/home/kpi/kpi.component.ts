import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DataServiceService } from "src/app/modules/dashboard/services/data-service/data-service.service";
import { SharedDataService } from "src/app/shared/services/data.service";
import { TeamLevelAllDataService } from "src/app/modules/dashboard/home/team-level-all/data.service";
import * as notification from "src/app/shared/libraries/exports.library";
import { DateTime } from "luxon";
import { DataService } from "src/app/modules/account/services/data.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-dashboard-kpi",
  templateUrl: "./kpi.component.html",
  styleUrls: ["./kpi.component.scss"]
})
export class KpiDashboardComponent implements OnInit {
  modalRef: BsModalRef;
  isActive:boolean = false;
  selectedMember:string = "Select Member";
  memberList:any;

  // Data Subscriptions
  milestoneDataSubscription: Subscription;
  driverIsChangedSubscription: Subscription;
  driverIdSubscription: Subscription;
  driverListSubscription: Subscription;
  userKpiSubscription: Subscription;
  getUserUidSubscription: Subscription;
  userDeleteKpiSubscription: Subscription;
  userDataAccessListSubscription: Subscription;
  putUserDataAccessSubscription: Subscription;
  postUserDataAccessSubscription: Subscription;
  organizationUserListSubscription: Subscription;
  kpiHistorySubscription: Subscription[] = [];
  kpiHxSubscription: Subscription;

  // KPI Context
  driverID: string = null;
  driverName: string;
  uID: string;
  depID: string;
  userRole: string;
  orgID: string;
  kpiHistoryData: any;

  // Interface controls
  displayYouData: boolean = false;
  isUserSharingAccess: boolean = false;
  userDataAccessList: any = [];
  organizationUserList: any = [];
  frequency: ReportingFrequency[] = [
    { value: "Weekly", viewValue: "Weekly" },
    { value: "Monthly", viewValue: "Monthly" },
    { value: "Quarterly", viewValue: "Quarterly" },
    { value: "Yearly", viewValue: "Yearly" }
  ];
  shareStatusList: any = [
    { value: "Granted", viewValue: "Granted" },
    { value: "Denied", viewValue: "Denied" }
  ];

  // KPI Data
  kpiMileData: any;
  driverImg: any;
  driverData: any;
  driverList: any;
  bulletHx: any;

  // New KPI Form Data
  newTaskDriver: string;
  newKpiObjective: string;
  newKpiReportTarget: string;
  newKpiReportingFrequency: string;
  newKpiReportingPeriod: string;
  // newKpiReportActual:string;
  newKpiIsCorporate: boolean = false;
  // Deprecated
  newKpiUnit: string;

  // Edit KPI Form Data
  editKpiObjective: string;
  editKpiReportTarget: number;
  editKpiReportActual: number;
  editKpiId: string;
  editKpiHxID: string;
  editKpiReportingFrequency: string;
  editKpiReportingPeriod: string;
  editKpiIsCorporate: boolean = false;
  // Deprecated
  editKpiUnit: string;

  // New KPI Share
  newShareKpiUserEmail: string;

  // Edit KPI Sharing
  editKpiShareStatus: string;
  editKpiDataAccessId: string;
  editKpiShareUser: string;

  deleteText: string;


  // milestone
  userMilestoneSubscription:Subscription;
  kpiListSubscription:Subscription;
  statusDefaultSubscription:Subscription;
  userSubscription:Subscription;
  newElement:string;
  newTaskKpi:string;
  kpiList:any;
  newMilestoneMilestone:string;
  newMilestoneDueDate:string;
  newTaskStatus:string;
  url= environment.imgUrl ? environment.imgUrl: "http://108.163.221.122:2004/";

  newMilestoneAssigned:any = [];


  // edit milesone 
  userDeleteMilestoneSubscription:Subscription;
  milestoneQuarterList:any;
  milestoneDataEdit:any;
  milestoneRecurringEdit:boolean = false;
  milestoneDueDateEdit:string;
  milestoneMilestoneEdit:string;
  milestoneMileIdEdit:string;
  milestoneStatusEdit:string;
  MilestoneQsIdEdit:string;
  milestoneNoteEdit:string;
  editMilestoneKpiId:string;
  milestoneAssignedEdit:string;
  milestoneRecurringFrequencyEdit:string;

  charp : Charp[] = [
    { value: "C", viewValue: "Change" },
    { value: "H", viewValue: "Help" },
    { value: "A", viewValue: "Aware" },
    { value: "R", viewValue: "Redirect" },
    { value: "P", viewValue: "Plan" },
    { value: "D", viewValue: "Done" }
  ];

  userList:any

  users: any;
  user: User[] = []

  milestoneRecurringNew:boolean = false;
  milestoneRecurringFrequencyNew:string;
  newMilestoneNote:string;


  constructor(
    public dataservice: DataServiceService,
    private modalService: BsModalService,
    private dataService: SharedDataService,
    private DataService: TeamLevelAllDataService
  ) {}

  ngOnInit() {
    this.userRole = this.dataService.getRoleInfo();
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  showYouData() {
    this.displayYouData = !this.displayYouData;
  }

  edit(template: TemplateRef<any>, element: any) {
    // Reset form data
    this.clearModal();

    this.setDriverImg();

    // Set form values
    this.editKpiObjective = this.kpiMileData[element]["objective"];
    this.editKpiId = this.kpiMileData[element]["kpiID"];
    this.editKpiIsCorporate = this.kpiMileData[element]["isCorporateKpi"];
    // Deprecated
    this.editKpiUnit = this.kpiMileData[element]["unit"];

    if (
      typeof this.kpiMileData[element]["hxData"] != "undefined" &&
      this.kpiMileData[element]["hxData"] != null &&
      this.kpiMileData[element]["hxData"].length > 0
    ) {
      // Set values when history is present
      // Use latest reporting period
      let latestReport = this.kpiMileData[element]["hxData"][
        this.kpiMileData[element]["hxData"].length - 1
      ];

      this.kpiHistoryData = this.kpiMileData[element]["hxData"];
      this.editKpiReportingFrequency = latestReport.frequency;
      this.editKpiReportingPeriod = DateTime.fromISO(latestReport.reportDate, {
        zone: "utc"
      }).toISODate();
      this.editKpiReportTarget = latestReport.budgetAmount;
      this.editKpiReportActual = latestReport.actualAmount;
      this.editKpiHxID = latestReport.kpiHistoryId;
    } else {
      // Use deprecated KPI values if no history data
      this.editKpiReportTarget = this.kpiMileData[element]["qty"];
      this.editKpiReportActual = this.kpiMileData[element]["achieveQty"];
    }

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "modal-md" })
    );
  }

  updateKpiData() {
    let updateKpi: Object = {
      achieveQty: String(this.editKpiReportActual).replace(/[^\w\s]/gi, ''),
      dependFlag: false,
      driverID: this.driverID,
      kpiID: this.editKpiId,
      objective: this.editKpiObjective,
      qty: String(this.editKpiReportTarget).replace(/[^\w\s]/gi, ''),
      unit: this.editKpiReportingFrequency
        ? this.editKpiReportingFrequency
        : undefined,
      isCorporateKpi: this.editKpiIsCorporate
    };

    this.dataservice.updateUserKpi(updateKpi);

    let updateKpiReport = {
      kpiID: this.editKpiId,
      kpiHistoryId: this.editKpiHxID,
      reportDate: this.editKpiReportingPeriod,
      frequency: this.editKpiReportingFrequency,
      budgetAmount: Number(String(this.editKpiReportTarget).replace(/[^\w\s]/gi, '')),
      actualAmount: Number(String(this.editKpiReportActual).replace(/[^\w\s]/gi, ''))
    };

    if (updateKpiReport.kpiHistoryId) {
      this.dataservice.putKpiHistory(updateKpiReport);
    } else {
      this.dataservice.postKpiHistory(updateKpiReport);
    }

    this.modalRef.hide();
    this.timeoutList();
  }

  timeoutList(): void {
    setTimeout(() => {
      this.dataservice.getKpiDriver(this.driverID);
      this.dataservice.getMileStoneAssignUsersKpi(
        this.driverID,
        this.depID,
        null,
        "dash"
      );
      this.dataservice.getDashStatus(this.uID);
      this.dataservice.getCorporateKpi(this.uID, this.driverID, "Home-Kpi");
      this.dataservice.getUserDataAccess(this.uID);
    }, 1000);
  }

  setSubscriptions(): void {
    this.orgID = this.dataservice.getOrgID();

    this.dataservice.driversdata.subscribe(data => {
      if (data) {
        this.driverData = data;
        this.setDriverImg();
      }
    });

    this.milestoneDataSubscription = this.dataservice.milestonedata.subscribe(
      data => {
        this.isActive = false;
        this.kpiMileData = data;
        console.log(': ===> "call kpi"', "call kpi");
        
        if (this.kpiMileData != null) {
          this.kpiMileData.forEach((element, id) => {});
        }
      }
    );

    this.driverIsChangedSubscription = this.dataservice.driverIsChanged.subscribe(
      data => {
        if (data === true) {
          this.selectedMember = "Select Member";
        }
      }
    );

    this.driverIdSubscription = this.dataservice.driverIdData.subscribe(
      data => {
        this.driverID = data.driverID;
        this.newTaskDriver = data.driverID;
        this.driverName = data.driverName;
      }
    );

    this.driverListSubscription = this.dataservice.driversdata.subscribe(
      data => {
        if (data) {
          this.driverList = data;
        }
      }
    );

    this.uID = this.dataservice.userUidData;

    this.depID = this.dataService.getUserDeptID();

    this.userDataAccessListSubscription = this.dataservice.getUserDataAccessData.subscribe(
      (data: any) => {
        this.userDataAccessList = data;
        this.isUserSharingAccess = false;
        for (const i in data) {
          if (data[i].status.toLowerCase() == "granted") {
            this.isUserSharingAccess = true;
          }
        }
      }
    );

    this.dataservice.getUserDataAccess(this.uID);

    this.organizationUserListSubscription = this.DataService.userListData.subscribe(
      data => {
        this.organizationUserList = data;
      }
    );

    this.DataService.getUserList(this.orgID);

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

    this.organizationUserListSubscription = this.DataService.dataAccessUserListdata.subscribe(data=>{
      this.memberList = [];
      this.memberList = data;
    });

    this.statusDefaultSubscription = this.dataservice.statusDefaultData.subscribe(data=>{
      this.newTaskStatus = data
    });

    this.kpiListSubscription = this.dataservice.userKpiMilestoneData.subscribe(data => {
      if(data){
        this.kpiList = data;
      }
    });

    this.dataservice.quarterListdata.subscribe(data => {
      this.milestoneQuarterList = data;
    });
  }

  destroySubscriptions(): void {
    this.milestoneDataSubscription
      ? this.milestoneDataSubscription.unsubscribe()
      : null;
    this.driverIdSubscription ? this.driverIdSubscription.unsubscribe() : null;
    this.driverListSubscription
      ? this.driverListSubscription.unsubscribe()
      : null;
    this.kpiHistorySubscription
      ? this.kpiHistorySubscription.forEach(sub => {
          sub.unsubscribe();
        })
      : null;

    this.statusDefaultSubscription ? this.statusDefaultSubscription.unsubscribe() : null;
    this.userMilestoneSubscription ? this.userMilestoneSubscription.unsubscribe() : null;
    this.userDeleteMilestoneSubscription ? this.userDeleteMilestoneSubscription.unsubscribe() : null;
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
  }

  setDriverImg(): void {
    Object.keys(this.driverData).forEach(function(i) {
      if (this.driverData[i].driverID == this.driverID) {
        this.driverImg = this.driverData[i].driverImage;
      }
    }, this);
  }

  showModal(template: TemplateRef<any>, cls: any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: cls })
    );
  }

  createNewKpi(): void {
    let newKpi: Object = {
      objective: this.newKpiObjective,
      qty: this.newKpiReportTarget.replace(/[^\w\s]/gi, ''),
      unit: this.newKpiReportingFrequency,
      driverID: this.newTaskDriver,
      uID: this.uID,
      isCorporateKpi: this.newKpiIsCorporate
    };

    this.userKpiSubscription = this.dataservice.postUserKpiData
      .pipe(take(1))
      .subscribe((data: any) => {
        if (data) {
          notification.notification(data.status, data.msg, 5000);
          if (data.status.toLowerCase() == "success") {
            // Create first report period after KPI is successfully created
            let newKpiReport: Object = {
              kpiID: data.payload.kpiID,
              reportDate: this.newKpiReportingPeriod,
              frequency: this.newKpiReportingFrequency,
              budgetAmount: this.newKpiReportTarget.replace(/[^\w\s]/gi, ''),
              actualAmount: 0
            };
            // Add first report
            this.dataservice.postKpiHistory(newKpiReport);

            this.modalRef.hide();
            this.clearModal();
            this.clearDeleteModal();
          }
        }
      });

    this.dataservice.postUserKpi(newKpi);

    this.timeoutList();
  }

  clearModal(): void {
    this.newKpiObjective = "";
    this.newKpiReportTarget = "";
    this.newKpiUnit = "";
    this.newKpiReportTarget = "";
    this.newKpiReportingFrequency = "";
    this.newKpiReportingPeriod = "";
    this.editKpiReportTarget = 0;
    this.editKpiReportActual = 0;
    this.editKpiId = "";
    this.editKpiHxID = undefined;
    this.editKpiReportingFrequency = "";
    this.editKpiReportingPeriod = "";
    this.newShareKpiUserEmail = null;
    this.editKpiShareStatus = null;
    this.editKpiShareUser = null;
    this.kpiHistoryData = null;

    
    this.newMilestoneMilestone = '';
    this.newTaskKpi = '';
    this.newMilestoneDueDate = '';
    this.newTaskStatus = 'C';
    this.newMilestoneAssigned = '';
    this.milestoneRecurringFrequencyNew = null;
    this.milestoneRecurringNew = null;
    this.newMilestoneNote = null;
  }

  clearDeleteModal(): void {
    this.deleteText = "";
  }

  deleteKpi(): void {
    if (this.deleteText === "delete") {
      this.userDeleteKpiSubscription = this.dataservice.deleteUserKpiData
        .pipe(take(1))
        .subscribe((data: any) => {
          if (data) {
            notification.notification(data.status, data.msg, 5000);
            if (data.status.toLowerCase() == "success") {
              this.modalRef.hide();
              this.clearModal();
              this.clearDeleteModal();
            }
          }
        });
      this.dataservice.deleteKpi(this.editKpiId);
      this.timeoutList();
    }
  }

  setKpiCorporateNew(): void {
    this.newKpiIsCorporate = !this.newKpiIsCorporate;
  }

  setKpiCorporateEdit(): void {
    this.editKpiIsCorporate = !this.editKpiIsCorporate;
  }

  shareKpi(): void {
    var body: any = {};

    body = {
      grantorUserId: this.uID,
      granteeEmail: this.newShareKpiUserEmail,
      accessStatus: "Granted",
      dataElement: "KPI"
    };
    this.postUserDataAccessSubscription = this.dataservice.postUserDataAccessData
      .pipe(take(1))
      .subscribe((data: any) => {
        if (data) {
          notification.notification(data.status, data.msg, 5000);
          if (
            data.status.toLowerCase() == "success" ||
            data.status.toLowerCase() == "info"
          ) {
            this.modalRef.hide();
            this.clearModal();
          }
        }
      });
    this.dataservice.postUserDataAccess(body);
    this.timeoutList();
  }

  updateUserShareStatus(uID: any): void {
    Object.keys(this.userDataAccessList).forEach(function(i) {
      if (this.userDataAccessList[i].uID == uID) {
        this.editKpiShareStatus = this.userDataAccessList[i].status;
        this.editKpiDataAccessId = this.userDataAccessList[i].userDataAccessId;
      }
    }, this);
  }

  updateShareKpi(): void {
    var body: any = {};

    body = {
      userDataAccessId: this.editKpiDataAccessId,
      accessStatus: this.editKpiShareStatus,
      dataElement: "KPI"
    };

    this.putUserDataAccessSubscription = this.dataservice.putUserDataAccessData
      .pipe(take(1))
      .subscribe((data: any) => {
        if (data) {
          notification.notification(data.status, data.msg, 5000);
          if (
            data.status.toLowerCase() == "success" ||
            data.status.toLowerCase() == "info"
          ) {
            this.modalRef.hide();
            this.clearModal();
          }
        }
      });
    this.dataservice.putUserDataAccess(body);
    this.timeoutList();
  }

  pullKpiHistory(kpiID: string): void {
    this.dataservice.getKpiHistory(kpiID);
  }

  addReportingPeriod(): void {
    // Reuse latest report values
    let latestReport = this.kpiHistoryData[this.kpiHistoryData.length - 1];
    // Enum for date math
    const interval = {
      Weekly: { weeks: 1 },
      Monthly: { months: 1 },
      Quarterly: { quarters: 1 },
      Yearly: { years: 1 }
    };

    // Set form values
    this.editKpiHxID = undefined;

    this.editKpiReportingPeriod = DateTime.fromISO(latestReport.reportDate)
      .plus(interval[latestReport.frequency])
      .toISODate();
    this.editKpiReportingFrequency = latestReport.frequency;
    this.editKpiReportTarget = latestReport.budgetAmount;
    this.editKpiReportActual = 0;
  }

  expand(index) {
    if(this.kpiMileData[index].isActive) {
      this.isActive = false;
    }
    this.kpiMileData[index].isActive = !this.kpiMileData[index].isActive;
  }

  expandAll() {
    console.log(': ===> 122', 122);
    if(this.isActive) {
      this.isActive = false;
      this.kpiMileData.map(item => item.isActive = false );
    } else {
      this.isActive = true;
      this.kpiMileData.map(item => item.isActive = true );
    }
  }

  SetInitialValue(kpiID) {
    this.newTaskKpi = kpiID;
  }
  createNewMilestone():void {

    var body:any = { }
    console.log(': ===> this.newMilestoneAssigned', this.newMilestoneAssigned);
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

  setMilestoneRecurringNew():void {
    this.milestoneRecurringNew = !this.milestoneRecurringNew;
    if(!this.milestoneRecurringNew){
      this.milestoneRecurringFrequencyNew = null;
    }
  }

  refreshKpiData(driverID:any):void {
    // this.dataservice.getUserKpiMilestone(this.uID,this.newTaskDriver);
    this.dataservice.getUserKpiMilestone(this.uID,driverID ? driverID : this.driverID);
  }

  onSelecteMember(userDetail) {
    console.log(': ===> userDetail.User', userDetail);
    this.selectedMember = userDetail.User;
    this.dataservice.getKpiDriverByMember(this.driverID, userDetail.uID)
  }

  milestoneEdit(template: TemplateRef<any>,cls:any,elementKpi, element: any){

    this.setDriverImg();
    var data = this.kpiMileData[elementKpi].Milestones[element];

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

  setMilestoneRecurringEdit():void {
    this.milestoneRecurringEdit = !this.milestoneRecurringEdit;
    if(!this.milestoneRecurringEdit){
      this.milestoneRecurringFrequencyEdit = null;
    }
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

  getUserImg(user){
    if(user) {
      if(user['info'] && user['info']['photo']) {
      return this.url + user['info']['photo'];
      } else {
        return "assets/img.jpg";
      }
    } else {
      return "assets/img.jpg";
    }
  }

}

export interface ReportingFrequency {
  value: string;
  viewValue: string;
}

export interface Charp {
  value: string;
  viewValue: string;
}

export interface User {
  uID: string;
  userName: string;
}