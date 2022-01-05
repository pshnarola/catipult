import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import {
  Subject,
  BehaviorSubject,
  throwError,
  Observable,
  Subscription
} from "rxjs";
import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { SharedDataService } from "src/app/shared/services/data.service";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
export interface Question {
  queID?: string;
  question?: string;
  Options?: any;
  QuestionType?: any;
  answer?: boolean;
  desc?: string;
}
export class QBank implements Question {
  constructor(
    public queID?: string,
    public question?: string,
    public Options?: any,
    public QuestionType?: any,
    public answer?: boolean,
    public desc?: string
  ) {}
}
@Injectable()
export class DataServiceService {
  getPortfolioUserAllDeptUsersSubscription: Subscription;
  getUserPortfolioDataSubscription: Subscription;
  putUserAssignmentSubscription: Subscription;
  removePortfolioUserSubscription: Subscription;
  userAssignmentSubscription: Subscription;
  getActiveStateSubscription: Subscription;
  updateQuarterStatusSubscription: Subscription;
  updateKpiCharpStatusSubscription: Subscription;
  updateMileCharpStatusSubscription: Subscription;
  assignUsersSubscription: Subscription;
  assignKpiQuarterSubscription: Subscription;
  assignMileQuarterSubscription: Subscription;
  updateMilestoneQuarterSubscription: Subscription;
  addActiveStateSubscription: Subscription;
  addUserAnswerSubscription: Subscription;
  addUserRfpqAnswerSubscription: Subscription;
  deleteMilestoneSubscription: Subscription;
  deleteKpiSubscription: Subscription;
  addUserKpiSubscription: Subscription;
  addUserMilestonesSubscription: Subscription;
  addOutcomeStatementSubscription: Subscription;
  updateUserAnswerSubscription: Subscription;
  removeUserAnswerSubscription: Subscription;
  getSingleSubscription: Subscription;
  getPortfolioUserKpiDataSubscription: Subscription;
  getPortfolioUserKpiListDataSubscription: Subscription;
  getPortfolioUserMilestoneDataSubscription: Subscription;
  requestCoachSubscription: Subscription;
  postUserInviteSubscription: Subscription;
  getUserInviteSubscription: Subscription;
  updateUserInviteSubscription: Subscription;
  getUserAcitivitySubscription: Subscription;
  postUserAssignmentSubscription: Subscription;
  postUserKpiSubscription: Subscription;
  getUserKpiDriverAllSubscription: Subscription;
  getUserListMinusOneSubscription: Subscription;
  getUserListPlusOneSubscription: Subscription;
  getUserListPlusTwoSubscription: Subscription;
  submitFeatureRequestSubscription: Subscription;
  postQuarterSplitBulkSubscription: Subscription;
  postUserDataAccessSubscription: Subscription;
  getUserDataAccessSubscription: Subscription;
  putUserDataAccessSubscription: Subscription;
  getKpiHistorySubscription: Subscription;
  postKpiHistorySubscription: Subscription;
  putKpiHistorySubscription: Subscription;

  qBank: QBank[] = [];
  kpiMilestones: any = null;
  deptUsers: any = null;
  allDeptUsers: any = null;
  user: any = null;
  quarterList: any = null;
  mileStoneAll: any = null;
  milestoneAssignUsers: any = null;
  milestoneAssignUsers1: any = null;
  kpiQuarterList: any = null;
  statement: any = null;
  drivers: any = null;
  kpiListAll: any = null;
  kpiListAll1: any = null;
  kpiListAllM: any = null;
  rfpOptions: any = null;
  routeData: any = null;
  uAns: any = null;
  submitUser: any = null;
  notifications: any = null;
  dashStatus: any = null;
  kpislist: any = null;
  milestoneAssignUsersl2: any = null;
  milestoneAssignUsersl3: any = null;
  kpiListAllC: any = null;
  kpiListAllC1: any = null;
  kpiListAllC2: any = null;
  userAns: any = null;
  milestoneManagerUsers: any = null;
  milestoneAssignUsersKpi: any = null;
  userKpiMilestone: any = null;
  driverDetail: object = {
    driverID: "f27f4b24-33b4-4b5e-a41c-16e0537d029a",
    driverName: "You"
  };
  isPortfolioAccount: boolean = true;
  showPortfolioAccount: boolean = false;
  portfolioUserDepId: string = "";
  portfolioUserLevel: string = "";
  portfolioUser: string = "";
  userPlusOneUser: string = "";
  portfolioUserOrgId: string = "";
  portfolioData: any = "";
  portfolioViewClass: boolean = false;
  isCoach: boolean = false;
  isCoached: boolean = false;
  driverDefault: object = {
    driverID: "f27f4b24-33b4-4b5e-a41c-16e0537d029a",
    driverImage:
      "https://res.cloudinary.com/akon-infotech/image/upload/v1581160341/catipult/driveractive/driver1_mkwjet.png",
    driverName: "You"
  };
  statusDefault: string = "C";

  // level3Display:boolean = false;

  url = environment.imgUrl
    ? environment.imgUrl
    : "http://108.163.221.122:2004/";

  private statementSource = new BehaviorSubject<any>(this.statement);
  statementdata = this.statementSource.asObservable();

  private userAnsdataSource = new BehaviorSubject<any>(this.userAns);
  userAnsdata = this.userAnsdataSource.asObservable();

  private dashStatusSource = new BehaviorSubject<any>(this.dashStatus);
  dashStatusdata = this.dashStatusSource.asObservable();

  private dashStatusSummarySource = new Subject();
  dashStatusSummaryData = this.dashStatusSummarySource.asObservable();

  private userMilestoneSummaryDataSource = new Subject();
  userMilestoneSummaryData = this.userMilestoneSummaryDataSource.asObservable();

  private l2UserMilestoneSummaryDataSource = new Subject();
  l2UserMilestoneSummaryData = this.l2UserMilestoneSummaryDataSource.asObservable();

  private kpislistdataSource = new BehaviorSubject<any>(this.kpislist);
  kpislistdata = this.kpislistdataSource.asObservable();

  private usersource = new BehaviorSubject<any>(this.user);
  userdata = this.usersource.asObservable();

  private userSubmitsource = new BehaviorSubject<any>(this.submitUser);
  userSubmitdata = this.userSubmitsource.asObservable();

  private kpiQuarterSource = new BehaviorSubject<any>(this.kpiQuarterList);
  kpiQuarterdata = this.kpiQuarterSource.asObservable();

  private notifySource = new Subject();
  notifydata: any = this.notifySource.asObservable();

  public mileStoneAssignUsersSource = new BehaviorSubject<any>(
    this.milestoneAssignUsers
  );
  mileStoneAssignUsersdata = this.mileStoneAssignUsersSource.asObservable();

  public mileStoneAssignUsersSourceKpi = new BehaviorSubject<any>(
    this.milestoneAssignUsersKpi
  );
  mileStoneAssignUsersdataKpi = this.mileStoneAssignUsersSourceKpi.asObservable();

  public mileStoneManagerUsersSource = new BehaviorSubject<any>(
    this.milestoneManagerUsers
  );
  mileStoneManagerUsersdata = this.mileStoneManagerUsersSource.asObservable();

  public mileStoneAssignUsersSource1 = new BehaviorSubject<any>(
    this.milestoneAssignUsers1
  );
  mileStoneAssignUsersdata1 = this.mileStoneAssignUsersSource1.asObservable();

  public mileStoneAssignUsersSourcel2 = new BehaviorSubject<any>(
    this.milestoneAssignUsersl2
  );
  mileStoneAssignUsersdatal2 = this.mileStoneAssignUsersSourcel2.asObservable();

  public mileStoneAssignUsersSourcel3 = new BehaviorSubject<any>(
    this.milestoneAssignUsersl3
  );
  mileStoneAssignUsersdatal3 = this.mileStoneAssignUsersSourcel3.asObservable();

  private qBankdataSource = new BehaviorSubject<any>(this.qBank);
  qBankdata = this.qBankdataSource.asObservable();

  private quarterListdataSource = new BehaviorSubject<any>(this.quarterList);
  quarterListdata = this.quarterListdataSource.asObservable();

  public get currentQuarterListData(): any {
    return this.quarterListdataSource.value;
  }

  private quarterListDataSource = new Subject();
  quarterListData: any = this.quarterListDataSource.asObservable();

  public kpiListdataSource = new BehaviorSubject<any>(this.kpiListAll);
  kpiListdata = this.kpiListdataSource.asObservable();

  public kpiListdataSourceM = new BehaviorSubject<any>(this.kpiListAllM);
  kpiListdataM = this.kpiListdataSourceM.asObservable();

  public kpiListdataSourceC = new BehaviorSubject<any>(this.kpiListAllC);
  kpiListdataC = this.kpiListdataSourceC.asObservable();

  public kpiListdataSourceC1 = new BehaviorSubject<any>(this.kpiListAllC1);
  kpiListdataC1 = this.kpiListdataSourceC1.asObservable();

  public kpiListdataSourceC2 = new BehaviorSubject<any>(this.kpiListAllC2);
  kpiListdataC2 = this.kpiListdataSourceC2.asObservable();

  public kpiListdataSource1 = new BehaviorSubject<any>(this.kpiListAll1);
  kpiListdata1 = this.kpiListdataSource1.asObservable();

  private dUsersdataSource = new BehaviorSubject<any>(this.deptUsers);
  detpUsersdata = this.dUsersdataSource.asObservable();

  private allDeptUsersDataSource = new BehaviorSubject<any>(this.allDeptUsers);
  allDeptUsersData = this.allDeptUsersDataSource.asObservable();

  private portfolioAllDeptUsersDataSource = new Subject();
  portfolioAllDeptUsersData = this.portfolioAllDeptUsersDataSource.asObservable();

  private mileDataSource = new BehaviorSubject<any>(this.mileStoneAll);
  mileAlldata = this.mileDataSource.asObservable();

  private mileStonedataSource = new BehaviorSubject<any>(this.kpiMilestones);
  milestonedata = this.mileStonedataSource.asObservable();

  public get currentMilestoneData(): any {
    return this.mileStonedataSource.value;
  }

  private routedataSource = new BehaviorSubject<any>(this.routeData);
  routeUrldata = this.routedataSource.asObservable();

  private rfpOptionsdataSource = new BehaviorSubject<any>(this.rfpOptions);
  rfpOptionsdata = this.rfpOptionsdataSource.asObservable();

  private driversdataSource = new BehaviorSubject<any>(this.drivers);
  driversdata = this.driversdataSource.asObservable();

  private driversDataSource = new Subject();
  driversData = this.driversDataSource.asObservable();

  private userKpiMilestoneDataSource = new BehaviorSubject<any>(
    this.userKpiMilestone
  );
  userKpiMilestoneData = this.userKpiMilestoneDataSource.asObservable();

  private userMilestoneDataSource = new Subject();
  userMilestoneData: any = this.userMilestoneDataSource.asObservable();

  private driverIdDataSource = new BehaviorSubject<any>(this.driverDetail);
  driverIdData: any = this.driverIdDataSource.asObservable();

  private level3DisplayDataSource = new BehaviorSubject<boolean>(false);
  level3DisplayData: any = this.level3DisplayDataSource.asObservable();

  private outcomeStatementNotificationDataSource = new Subject();
  outcomeStatementData: any = this.outcomeStatementNotificationDataSource.asObservable();

  // private portfolioAccountDataSource = new Subject();
  // portfolioAccountData:any = this.portfolioAccountDataSource.asObservable();

  private showPortfolioViewDataSource = new Subject();
  showPortfolioViewData: any = this.showPortfolioViewDataSource.asObservable();

  // private porfolioDataSource = new Subject();
  // portfolioData = this.portfolioAccountDataSource.asObservable();

  private userPortfolioDataSource = new BehaviorSubject<any>(
    this.portfolioData
  );
  userPortfolioData = this.userPortfolioDataSource.asObservable();

  private userPortfolioUserDataSource = new Subject();
  userPortfolioUserData = this.userPortfolioUserDataSource.asObservable();

  private portfolioUserKpiDataSource = new Subject();
  portfolioUserKpiData = this.portfolioUserKpiDataSource.asObservable();

  private portfolioUserKpiListDataSource = new Subject();
  portfolioUserKpiListData = this.portfolioUserKpiListDataSource.asObservable();

  private portfolioUserMilestoneDataSource = new Subject();
  portfolioUserMilestoneData = this.portfolioUserMilestoneDataSource.asObservable();

  private portfolioUserRoleDataSource = new Subject();
  portfolioUserRoleData = this.portfolioUserRoleDataSource.asObservable();

  private portfolioUserDepartmentDataSource = new BehaviorSubject<string>(
    this.portfolioUserDepId
  );
  portfolioUserDepartmentData = this.portfolioUserDepartmentDataSource.asObservable();

  private portfolioUserLevelDataSource = new BehaviorSubject<string>(
    this.portfolioUserLevel
  );
  portfolioUserLevelData = this.portfolioUserLevelDataSource.asObservable();

  private portfolioUserDataSource = new BehaviorSubject<string>(
    this.portfolioUser
  );
  portfolioUserData = this.portfolioUserDataSource.asObservable();

  private portfolioUserOrganizationDataSource = new BehaviorSubject<string>(
    this.portfolioUserOrgId
  );
  portfolioUserOrganizationData = this.portfolioUserOrganizationDataSource.asObservable();

  private portfolioViewClassDataSource = new BehaviorSubject<boolean>(
    this.portfolioViewClass
  );
  portfolioViewClassData = this.portfolioViewClassDataSource.asObservable();

  private isCoachDataSource = new BehaviorSubject<boolean>(this.isCoach);
  isCoachData = this.isCoachDataSource.asObservable();

  private requestCoachDataSource = new Subject();
  requestCoachData = this.requestCoachDataSource.asObservable();

  private inviteUserDataSource = new Subject();
  inviteUserData = this.inviteUserDataSource.asObservable();

  private userInviteDataSource = new Subject();
  userInviteData = this.userInviteDataSource.asObservable();

  private updateUserInviteDataSource = new Subject();
  updateUserInviteData = this.updateUserInviteDataSource.asObservable();

  private userActivityDataSource = new Subject();
  userActivityData = this.userActivityDataSource.asObservable();

  private isCoachedDataSource = new BehaviorSubject<boolean>(this.isCoached);
  isCoachedData = this.isCoachedDataSource.asObservable();

  private coachInfoDataSource = new Subject();
  coachInfoData = this.coachInfoDataSource.asObservable();

  private driverDefaultDataSource = new BehaviorSubject<object>(
    this.driverDefault
  );
  driverDefaultData = this.driverDefaultDataSource.asObservable();

  private postUserAssignmentDataSource = new Subject();
  postUserAssignmentData = this.postUserAssignmentDataSource.asObservable();

  private postUserKpiDataSource = new Subject();
  postUserKpiData = this.postUserKpiDataSource.asObservable();

  private getUserAssignmentDataSource = new BehaviorSubject<any>(null);
  getUserAssignmentData = this.getUserAssignmentDataSource.asObservable();

  private postPortfolioMilestoneDataSource = new Subject();
  postPortfolioMilestoneData = this.postPortfolioMilestoneDataSource.asObservable();

  private statusDefaultDataSource = new BehaviorSubject<string>(
    this.statusDefault
  );
  statusDefaultData = this.statusDefaultDataSource.asObservable();

  private submitFeatureRequestDataSource = new Subject();
  submitFeatureRequestData = this.submitFeatureRequestDataSource.asObservable();

  public get userUidData(): any {
    return JSON.parse(this.dataService.getToken()).uID;
  }

  private putUserResponseDataSource = new Subject();
  putUserResponseData = this.putUserResponseDataSource.asObservable();

  // private activeUserIdDataSource = new BehaviorSubject<any>(this.userUidData);
  private activeUserIdDataSource = new Subject();
  activeUserIdData = this.activeUserIdDataSource.asObservable();

  private removePortfolioUserDataSource = new Subject();
  removePortfolioUserData = this.removePortfolioUserDataSource.asObservable();

  public get getCoachName(): any {
    return JSON.parse(this.dataService.getToken()).coachName;
  }

  private userNameDataSource = new Subject();
  userNameData = this.userNameDataSource.asObservable();

  private userListMinusOneDataSource = new Subject();
  userListMinusOneData = this.userListMinusOneDataSource.asObservable();

  private userListPlusOneDataSource = new Subject();
  userListPlusOneData = this.userListPlusOneDataSource.asObservable();

  private userListPlusTwoDataSource = new Subject();
  userListPlusTwoData = this.userListPlusTwoDataSource.asObservable();

  private deleteUserKpiDataSource = new Subject();
  deleteUserKpiData = this.deleteUserKpiDataSource.asObservable();

  private deleteUserMilestoneDataSource = new Subject();
  deleteUserMilestoneData = this.deleteUserMilestoneDataSource.asObservable();

  private userPlusOneDataSource = new BehaviorSubject<string>(
    this.userPlusOneUser
  );
  userPlusOneData = this.userPlusOneDataSource.asObservable();

  private corporateKpiDataSource = new BehaviorSubject<any>(null);
  corporateKpiData = this.corporateKpiDataSource.asObservable();

  private postQuarterSplitBulkDataSource = new Subject();
  public postQuarterSplitBulkData = this.postQuarterSplitBulkDataSource.asObservable();

  private postUserDataAccessDataSource = new Subject();
  public postUserDataAccessData = this.postUserDataAccessDataSource.asObservable();

  private getUserDataAccessDataSource = new Subject();
  public getUserDataAccessData = this.getUserDataAccessDataSource.asObservable();

  private putUserDataAccessDataSource = new Subject();
  public putUserDataAccessData = this.putUserDataAccessDataSource.asObservable();

  private kpiHistoryDataSource = new BehaviorSubject<any>(this.kpiMilestones);
  public kpiHistoryData = this.kpiHistoryDataSource.asObservable();

  private postKpiHistoryDataSource = new Subject();
  public postKpiHistoryData = this.postKpiHistoryDataSource.asObservable();

  private putKpiHistoryDataSource = new Subject();
  public putKpiHistoryData = this.putKpiHistoryDataSource.asObservable();

  constructor(
    private http: HttpClient,
    private apiService: HttpServiceService,
    private dataService: SharedDataService
  ) {}

  getkpislist(driverID: any) {
    this.apiService
      .get(`/v1/getKpiDriver?driverID=${driverID}`)
      .subscribe(response => {
        this.kpislist = response;
        this.kpislistdataSource.next(this.kpislist);
      });
  }
  getAllUserAns(): any {
    this.apiService
      .get(`/v1/getUserAns?driverID=f27f4b24-33b4-4b5e-a41c-16e0537d029a`) // 09.21.2020 - why is this static?
      .subscribe(
        response => {
          this.userAns = [];
          for (const key in response.userAnw) {
            this.userAns.push({
              answer: response.userAnw[key].answer,
              question: response.userAnw[key].Question.question
            });
          }
          this.userAnsdataSource.next(this.userAns);
        },
        error => {
          console.log(error);
        }
      );
  }
  updateUserKpi(kpi: any): any {
    this.apiService.put("/v1/kpi", kpi).subscribe(
      response => {},
      error => {
        console.log(error);
      }
    );
  }
  getPhoto(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    this.url = environment.imgUrl
      ? environment.imgUrl
      : "http://108.163.221.122:2004/";
    if (v.img) {
      this.url = this.url + v.img;
    } else {
      this.url = "assets/img.jpg";
    }
    return this.url;
  }

  getRole(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    return v.roleAdmin;
  }

  getLevel(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    return v.level;
  }

  getDrivers() {
    this.apiService.get("/v1/drivers").subscribe(response => {
      this.drivers = [];
      // tslint:disable-next-line:forin
      for (const key in response.drivers) {
        this.drivers.push({
          driverID: response.drivers[key].driverID,
          driverName: response.drivers[key].driverName,
          driverImage: response.drivers[key].driverImage,
          driverVideo: response.drivers[key].driverVideo
        });
      }
      this.driversdataSource.next(this.drivers);
      this.driversDataSource.next(this.drivers);
    });
  }

  getUserManagers(uID) {
    this.apiService
      .get(`/v1/getUserManagers?uID=${uID}`)
      .subscribe(response => {
        this.milestoneManagerUsers = [];
        // tslint:disable-next-line:forin
        for (const key in response.payload) {
          this.milestoneManagerUsers.push({
            uID: response.payload[key].Manager.uID,
            name: response.payload[key].Manager.name,
            lname: response.payload[key].Manager.lname,
            info: response.payload[key].Manager.info
          });
        }
        this.mileStoneManagerUsersSource.next(this.milestoneManagerUsers);
      });
  }
  updateUser(item: FormData): void {
    this.apiService.putform("/v1/user", item).subscribe(response => {
      // console.log(response);
    });
  }
  getUser() {
    this.apiService.get("/v1/user").subscribe(response => {
      this.user = response.user;
      this.usersource.next(this.user);
    });
  }
  updateNotify() {
    this.apiService.put("/v1/updateNotify").subscribe(response => {});
  }
  registerDevice(data: any) {
    this.apiService.post("/v1/registerDevice", data).subscribe(response => {
      // console.log("register device");
    });
  }

  getDashStatus(uID) {
    let url = "";
    if (uID) {
      url = `/v1/getDashStatus?uID=${uID}`;
    } else {
      url = "/v1/getDashStatus";
    }
    this.apiService.get(url).subscribe(response => {
      this.dashStatus = [];
      // tslint:disable-next-line:forin
      for (const key in response.dashStatus) {
        this.dashStatus.push({
          driverID: response.dashStatus[key].driverID,
          driverName: response.dashStatus[key].driverName,
          driverImage: response.dashStatus[key].driverImage,
          total: response.dashStatus[key].total,
          cCount: response.dashStatus[key].cCount,
          hCount: response.dashStatus[key].hCount,
          aCount: response.dashStatus[key].aCount,
          rCount: response.dashStatus[key].rCount,
          pCount: response.dashStatus[key].pCount,
          dCount: response.dashStatus[key].dCount
        });
      }
      this.dashStatusSource.next(this.dashStatus);
      this.dashStatusSummarySource.next(this.dashStatus);
    });
  }

  getUserMilestoneStatus(uID, level: number = 2) {
    let url = "";
    var userMilestoneData: any = [];

    if (uID) {
      url = `/v1/getDashStatus?uID=${uID}`;
    } else {
      url = "/v1/getDashStatus";
    }
    this.apiService.get(url).subscribe(response => {
      // tslint:disable-next-line:forin
      for (const key in response.dashStatus) {
        userMilestoneData.push({
          level: level,
          driverID: response.dashStatus[key].driverID,
          driverName: response.dashStatus[key].driverName,
          driverImage: response.dashStatus[key].driverImage,
          total: response.dashStatus[key].total,
          cCount: response.dashStatus[key].cCount,
          hCount: response.dashStatus[key].hCount,
          aCount: response.dashStatus[key].aCount,
          rCount: response.dashStatus[key].rCount,
          pCount: response.dashStatus[key].pCount
        });
      }
      if (level == 2) {
        this.userMilestoneSummaryDataSource.next(userMilestoneData);
      } else if (level == 3) {
        this.l2UserMilestoneSummaryDataSource.next(userMilestoneData);
      }
    });
  }

  getStatement() {
    this.apiService.get("/v1/getStatement").subscribe(response => {
      this.statement = response;
      this.statementSource.next(this.statement);
    });
  }
  getNotifications(page: any) {
    let url = "";
    if (page === "h") {
      url = `/v1/getAllNotification?status=read`;
    } else {
      url = `/v1/getAllNotification`;
    }
    this.apiService.get(url).subscribe(response => {
      this.notifications = [];
      // tslint:disable-next-line:forin
      for (const key in response.nList) {
        this.notifications.push({
          achieveText: response.nList[key].Milestone
            ? response.nList[key].Milestone.achieveText
            : "",
          charpStatus: response.nList[key].Milestone
            ? response.nList[key].Milestone.charpStatus
            : "",
          createdAt: response.nList[key].createdAt,
          dueDate: response.nList[key].dueDate,
          mileID: response.nList[key].mileID,
          driverID: response.nList[key].Milestone
            ? response.nList[key].Milestone.Kpi
              ? response.nList[key].Milestone.Kpi.driverID
              : ""
            : "",
          user: response.nList[key].User,
          isRead: response.nList[key].isRead
        });
      }
      this.notifySource.next(this.notifications);
    });
  }

  /** CRUD METHODS */
  resetKpi() {
    this.apiService.delete("/v1/resetUser").subscribe(response => {
      console.log("kpi Reset");
    });
  }
  getAllItems(type: any): any {
    this.apiService.get(`/v1/questions?driverID=${type}`).subscribe(
      response => {
        this.qBank = [];
        for (const key in response.sec) {
          this.qBank.push({
            question: response.sec[key].question,
            queID: response.sec[key].queID,
            Options: response.sec[key].Options,
            QuestionType: response.sec[key].QuestionType,
            desc: "",
            answer: false
          });
        }
        // console.log(this.users);
        this.qBankdataSource.next(this.qBank);
      },
      error => {
        console.log(error);
      }
    );
  }
  getQuarterList(uID: string = null): any {
    var url: string;

    if (uID) {
      url = `/v1/quartersplit?uID=${uID}`;
    } else {
      url = `/v1/quartersplit`;
    }

    this.apiService.get(url).subscribe(
      response => {
        this.quarterList = [];
        for (const key in response.list) {
          this.quarterList.push({
            type: response.list[key].type,
            qsID: response.list[key].qsID,
            startDate: response.list[key].startDate,
            endDate: response.list[key].endDate,
            assign: []
          });
        }
        for (const key in response.listAssignKpi) {
          for (const key1 in response.list) {
            if (response.listAssignKpi[key].qsID === response.list[key1].qsID) {
              this.quarterList[key1].assign.push({
                kpiID: response.listAssignKpi[key].kpiID,
                qsID: response.listAssignKpi[key].qsID
              });
            }
          }
        }
        this.quarterListdataSource.next(this.quarterList);
        this.quarterListDataSource.next(this.quarterList);
      },
      error => {
        console.log(error);
      }
    );
  }
  getMileStoneAssignUsersList(driverID, uID, deptID, page, level): any {
    let url = "";
    if (uID) {
      url = `/v1/getAllTask?driverID=${driverID}&uID=${uID}`;
    } else if (deptID) {
      url = `/v1/getAllTask?driverID=${driverID}&deptID=${deptID}&page=${page}&level=${level}`;
    } else {
      url = `/v1/getAllTask?driverID=${driverID}&page=${page}&level=${level}`;
    }

    this.apiService.get(url).subscribe(
      response => {
        this.milestoneAssignUsers = [];
        for (const key in response.mList) {
          let flag = false;
          if (response.uID) {
            if (response.uID !== response.mList[key].uID) {
              flag = true;
            }
          }
          this.milestoneAssignUsers.push({
            achieveText: response.mList[key].achieveText,
            dueDate: response.mList[key].dueDate,
            User: response.mList[key].User,
            objective: response.mList[key].Kpi.objective,
            unit: response.mList[key].Kpi.unit,
            qty: response.mList[key].Kpi.qty,
            charpStatus: response.mList[key].charpStatus,
            mileID: response.mList[key].mileID,
            readOnly: flag
          });
        }
        for (const key in response.mList1) {
          this.milestoneAssignUsers.push({
            name: response.mList1[key].name,
            lname: response.mList1[key].lname,
            uID: response.mList1[key].uID,
            Role: response.mList1[key].Role,
            info: response.mList1[key].info ? response.mList1[key].info : ""
          });
        }
        // console.log(this.users);
        this.mileStoneAssignUsersSource.next(this.milestoneAssignUsers);
        // console.log(this.milestoneAssignUsers);
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserListMinusOne(uID: string): void {
    var data: any = [];

    this.getUserListMinusOneSubscription = this.apiService
      .get(`/v1/getUserList?uID=${uID}&level=MinusOne`)
      .subscribe(response => {
        for (const key in response.payload) {
          data.push({
            name: response.payload[key].name,
            lname: response.payload[key].lname,
            uID: response.payload[key].uID,
            Role: response.payload[key].Role,
            info: response.payload[key].info ? response.payload[key].info : ""
          });
        }
        this.userListMinusOneDataSource.next(data);
      });
  }

  getUserListPlusOne(uID: string): void {
    var data: any = [];

    this.getUserListPlusOneSubscription = this.apiService
      .get(`/v1/getUserHierarchy?uID=${uID}`)
      .subscribe(response => {
        for (const key in response.payload) {
          data.push({
            name: response.payload[key].name,
            lname: response.payload[key].lname,
            uID: response.payload[key].uID,
            info: response.payload[key].info ? response.payload[key].info : ""
          });
        }
        this.userListPlusOneDataSource.next(data);
      });
  }

  getUserListPlusTwo(uID: string): void {
    var data: any = [];

    this.getUserListPlusTwoSubscription = this.apiService
      .get(`/v1/getUserHierarchy?uID=${uID}`)
      .subscribe(response => {
        for (const key in response.payload) {
          data.push({
            name: response.payload[key].name,
            lname: response.payload[key].lname,
            uID: response.payload[key].uID,
            info: response.payload[key].info ? response.payload[key].info : ""
          });
        }
        this.userListPlusTwoDataSource.next(data);
      });
  }

  getMileStoneAssignUsersKpi(driverID, depID, uID, page): any {
    let url = "";

    if (uID) {
      url = `/v1/getAllTask?driverID=${driverID}&uID=${uID}`;
    } else {
      url = `/v1/getAllTask?depID=${depID}&driverID=${driverID}&page=${page}`;
    }
    this.apiService.get(url).subscribe(
      response => {
        this.milestoneAssignUsersKpi = [];
        for (const key in response.mList) {
          let flag = false;
          if (response.uID) {
            if (response.uID !== response.mList[key].uID) {
              flag = true;
            }
          }
          this.milestoneAssignUsersKpi.push({
            achieveText: response.mList[key].achieveText,
            dueDate: response.mList[key].dueDate,
            User: response.mList[key].User,
            objective: response.mList[key].Kpi.objective,
            kpiID: response.mList[key].Kpi.kpiID,
            driverID: response.mList[key].Kpi.driverID,
            qty: response.mList[key].Kpi.qty,
            charpStatus: response.mList[key].charpStatus,
            mileID: response.mList[key].mileID,
            readOnly: flag,
            recurringFrequency: response.mList[key].recurringFrequency,
            milestoneNote: response.mList[key].milestoneNote
          });
        }
        this.mileStoneAssignUsersSourceKpi.next(this.milestoneAssignUsersKpi);
      },
      error => {
        console.log(error);
      }
    );
  }

  getOrgMilestones(orgID:string):Observable<any> {
    return this.apiService.get(`/v1/organizationMilestones?orgID=${orgID}`)
  }

  getOrgInfo(orgID:string):Observable<any> {
    return this.apiService.get(`/v1/orgnization?orgID=${orgID}`)
  }

  getCorporateKpis(orgID:string,isOnlyCorporateKPIs=true):Observable<any> {
    return this.apiService.get(`/v1/CorporateKpis?orgID=${orgID}&isOnlyCorporateKPIs=${isOnlyCorporateKPIs}`)
  }

  getOrgIssues(orgID:string):Observable<any> {
    return this.apiService.get(`/v1/issueByOrganization?orgID=${orgID}`);
  }

  getMileStoneAssignUsers(driverID, uID): any {
    this.apiService
      .get(`/v1/getAllTask1?driverID=${driverID}&uID=${uID}`)
      .subscribe(
        response => {
          this.milestoneAssignUsers1 = [];
          for (const key in response.mList) {
            let flag = false;
            if (response.uID) {
              if (response.uID !== response.mList[key].uID) {
                flag = true;
              }
            }
            this.milestoneAssignUsers1.push({
              achieveText: response.mList[key].achieveText,
              dueDate: response.mList[key].dueDate,
              User: response.mList[key].User,
              objective: response.mList[key].Kpi.objective,
              qty: response.mList[key].Kpi.qty,
              charpStatus: response.mList[key].charpStatus,
              mileID: response.mList[key].mileID,
              readOnly: flag
            });
          }
          for (const key in response.mList1) {
            this.milestoneAssignUsers1.push({
              name: response.mList1[key].name,
              lname: response.mList1[key].lname,
              uID: response.mList1[key].uID,
              Role: response.mList1[key].Role,
              info: response.mList1[key].info ? response.mList1[key].info : ""
            });
          }
          // console.log(this.users);
          this.mileStoneAssignUsersSource1.next(this.milestoneAssignUsers1);
        },
        error => {
          console.log(error);
        }
      );
  }
  getMileStoneAssignUsersl2(driverID, uID, level): any {
    if (!driverID || !uID || !level) {
      this.mileStoneAssignUsersSourcel2.next(null);
    } else {
      this.apiService
        .get(`/v1/getAllTask1?depID=${driverID}&uID=${uID}&level=${level}`)
        .subscribe(
          response => {
            this.milestoneAssignUsersl2 = [];
            for (const key in response.mList) {
              let flag = false;
              if (response.uID) {
                if (response.uID !== response.mList[key].uID) {
                  flag = true;
                }
              }
              this.milestoneAssignUsersl2.push({
                name: response.mList[key].name,
                lname: response.mList[key].lname,
                info: response.mList[key].info,
                uID: response.mList[key].uID,
                Role: response.mList[key].Role
              });
            }
            this.mileStoneAssignUsersSourcel2.next(this.milestoneAssignUsersl2);
          },
          error => {
            console.log(error);
          }
        );
    }
  }
  getMileStoneAssignUsersl3(driverID, uID, level): any {
    this.apiService
      .get(`/v1/getAllTask1?depID=${driverID}&uID=${uID}&level=${level}`)
      .subscribe(
        response => {
          this.milestoneAssignUsersl3 = [];
          for (const key in response.mList) {
            let flag = false;
            if (response.uID) {
              if (response.uID !== response.mList[key].uID) {
                flag = true;
              }
            }
            this.milestoneAssignUsersl3.push({
              name: response.mList[key].name,
              lname: response.mList[key].lname,
              info: response.mList[key].info,
              uID: response.mList[key].uID
            });
          }
          // console.log(this.users);
          this.mileStoneAssignUsersSourcel3.next(this.milestoneAssignUsersl3);
        },
        error => {
          console.log(error);
        }
      );
  }
  getMileStoneAssignUsersList1(driverID): any {
    this.apiService
      .get(`/v1/getAllTask?driverID=${driverID}&today=true`)
      .subscribe(
        response => {
          this.milestoneAssignUsers = [];
          for (const key in response.mList) {
            let flag = false;
            if (response.uID) {
              if (response.uID !== response.mList[key].uID) {
                flag = true;
              }
            }
            this.milestoneAssignUsers.push({
              achieveText: response.mList[key].achieveText,
              dueDate: response.mList[key].dueDate,
              User: response.mList[key].User,
              objective: response.mList[key].Kpi.objective,
              qty: response.mList[key].Kpi.qty,
              charpStatus: response.mList[key].charpStatus,
              mileID: response.mList[key].mileID,
              readOnly: flag
            });
          }
          // console.log(this.users);
          this.mileStoneAssignUsersSource.next(this.milestoneAssignUsers);
        },
        error => {
          console.log(error);
        }
      );
  }
  getMileStoneAssignUsersList2(driverID): any {
    this.apiService
      .get(`/v1/getAllTask?driverID=${driverID}&page=update`)
      .subscribe(
        response => {
          this.milestoneAssignUsers = [];
          for (const key in response.mList) {
            let flag = false;
            if (response.uID) {
              if (response.uID !== response.mList[key].uID) {
                flag = true;
              }
            }
            this.milestoneAssignUsers.push({
              achieveText: response.mList[key].achieveText,
              dueDate: response.mList[key].dueDate,
              User: response.mList[key].User,
              objective: response.mList[key].Kpi.objective,
              qty: response.mList[key].Kpi.qty,
              charpStatus: response.mList[key].charpStatus,
              mileID: response.mList[key].mileID,
              readOnly: flag
            });
          }
          // console.log(this.users);
          this.mileStoneAssignUsersSource.next(this.milestoneAssignUsers);
        },
        error => {
          console.log(error);
        }
      );
  }
  assignTaskSelf() {
    this.apiService.get("/v1/registerAssignMileSelf").subscribe(response => {
      console.log("Assign Self");
    });
  }
  getDeptUsers1(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    let url = "";
    if (v.level === "L1") {
      url = `/v1/getDeptUsers?orgID=${v.orgID}&level=${v.level}`;
    } else {
      url = `/v1/getDeptUsers?depID=${v.depID}&level=${v.level}`;
    }

    this.apiService.get(url).subscribe(
      response => {
        this.deptUsers = [];
        for (const key in response.users) {
          if (response.users[key].Role) {
            this.deptUsers.push({
              name: response.users[key].name,
              email: response.users[key].email,
              uID: response.users[key].uID,
              qty: 0,
              mileID: "",
              dueDate: new Date(),
              assign: false,
              role: response.users[key].Role.roleName
            });
          }
        }
        // console.log(this.users);
        this.dUsersdataSource.next(this.deptUsers);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllDeptUsers(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    this.apiService
      .get(`/v1/getAllDeptUsers?depID=${v.depID}&level=${v.level}`)
      .subscribe(
        response => {
          this.allDeptUsers = [];
          for (const key in response.users) {
            this.allDeptUsers.push({
              name: response.users[key].name,
              lname: response.users[key].lname,
              uID: response.users[key].uID,
              rID: response.users[key].rID,
              depID: response.users[key].Role.rID
            });
          }
          this.allDeptUsersDataSource.next(this.allDeptUsers);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPortfolioUserAllDeptUsers(
    depID: string,
    level: string,
    orgID: string,
    uID: string
  ): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);

    if (level == "L1") {
      var url = `/v1/getPortfolioDeptUsers?orgID=${orgID}&level=${level}&uID=${uID}`;
    } else {
      var url = `/v1/getPortfolioDeptUsers?depID=${depID}&level=${level}`;
    }
    this.getPortfolioUserAllDeptUsersSubscription
      ? this.getPortfolioUserAllDeptUsersSubscription.unsubscribe()
      : null;
    this.getPortfolioUserAllDeptUsersSubscription = this.apiService
      .get(url)
      .subscribe(
        response => {
          this.allDeptUsers = [];
          for (const key in response.users) {
            this.allDeptUsers.push({
              name: response.users[key].name,
              lname: response.users[key].lname,
              uID: response.users[key].uID,
              rID: response.users[key].rID,
              depID: response.users[key].Role.rID
            });
          }
          this.portfolioAllDeptUsersDataSource.next(this.allDeptUsers);
        },
        error => {
          console.log(error);
        }
      );
  }

  getDeptUsers(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    this.apiService.get(`/v1/getDeptUsers?depID=${v.depID}`).subscribe(
      response => {
        this.deptUsers = [];
        for (const key in response.users) {
          this.deptUsers.push({
            name: response.users[key].name,
            email: response.users[key].email,
            uID: response.users[key].uID,
            qty: 0,
            mileID: "",
            dueDate: new Date(),
            assign: false,
            role: response.users[key].Role.roleName
          });
        }
        // console.log(this.users);
        this.dUsersdataSource.next(this.deptUsers);
      },
      error => {
        console.log(error);
      }
    );
  }
  getAllRfpOptions(queID: any): any {
    this.apiService.get(`/v1/getAllrfpoptions?queID=${queID}`).subscribe(
      response => {
        this.rfpOptions = [];
        for (const key in response.uoptions) {
          this.rfpOptions.push({
            answer: response.uoptions[key].answer,
            queID: response.uoptions[key].queID
          });
        }
        // console.log(this.users);
        this.rfpOptionsdataSource.next(this.rfpOptions);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllKpiQuarterList(): any {
    this.apiService.get(`/v1/geQuarterKpi`).subscribe(
      response => {
        this.kpiQuarterList = [];
        this.kpiQuarterList = response.kpis;
        this.kpiQuarterSource.next(this.kpiQuarterList);
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserInfo(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    this.userNameDataSource.next(v.name);
    return v.name;
  }

  getUserInfoList(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    return v.depID;
  }
  getOrgID(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    return v.orgID;
  }
  addMilestone(data) {
    this.apiService.post("/v1/milesstone", data).subscribe(response => {
      console.log("MileStone Added");
    });
  }

  postPortfolioMilestone(data) {
    this.apiService.post("/v1/portfolioMilestone", data).subscribe(response => {
      this.postPortfolioMilestoneDataSource.next(response);
    });
  }

  getUserKpiMilestone(uID: string, driverID: string): any {
    this.userKpiMilestone = [];
    let data: any = null;

    if (!uID) {
      return "uID required";
    }

    let url = "/v1/getUserKpiMilestones?uID=" + uID + "&driverID=" + driverID;
    this.apiService.get(url).subscribe(response => {
      data = response["kpis"];
      for (const key in data) {
        this.userKpiMilestone.push({
          objective: data[key].objective,
          kpiID: data[key].kpiID,
          uID: uID,
          milestones: data[key].Milestones
        });
      }
      this.userKpiMilestoneDataSource.next(this.userKpiMilestone);
      this.userMilestoneDataSource.next(this.userKpiMilestone);
    });
  }

  getKpiMilestone(driverID): any {
    let url = "";
    if (driverID) {
      url = `/v1/milesstoneKpiAll?driverID=${driverID}`;
    } else {
      url = `/v1/milesstoneKpiAll`;
    }
    this.apiService.get(url).subscribe(
      response => {
        this.kpiMilestones = [];
        for (const key in response.kpis) {
          this.kpiMilestones.push({
            objective: response.kpis[key].objective,
            qty: response.kpis[key].qty,
            unit: response.kpis[key].unit,
            achieveQty: response.kpis[key].achieveQty,
            Milestones: response.kpis[key].Milestones,
            Driver: response.kpis[key].Driver,
            cinput: false,
            kpiID: response.kpis[key].kpiID
          });
          this.getKpiHistory(response.kpis[key].kpiID);
        }
        this.mileStonedataSource.next(this.kpiMilestones);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateMilestone(data) {
    this.apiService.put("/v1/milesstone", data).subscribe(response => {});
  }

  getMilestoneAll1(type, v): any {
    let url = "";
    if (v === 0) {
      url = "/v1/getAllAssign";
    } else {
      url = "/v1/milesstoneAll";
    }
    this.apiService.get(url).subscribe(
      response => {
        this.mileStoneAll = [];
        for (const key in response.milesstones) {
          if (response.milesstones[key].Kpi !== null) {
            if (type === "a") {
              this.mileStoneAll.push({
                objective: response.milesstones[key].achieveText,
                type: response.milesstones[key].type,
                qty: response.milesstones[key].qty,
                mileID: response.milesstones[key].mileID,
                dueDate: response.milesstones[key].dueDate,
                kpiID: response.milesstones[key].kpiID,
                // kpi: this.singleKpiSource,
                driverID: response.milesstones[key].Kpi
                  ? response.milesstones[key].Kpi.Driver.driverID
                  : "",
                driverImage: response.milesstones[key].Kpi
                  ? response.milesstones[key].Kpi.Driver.driverImage
                  : "",
                startDate: response.milesstones[key].QuarterKpiAssigns[0]
                  .QuarterSplit
                  ? response.milesstones[key].QuarterKpiAssigns[0].QuarterSplit
                      .startDate
                  : "",
                endDate: response.milesstones[key].QuarterKpiAssigns[0]
                  .QuarterSplit
                  ? response.milesstones[key].QuarterKpiAssigns[0].QuarterSplit
                      .endDate
                  : "",
                quarterType: response.milesstones[key].QuarterKpiAssigns[0]
                  .QuarterSplit
                  ? response.milesstones[key].QuarterKpiAssigns[0].QuarterSplit
                      .type
                  : "quarter",
                quarterID: response.milesstones[key].QuarterKpiAssigns[0]
                  ? response.milesstones[key].QuarterKpiAssigns[0].qsID
                  : "qsID",
                assignName: response.milesstones[key].User
                  ? response.milesstones[key].User.name
                  : ""
              });
            } else {
              this.mileStoneAll.push({
                driverImage: response.milesstones[key].Kpi
                  ? response.milesstones[key].Kpi.Driver.driverImage
                  : "",
                objective: response.milesstones[key].achieveText,
                type: response.milesstones[key].type,
                qty: response.milesstones[key].qty,
                mileID: response.milesstones[key].mileID,
                kpiID: response.milesstones[key].kpiID,
                quarterID: response.milesstones[key].QuarterKpiAssigns[0]
                  ? response.milesstones[key].QuarterKpiAssigns[0].qsID
                  : "qsID",
                assignName: response.milesstones[key].User
                  ? response.milesstones[key].User.name
                  : ""
              });
            }
          }
        }
        this.mileDataSource.next(this.mileStoneAll);
      },
      error => {
        console.log(error);
      }
    );
  }
  getKpiDriver(driverID): any {
    let url = "";
    if (driverID) {
      url = `/v1/kpis?driverID=${driverID}`;
    } else {
      url = `/v1/kpis`;
    }
    this.apiService.get(url).subscribe(
      response => {
        this.kpiMilestones = [];
        for (const key in response.payload[0]) {
          this.kpiMilestones.push({
            objective: response.payload[0][key].objective,
            qty: response.payload[0][key].qty,
            unit: response.payload[0][key].unit,
            achieveQty: response.payload[0][key].achieveQty,
            Milestones: response.payload[0][key].Milestones,
            cinput: false,
            kpiID: response.payload[0][key].kpiID,
            isCorporateKpi: response.payload[0][key].isCorporateKpi,
            isDelegated: response.payload[0][key].KpiDelegates.length > 0 ? true : false,
            isActive: false
          });
          this.getKpiHistory(response.payload[0][key].kpiID);
        }

        for (const key in response.payload[1]) {
          this.kpiMilestones.push({
            objective: response.payload[1][key].objective,
            qty: response.payload[1][key].qty,
            unit: response.payload[1][key].unit,
            achieveQty: response.payload[1][key].achieveQty,
            Milestones: response.payload[1][key].Milestones,
            cinput: false,
            kpiID: response.payload[1][key].kpiID,
            isCorporateKpi: response.payload[1][key].isCorporateKpi,
            isDelegated: true
          });
          this.getKpiHistory(response.payload[1][key].kpiID);
        }
        this.mileStonedataSource.next(this.kpiMilestones);
      },
      error => {
        console.log(error);
      }
    );
  }
  getMilestoneAll(): any {
    this.apiService.get(`/v1/milesstoneAll`).subscribe(
      response => {
        this.mileStoneAll = [];
        for (const key in response.milesstones) {
          if (response.milesstones[key].Kpi !== null) {
            this.mileStoneAll.push({
              objective: response.milesstones[key].Kpi.objective,
              type: response.milesstones[key].type,
              qty: response.milesstones[key].qty,
              mileID: response.milesstones[key].mileID
            });
          }
        }

        this.mileDataSource.next(this.mileStoneAll);
      },
      error => {
        console.log(error);
      }
    );
  }
  getUserKpiAll(uID, driverID): any {
    let url = "";
    if (uID && driverID) {
      url = `/v1/getUserKpi?uID=${uID}&driverID=${driverID}`;
    } else if (uID) {
      url = `/v1/getUserKpi?uID=${uID}`;
    } else {
      url = `/v1/getUserKpi`;
    }
    this.apiService.get(url).subscribe(
      response => {
        this.kpiListAll = [];
        for (const key in response.kpis) {
          if (response.kpis[key].qty !== null) {
            this.kpiListAll.push({
              objective: response.kpis[key].objective,
              type: response.kpis[key].type,
              aTarget: 0,
              achieveQty: response.kpis[key].achieveQty,
              qty: response.kpis[key].qty,
              kpiID: response.kpis[key].kpiID,
              unit: response.kpis[key].unit,
              KPI: response.kpis[key].objective,
              Target: response.kpis[key].qty,
              Unit: response.kpis[key].unit,
              Actual: response.kpis[key].achieveQty,
              "% of Target":
                (
                  100 *
                  (response.kpis[key].achieveQty / response.kpis[key].qty)
                ).toFixed(0) + "%"
            });
          }
        }

        this.kpiListdataSource.next(this.kpiListAll);
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserKpiAllM(uID, driverID): any {
    // console.log('getUserKpiAllM');
    let url = `/v1/getUserKpi?uID=${uID}&driverID=${driverID}`;
    // if (uID && driverID) {
    //   url = `/v1/getUserKpi?uID=${uID}&driverID=${driverID}`;
    // } else if (uID) {
    //   url = `/v1/getUserKpi?uID=${uID}`;
    // }

    // console.log(`url: ${url}`);
    this.apiService.get(url).subscribe(
      response => {
        // console.log('response');
        // console.log(response);
        this.kpiListAllM = [];
        for (const key in response.kpis) {
          if (response.kpis[key].qty !== null) {
            this.kpiListAllM.push({
              objective: response.kpis[key].objective,
              type: response.kpis[key].type,
              aTarget: 0,
              achieveQty: response.kpis[key].achieveQty,
              qty: response.kpis[key].qty,
              kpiID: response.kpis[key].kpiID,
              unit: response.kpis[key].unit,
              KPI: response.kpis[key].objective,
              Target: response.kpis[key].qty,
              Unit: response.kpis[key].unit,
              Actual: response.kpis[key].achieveQty,
              "% of Target":
                (
                  100 *
                  (response.kpis[key].achieveQty / response.kpis[key].qty)
                ).toFixed(0) + "%"
            });
          }
        }
        // console.log(this.users);
        this.kpiListdataSourceM.next(this.kpiListAllM);
      },
      error => {
        console.log(error);
      }
    );
  }

  getCorporateKpi(uID, driverID, source: string): any {
    let data: any = [];
    this.apiService
      .get(`/v1/getCorporateKpi?uID=${uID}&driverID=${driverID}`)
      .subscribe(
        response => {
          for (const key in response.payload) {
            if (response.payload[key].qty !== null) {
              data.push({
                objective: response.payload[key].objective,
                type: response.payload[key].type,
                aTarget: 0,
                achieveQty: response.payload[key].achieveQty,
                qty: response.payload[key].qty,
                kpiID: response.payload[key].kpiID,
                unit: response.payload[key].unit,
                KPI: response.payload[key].objective,
                Target: response.payload[key].qty,
                Unit: response.payload[key].unit,
                Actual: response.payload[key].achieveQty,
                "% of Target":
                  (
                    100 *
                    (response.payload[key].achieveQty /
                      response.payload[key].qty)
                  ).toFixed(0) + "%"
              });
            }
          }
          // console.log(this.users);
          this.corporateKpiDataSource.next(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  getUserKpiAllC(uID, driverID, orgID): any {
    let url = "";
    if (uID) {
      url = `/v1/getUserKpi?uID=${uID}&driverID=${driverID}`;
    } else {
      url = `/v1/getUserKpi`;
    }
    this.apiService.get(url).subscribe(
      response => {
        this.kpiListAllC = [];
        for (const key in response.kpis) {
          if (response.kpis[key].qty !== null) {
            this.kpiListAllC.push({
              objective: response.kpis[key].objective,
              type: response.kpis[key].type,
              aTarget: 0,
              achieveQty: response.kpis[key].achieveQty,
              qty: response.kpis[key].qty,
              kpiID: response.kpis[key].kpiID,
              unit: response.kpis[key].unit,
              KPI: response.kpis[key].objective,
              Target: response.kpis[key].qty,
              Unit: response.kpis[key].unit,
              Actual: response.kpis[key].achieveQty,
              "% of Target":
                (
                  100 *
                  (response.kpis[key].achieveQty / response.kpis[key].qty)
                ).toFixed(0) + "%"
            });
          }
        }
        // console.log(this.users);
        this.kpiListdataSourceC.next(this.kpiListAllC);
      },
      error => {
        console.log(error);
      }
    );
  }
  getUserKpiAllC1(uID, driverID, orgID): any {
    let url = "";
    if (uID) {
      url = `/v1/getUserKpi?uID=${uID}&driverID=${driverID}`;
    } else {
      url = `/v1/getUserKpi`;
    }
    this.apiService.get(url).subscribe(
      response => {
        this.kpiListAllC1 = [];
        for (const key in response.kpis) {
          if (response.kpis[key].qty !== null) {
            this.kpiListAllC1.push({
              objective: response.kpis[key].objective,
              type: response.kpis[key].type,
              aTarget: 0,
              achieveQty: response.kpis[key].achieveQty,
              qty: response.kpis[key].qty,
              kpiID: response.kpis[key].kpiID,
              unit: response.kpis[key].unit,
              KPI: response.kpis[key].objective,
              Target: response.kpis[key].qty,
              Unit: response.kpis[key].unit,
              Actual: response.kpis[key].achieveQty,
              "% of Target":
                (
                  100 *
                  (response.kpis[key].achieveQty / response.kpis[key].qty)
                ).toFixed(0) + "%"
            });
          }
        }
        // console.log(this.users);
        this.kpiListdataSourceC1.next(this.kpiListAllC1);
      },
      error => {
        console.log(error);
      }
    );
  }
  getUserKpiAllC2(uID, driverID, orgID): any {
    let url = "";
    if (uID) {
      url = `/v1/getUserKpi?uID=${uID}&driverID=${driverID}`;
    } else {
      url = `/v1/getUserKpi`;
    }
    this.apiService.get(url).subscribe(
      response => {
        this.kpiListAllC2 = [];
        for (const key in response.kpis) {
          if (response.kpis[key].qty !== null) {
            this.kpiListAllC2.push({
              objective: response.kpis[key].objective,
              type: response.kpis[key].type,
              aTarget: 0,
              achieveQty: response.kpis[key].achieveQty,
              qty: response.kpis[key].qty,
              kpiID: response.kpis[key].kpiID,
              unit: response.kpis[key].unit,
              KPI: response.kpis[key].objective,
              Target: response.kpis[key].qty,
              Unit: response.kpis[key].unit,
              Actual: response.kpis[key].achieveQty,
              "% of Target":
                (
                  100 *
                  (response.kpis[key].achieveQty / response.kpis[key].qty)
                ).toFixed(0) + "%"
            });
          }
        }
        // console.log(this.users);
        this.kpiListdataSourceC2.next(this.kpiListAllC2);
      },
      error => {
        console.log(error);
      }
    );
  }
  getUserKpiDriverAll(driverID: any): any {
    this.getUserKpiDriverAllSubscription = this.apiService
      .get(`/v1/getUserKpiDriver?driverID=` + driverID)
      .subscribe(
        response => {
          this.kpiListAll1 = [];
          for (const key in response.kpis) {
            if (response.kpis[key].qty !== null) {
              this.kpiListAll1.push({
                objective: response.kpis[key].objective,
                type: response.kpis[key].type,
                aTarget: 0,
                qty: response.kpis[key].qty,
                kpiID: response.kpis[key].kpiID,
                charpStatus: response.kpis[key].charpStatus,
                KPI: response.kpis[key].objective,
                Target: response.kpis[key].qty,
                Unit: response.kpis[key].unit,
                Actual: response.kpis[key].achieveQty,
                "% of Target":
                  (
                    100 *
                    (response.kpis[key].achieveQty / response.kpis[key].qty)
                  ).toFixed(0) + "%"
              });
            }
          }
          // console.log(this.users);
          this.kpiListdataSource1.next(this.kpiListAll1);
        },
        error => {
          console.log(error);
        }
      );
  }
  updateActiveState(data) {
    this.apiService.put("/v1/updateActive", data).subscribe(response => {
      console.log("updateActive");
    });
  }
  getActiveState(): any {
    this.getActiveStateSubscription = this.apiService
      .get(`/v1/getActivePage`)
      .subscribe(
        response => {
          this.routeData = [];
          for (const key in response.pagecontents) {
            this.routeData.push({
              route: response.pagecontents[key].PageContent.routers,
              nextRoute: response.pagecontents[key].PageContent.nextRoute,
              nextPage: response.pagecontents[key].PageContent.nextPage,
              driverImage:
                response.pagecontents[key].PageContent.Driver.driverImage,
              driverVideo:
                response.pagecontents[key].PageContent.Driver.driverVideo,
              driverID: response.pagecontents[key].PageContent.driverID
            });
          }
          // console.log(this.users);
          this.routedataSource.next(this.routeData);
        },
        error => {
          console.log(error);
        }
      );
  }
  updateQuarterStatus(data) {
    this.updateQuarterStatusSubscription = this.apiService
      .put("/v1/updateKpiQuarter", data)
      .subscribe(response => {
        console.log("update Status");
      });
  }
  updateKpiCharpStatus(data) {
    this.updateKpiCharpStatusSubscription = this.apiService
      .put("/v1/kpi", data)
      .subscribe(response => {
        console.log("update Status");
      });
  }
  updateMileCharpStatus(data) {
    this.updateMileCharpStatusSubscription = this.apiService
      .put("/v1/milesstone", data)
      .subscribe(response => {
        console.log("update MilestoneStatus");
      });
  }
  assignUsers(data) {
    this.assignUsersSubscription = this.apiService
      .post("/v1/registerAssignMile", data)
      .subscribe(response => {
        console.log("Assign Users");
      });
  }
  assignKpiQuarter(data) {
    this.assignKpiQuarterSubscription = this.apiService
      .post("/v1/registerKpi", data)
      .subscribe(response => {});
  }
  assignMileQuarter(data) {
    this.assignMileQuarterSubscription = this.apiService
      .put("/v1/updateMilestonesQuarter", data)
      .subscribe(response => {
        console.log("updateMilestones quarter");
      });
  }

  updateMilestoneQuarter(data): any {
    this.updateMilestoneQuarterSubscription = this.apiService
      .put("/v1/updateMilestoneQuarter", data)
      .subscribe(response => {
        return response;
      });
  }
  addActiveState(data: any): any {
    // console.log(order);
    // this.bill =[];
    this.addActiveStateSubscription = this.apiService
      .post("/v1/registerOnboarding", data)
      .subscribe(
        response => {
          console.log("added");
          console.log(response);
        },
        error => {
          console.log(error);
          //  this.router.navigateByUrl('/account');
        }
      );
  }
  addUserAns(uAns: any): any {
    // console.log(order);
    // this.bill =[];
    this.addUserAnswerSubscription = this.apiService
      .post("/v1/registerAnsUser", uAns)
      .subscribe(
        response => {
          console.log("added");
          console.log(response);
        },
        error => {
          console.log(error);
          //  this.router.navigateByUrl('/account');
        }
      );
  }
  addUserRfpqAns(uAns: any, driverID: any): any {
    // console.log(order);
    // this.bill =[];
    this.addUserRfpqAnswerSubscription = this.apiService
      .post("/v1/registerAnsrfpqUser", uAns)
      .subscribe(
        response => {
          console.log("added" + response);
          const p = response.q;
          this.addUserKpi({
            objective: response.q.answer,
            driverID
          });
        },
        error => {
          console.log(error);
          //  this.router.navigateByUrl('/account');
        }
      );
  }

  deleteMilestone(mileID: any) {
    this.deleteMilestoneSubscription = this.apiService
      .delete(`/v1/deleteMilestone?mileID=${mileID}`)
      .subscribe(response => {
        this.deleteUserMilestoneDataSource.next(response);
      });
  }

  deleteKpi(kpiID: any) {
    this.deleteKpiSubscription = this.apiService
      .delete(`/v1/deletekpi?kpiID=${kpiID}`)
      .subscribe(response => {
        this.deleteUserKpiDataSource.next(response);
      });
  }

  addUserKpi(uAns: any): any {
    // console.log(order);
    // this.bill =[];
    this.addUserKpiSubscription = this.apiService
      .post("/v1/kpi", uAns)
      .subscribe(
        response => {
          console.log("added kpi" + response);
        },
        error => {
          console.log(error);
          //  this.router.navigateByUrl('/account');
        }
      );
  }

  addUserMileStones(m: any): any {
    // console.log(order);
    // this.bill =[];
    this.addUserMilestonesSubscription = this.apiService
      .post("/v1/registerMileBulk", m)
      .subscribe(
        response => {
          console.log("added kpi" + response);
        },
        error => {
          console.log(error);
          //  this.router.navigateByUrl('/account');
        }
      );
  }
  addOutcomeStatement(s: any): any {
    this.addOutcomeStatementSubscription = this.apiService
      .put("/v1/registerOutcome", s)
      .subscribe(
        response => {
          this.outcomeStatementNotificationDataSource.next(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  updateUserAns(uAns: any): any {
    // console.log(order);
    // this.bill =[];
    this.updateUserAnswerSubscription = this.apiService
      .put("/v1/updateAnsUser", uAns)
      .subscribe(
        response => {
          console.log("updated" + response);
        },
        error => {
          console.log(error);
          //  this.router.navigateByUrl('/account');
        }
      );
  }
  rmoveUserAns(optionID: any): any {
    // console.log(order);
    // this.bill =[];
    this.removeUserAnswerSubscription = this.apiService
      .delete(`/v1/removeAnsUser?optionID=${optionID}`)
      .subscribe(
        response => {
          console.log("deleted" + response);
        },
        error => {
          console.log(error);
          //  this.router.navigateByUrl('/account');
        }
      );
  }

  getSingle(kpiID: string): any {
    this.getSingleSubscription = this.apiService
      .get("/v1/kpi?kpiID=" + kpiID)
      .subscribe(data => {
        return data.org.objective;
      });
  }

  setDriverId(driverId: string, driverName: string): void {
    this.driverIdDataSource.next({
      driverID: driverId,
      driverName: driverName
    });
  }

  setLevel3Display(display: boolean = false): void {
    this.level3DisplayDataSource.next(display);
  }

  lookupPortfolioAccount(uID: string, orgID: string): boolean {
    if (uID == "") {
      return true;
    } else {
      return false;
    }
  }

  setShowPortfolioView(showPortfolioAccount: boolean): void {
    this.showPortfolioAccount = showPortfolioAccount;
    this.showPortfolioViewDataSource.next(this.showPortfolioAccount);
  }

  getPortfolioData(parentOrgID: string): void {
    // var portfolioData:any;
    // this.apiService.get(`/v1/portfolio?parentOrgID=${parentOrgID}`).subscribe(data => {
    //   for (const key in data.payload) {
    //     portfolioData.push({
    //       orgName: data.payload[key].orgName,
    //     })
    //     this.portfolioAccountDataSource.next(portfolioData);
    //   }
    // })
  }

  getUserPortfolioData(coachUserId: string): void {
    var portfolioData: any = [];

    this.getUserPortfolioDataSubscription = this.apiService
      .get(`/v1/userPortfolio?coachUserId=${coachUserId}`)
      .subscribe(data => {
        for (const key in data.payload) {
          if (data.payload[key].PortfolioGroupUsers.length < 1) {
            portfolioData.push({
              user: data.payload[key].name + " " + data.payload[key].lname,
              name: data.payload[key].name,
              lname: data.payload[key].lname,
              uID: data.payload[key].uID,
              company:
                data.payload[key].info && data.payload[key].info.comName
                  ? data.payload[key].info.comName
                  : null,
              Organization: data.payload[key].Role.Department.Organization,
              orgID: data.payload[key].Role.Department.Organization.orgID,
              roleName: data.payload[key].Role.roleName,
              Role: data.payload[key].Role,
              Department: data.payload[key].Role.Department.deptName,
              imgUrl:
                data.payload[key].info && data.payload[key].info.photo
                  ? environment.imgUrl + data.payload[key].info.photo
                  : null,
              info: data.payload[key].info,
              outcomeStatement: data.payload[key].statement,
              level: data.payload[key].Role.leval,
              depID: data.payload[key].Role.depID
            });
          }
        }
        this.userPortfolioUserDataSource.next(data.payload);
        this.userPortfolioDataSource.next(portfolioData);
      });
  }

  getPortfolioUserKpiData(uID: string, driverID: string): any {
    let data: any = null;
    var kpiMilestones: any = [];

    if (!uID) {
      return "uID required";
    }

    let url = "/v1/getUserKpiMilestones?uID=" + uID + "&driverID=" + driverID;

    this.getPortfolioUserKpiDataSubscription = this.apiService
      .get(url)
      .subscribe(
        response => {
          for (const key in response.kpis) {
            kpiMilestones.push({
              objective: response.kpis[key].objective,
              qty: response.kpis[key].qty,
              unit: response.kpis[key].unit,
              achieveQty: response.kpis[key].achieveQty,
              Milestones: response.kpis[key].Milestones,
              Driver: response.kpis[key].Driver,
              cinput: false,
              kpiID: response.kpis[key].kpiID
            });
          }
          this.portfolioUserKpiDataSource.next(kpiMilestones);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPortfolioUserKpiListData(uID: string, driverID: string): any {
    let data: any = null;
    var kpiMilestones: any = [];

    if (!uID) {
      return "uID required";
    }

    let url = "/v1/getUserKpiMilestones?uID=" + uID + "&driverID=" + driverID;

    this.getPortfolioUserKpiListDataSubscription = this.apiService
      .get(url)
      .subscribe(
        response => {
          for (const key in response.kpis) {
            kpiMilestones.push({
              objective: response.kpis[key].objective,
              qty: response.kpis[key].qty,
              unit: response.kpis[key].unit,
              achieveQty: response.kpis[key].achieveQty,
              Milestones: response.kpis[key].Milestones,
              Driver: response.kpis[key].Driver,
              cinput: false,
              kpiID: response.kpis[key].kpiID
            });
          }
          this.portfolioUserKpiListDataSource.next(kpiMilestones);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPortfolioUserMilestoneData(driverID, depID, uID, page): any {
    let url = "";
    var data: any = [];

    if (!uID) {
      return "uID required";
    }

    url = `/v1/getAllTask?driverID=${driverID}&uID=${uID}&page=dash`;

    this.getPortfolioUserMilestoneDataSubscription = this.apiService
      .get(url)
      .subscribe(
        response => {
          for (const key in response.mList) {
            let flag = false;
            if (response.uID) {
              if (response.uID !== response.mList[key].uID) {
                flag = true;
              }
            }
            data.push({
              achieveText: response.mList[key].achieveText,
              dueDate: response.mList[key].dueDate,
              User: response.mList[key].User,
              objective: response.mList[key].Kpi.objective,
              kpiID: response.mList[key].Kpi.kpiID,
              driverID: response.mList[key].Kpi.driverID,
              qty: response.mList[key].Kpi.qty,
              charpStatus: response.mList[key].charpStatus,
              mileID: response.mList[key].mileID,
              readOnly: flag
            });
          }
          this.portfolioUserMilestoneDataSource.next(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  setPortfolioUserRole(roleName: string): void {
    this.portfolioUserRoleDataSource.next(roleName);
  }

  setPortfolioUserDepartment(depID: string): void {
    this.portfolioUserDepId = depID;
    this.portfolioUserDepartmentDataSource.next(this.portfolioUserDepId);
  }

  setPortfolioUserLevel(level: string): void {
    this.portfolioUserLevel = level;
    this.portfolioUserLevelDataSource.next(this.portfolioUserLevel);
  }

  setPortfolioUser(uID: string): void {
    this.portfolioUser = uID;
    this.portfolioUserDataSource.next(this.portfolioUser);
  }

  setPortfolioUserOrganization(orgID: string): void {
    this.portfolioUserOrgId = orgID;
    this.portfolioUserOrganizationDataSource.next(this.portfolioUserOrgId);
  }

  setPortfolioViewClass(isPortfolio: boolean): void {
    this.portfolioViewClass = isPortfolio;
    this.portfolioViewClassDataSource.next(isPortfolio);
  }

  setCoachStatus(): void {
    this.isCoachDataSource.next(
      JSON.parse(this.dataService.getToken()).isCoach
    );
  }

  setIsCoachedStatus(): void {
    this.isCoachedDataSource.next(
      JSON.parse(this.dataService.getToken()).isCoached
    );
  }

  requestCoach(body: any): any {
    if (body) {
      this.requestCoachSubscription = this.apiService
        .post("/v1/requestCoach", body)
        .subscribe(response => {
          this.requestCoachDataSource.next(response);
        });
    }
  }

  postUserInvite(body: any): any {
    if (body) {
      this.postUserInviteSubscription = this.apiService
        .post("/v1/userInvite", body)
        .subscribe(response => {
          this.inviteUserDataSource.next(response);
        });
    }
  }

  getUserInvite(uID: string): any {
    if (uID) {
      this.getUserInviteSubscription = this.apiService
        .get(`/v1/userInvite?uID=${uID}`)
        .subscribe(response => {
          this.userInviteDataSource.next(response);
        });
    }
  }

  updateUserInvite(body: any): any {
    if (body) {
      this.updateUserInviteSubscription = this.apiService
        .put(`/v1/userInvite`, body)
        .subscribe(response => {
          this.updateUserInviteDataSource.next(response);
        });
    }
  }

  getUserActivity(uID: string): void {
    var data: any = [];
    if (uID) {
      this.getUserAcitivitySubscription = this.apiService
        .get(`/v1/userActivity?uID=${uID}`)
        .subscribe(response => {
          for (const key in response.payload) {
            data.push({
              x: response.payload[key].createdAt,
              y: response.payload[key].cnt
            });
          }
          this.userActivityDataSource.next(data);
        });
    }
  }

  getUserCoach(): void {
    var data: Object = {};

    data = {
      coachName: JSON.parse(this.dataService.getToken()).coachName,
      coachImg: JSON.parse(this.dataService.getToken()).coachImg
    };
    this.coachInfoDataSource.next(data);
  }

  postUserAssignment(body: Object): void {
    this.postUserAssignmentSubscription = this.apiService
      .post(`/v1/userAssignment`, body)
      .subscribe(response => {
        this.postUserAssignmentDataSource.next(response);
      });
  }

  postUserKpi(body: Object): void {
    this.postUserKpiSubscription = this.apiService
      .post("/v1/kpi", body)
      .subscribe(response => {
        this.postUserKpiDataSource.next(response);
      });
  }

  getUserAssignment(uID: string, driverID: string, source: string): void {
    var data: any = [];
    this.userAssignmentSubscription = this.apiService
      .get(`/v1/userAssignment?uID=${uID}&driverID=${driverID}`)
      .subscribe(response => {
        for (const key in response.payload) {
          data.push({
            ID: parseInt(key) + 1,
            userAssignmentId: response.payload[key].userAssignmentId,
            Type: response.payload[key].assignmentType,
            Assignment: response.payload[key].assignmentDisplayText,
            Status: response.payload[key].assignmentStatus,
            Url: response.payload[key].assignmentUrl
          });
        }
        this.getUserAssignmentDataSource.next(data);
      });
  }

  putUserAssignment(body: object): void {
    this.putUserAssignmentSubscription = this.apiService
      .put("/v1/userAssignment", body)
      .subscribe(response => {
        this.putUserResponseDataSource.next(response);
      });
  }

  setActiveUid(uID: string): void {
    this.activeUserIdDataSource.next(uID);
  }

  removePortfolioUser(body: object): void {
    this.removePortfolioUserSubscription = this.apiService
      .put("/v1/removePortfolioUser", body)
      .subscribe(response => {
        this.removePortfolioUserDataSource.next(response);
      });
  }

  submitFeatureRequest(body: object): void {
    this.submitFeatureRequestSubscription = this.apiService
      .post("/v1/featureRequest", body)
      .subscribe(response => {
        this.submitFeatureRequestDataSource.next(response);
      });
  }

  setUserPlusOne(uID: string): void {
    this.userPlusOneUser = uID;
    this.userPlusOneDataSource.next(uID);
  }

  postQuarterSplitBulk(body: any): void {
    this.postQuarterSplitBulkSubscription = this.apiService
      .post("/v1/quarterSplitBulk", body)
      .subscribe(response => {
        this.postQuarterSplitBulkDataSource.next(response);
      });
  }

  postUserDataAccess(body: any): void {
    this.postUserDataAccessSubscription = this.apiService
      .post("/v1/userDataAccess", body)
      .subscribe(response => {
        this.postUserDataAccessDataSource.next(response);
      });
  }

  putUserDataAccess(body: any): void {
    this.putUserDataAccessSubscription = this.apiService
      .put("/v1/userDataAccess", body)
      .subscribe(response => {
        this.putUserDataAccessDataSource.next(response);
      });
  }

  getUserDataAccess(uID: string): void {
    var data: any = [];

    this.getUserDataAccessSubscription = this.apiService
      .get(`/v1/userDataAccess?uID=${uID}`)
      .subscribe(response => {
        for (const k in response.payload) {
          // if (response.payload[k].accessStatus.toLowerCase()=='granted'){
          data.push({
            userDataAccessId: response.payload[k].userDataAccessId,
            name: response.payload[k].Grantee.name,
            lname: response.payload[k].Grantee.lname,
            uID: response.payload[k].Grantee.uID,
            status: response.payload[k].accessStatus
          });
          // }
        }
        this.getUserDataAccessDataSource.next(data);
      });
  }

  getKpiHistory(kpiID: any): void {
    this.getKpiHistorySubscription = this.apiService
      .get(`/v1/kpiHistory?kpiID=${kpiID}`)
      .subscribe(response => {
        let historyID: number = -1;

        // Find KPI index for history data
        if (response.payload[0]) {
          historyID = this.kpiMilestones.findIndex(kpi => {
            return kpi.kpiID == response.payload[0].kpiID;
          });
        }
        // If KPI is found, load data
        if (historyID != -1) {
          // Add data to correct KPI
          this.kpiMilestones[historyID].hxData = response.payload;
          // Bullet chart data
          let ranges = this.kpiMilestones[historyID].hxData[
            this.kpiMilestones[historyID].hxData.length - 1
          ].budgetAmount;
          let measures = this.kpiMilestones[historyID].hxData[
            this.kpiMilestones[historyID].hxData.length - 1
          ].actualAmount;

          this.kpiMilestones[historyID].bulletHx = [
            {
              title: this.kpiMilestones[historyID].objective,
              subtitle: this.kpiMilestones[historyID].isCorporateKpi
                ? "Corporate"
                : "",
              ranges: [ranges],
              measures: [measures],
              markers: [0]
            }
          ];
        }

        this.kpiHistoryDataSource.next(response.payload);
      });
  }

  postKpiHistory(report: any): void {
    this.postKpiHistorySubscription = this.apiService
      .post(`/v1/kpiHistory`, report)
      .subscribe(response => {
        this.postKpiHistoryDataSource.next(response.payload);
        this.getKpiHistory(report.kpiID);
      });
  }

  putKpiHistory(report: any): void {
    this.putKpiHistorySubscription = this.apiService
      .put(`/v1/kpiHistory`, report)
      .subscribe(response => {
        this.putKpiHistoryDataSource.next(response.payload);
        this.getKpiHistory(report.kpiID);
      });
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  destroySubscriptions(): void {
    this.getPortfolioUserAllDeptUsersSubscription
      ? this.getPortfolioUserAllDeptUsersSubscription.unsubscribe()
      : null;
    this.getUserPortfolioDataSubscription
      ? this.getUserPortfolioDataSubscription.unsubscribe()
      : null;
    this.putUserAssignmentSubscription
      ? this.putUserAssignmentSubscription.unsubscribe()
      : null;
    this.removePortfolioUserSubscription
      ? this.removePortfolioUserSubscription.unsubscribe()
      : null;
    this.userAssignmentSubscription
      ? this.userAssignmentSubscription.unsubscribe()
      : null;
    this.getActiveStateSubscription
      ? this.getActiveStateSubscription.unsubscribe()
      : null;
    this.updateQuarterStatusSubscription
      ? this.updateQuarterStatusSubscription.unsubscribe()
      : null;
    this.updateKpiCharpStatusSubscription
      ? this.updateKpiCharpStatusSubscription.unsubscribe()
      : null;
    this.updateMileCharpStatusSubscription
      ? this.updateMileCharpStatusSubscription.unsubscribe()
      : null;
    this.assignUsersSubscription
      ? this.assignUsersSubscription.unsubscribe()
      : null;
    this.assignKpiQuarterSubscription
      ? this.assignKpiQuarterSubscription.unsubscribe()
      : null;
    this.assignMileQuarterSubscription
      ? this.assignMileQuarterSubscription.unsubscribe()
      : null;
    this.updateMilestoneQuarterSubscription
      ? this.updateMilestoneQuarterSubscription.unsubscribe()
      : null;
    this.addActiveStateSubscription
      ? this.addActiveStateSubscription.unsubscribe()
      : null;
    this.addUserAnswerSubscription
      ? this.addUserAnswerSubscription.unsubscribe()
      : null;
    this.addUserRfpqAnswerSubscription
      ? this.addUserRfpqAnswerSubscription.unsubscribe()
      : null;
    this.deleteMilestoneSubscription
      ? this.deleteMilestoneSubscription.unsubscribe()
      : null;
    this.deleteKpiSubscription
      ? this.deleteKpiSubscription.unsubscribe()
      : null;
    this.addUserKpiSubscription
      ? this.addUserKpiSubscription.unsubscribe()
      : null;
    this.addUserMilestonesSubscription
      ? this.addUserMilestonesSubscription.unsubscribe()
      : null;
    this.addOutcomeStatementSubscription
      ? this.addOutcomeStatementSubscription.unsubscribe()
      : null;
    this.updateUserAnswerSubscription
      ? this.updateUserAnswerSubscription.unsubscribe()
      : null;
    this.removeUserAnswerSubscription
      ? this.removeUserAnswerSubscription.unsubscribe()
      : null;
    this.getSingleSubscription
      ? this.getSingleSubscription.unsubscribe()
      : null;
    this.getPortfolioUserKpiDataSubscription
      ? this.getPortfolioUserKpiDataSubscription.unsubscribe()
      : null;
    this.getPortfolioUserKpiListDataSubscription
      ? this.getPortfolioUserKpiListDataSubscription.unsubscribe()
      : null;
    this.getPortfolioUserMilestoneDataSubscription
      ? this.getPortfolioUserMilestoneDataSubscription.unsubscribe()
      : null;
    this.requestCoachSubscription
      ? this.requestCoachSubscription.unsubscribe()
      : null;
    this.postUserInviteSubscription
      ? this.postUserInviteSubscription.unsubscribe()
      : null;
    this.getUserInviteSubscription
      ? this.getUserInviteSubscription.unsubscribe()
      : null;
    this.updateUserInviteSubscription
      ? this.updateUserInviteSubscription.unsubscribe()
      : null;
    this.getUserAcitivitySubscription
      ? this.getUserAcitivitySubscription.unsubscribe()
      : null;
    this.postUserAssignmentSubscription
      ? this.postUserAssignmentSubscription.unsubscribe()
      : null;
    this.postUserKpiSubscription
      ? this.postUserKpiSubscription.unsubscribe()
      : null;
    this.getUserKpiDriverAllSubscription
      ? this.getUserKpiDriverAllSubscription.unsubscribe()
      : null;
    this.submitFeatureRequestSubscription
      ? this.submitFeatureRequestSubscription.unsubscribe()
      : null;
    this.postUserDataAccessSubscription
      ? this.postUserDataAccessSubscription.unsubscribe()
      : null;
    this.getUserDataAccessSubscription
      ? this.getUserDataAccessSubscription.unsubscribe()
      : null;
    this.putUserDataAccessSubscription
      ? this.putUserDataAccessSubscription.unsubscribe()
      : null;
    this.getKpiHistorySubscription
      ? this.getKpiHistorySubscription.unsubscribe()
      : null;
    this.postKpiHistorySubscription
      ? this.postKpiHistorySubscription.unsubscribe()
      : null;
    this.putKpiHistorySubscription
      ? this.putKpiHistorySubscription.unsubscribe()
      : null;
  }
}
