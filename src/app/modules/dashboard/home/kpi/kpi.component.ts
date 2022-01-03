import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DataServiceService } from "src/app/modules/dashboard/services/data-service/data-service.service";
import { SharedDataService } from "src/app/shared/services/data.service";
import { TeamLevelAllDataService } from "src/app/modules/dashboard/home/team-level-all/data.service";
import * as notification from "src/app/shared/libraries/exports.library";
import { DateTime } from "luxon";

@Component({
  selector: "app-dashboard-kpi",
  templateUrl: "./kpi.component.html",
  styleUrls: ["./kpi.component.scss"]
})
export class KpiDashboardComponent implements OnInit {
  modalRef: BsModalRef;
  isActive:boolean = false;

  // Data Subscriptions
  milestoneDataSubscription: Subscription;
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
        if (this.kpiMileData != null) {
          this.kpiMileData.forEach((element, id) => {});
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

}

export interface ReportingFrequency {
  value: string;
  viewValue: string;
}
