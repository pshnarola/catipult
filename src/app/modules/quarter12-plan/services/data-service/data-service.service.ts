import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

import { BehaviorSubject, throwError, Observable, Subject, Subscription } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service'

import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { catchError } from "rxjs/operators";
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

  getOutcomeStatementSubscription:Subscription;
  putUserAnswerSubscription:Subscription;

  qBank: QBank[] = [];
  kpiMilestones: any = '';
  deptUsers: any = '';
  quarterList: any = '';
  mileStoneAll: any = '';
  kpiListAll: any = '';
  rfpOptions: any = '';
  routeData: any = '';
  routeData1: any = '';
  uAns: any = '';
  drivers: any = '';
  kpislist: any = '';
  userAns: any = '';
  outcomeStatment:string = '';

  private kpislistdataSource = new BehaviorSubject<any>(this.kpislist);
  kpilistdata = this.kpislistdataSource.asObservable();

  private userAnsdataSource = new BehaviorSubject<any>(this.userAns);
  userAnsdata = this.userAnsdataSource.asObservable();

  private driversdataSource = new BehaviorSubject<any>(this.drivers);
  driversdata = this.driversdataSource.asObservable();

  public qBankdataSource = new BehaviorSubject<any>(this.qBank);
  qBankdata = this.qBankdataSource.asObservable();

  private quarterListdataSource = new BehaviorSubject<any>(this.quarterList);
  quarterListdata = this.quarterListdataSource.asObservable();

  private kpiListdataSource = new BehaviorSubject<any>(this.kpiListAll);
  kpiListdata = this.kpiListdataSource.asObservable();

  private dUsersdataSource = new BehaviorSubject<any>(this.deptUsers);
  detpUsersdata = this.dUsersdataSource.asObservable();

  private mileDataSource = new BehaviorSubject<any>(this.mileStoneAll);
  mileAlldata = this.mileDataSource.asObservable();

  private mileStonedataSource = new BehaviorSubject<any>(this.kpiMilestones);
  milestonedata = this.mileStonedataSource.asObservable();

  public routedataSource = new BehaviorSubject<any>(this.routeData);
  routeUrldata = this.routedataSource.asObservable();

  private routedataSource1 = new BehaviorSubject<any>(this.routeData1);
  routeUrldata1 = this.routedataSource1.asObservable();

  private rfpOptionsdataSource = new BehaviorSubject<any>(this.rfpOptions);
  rfpOptionsdata = this.rfpOptionsdataSource.asObservable();

  private outcomeStatementDataSource = new Subject();
  outcomeStatmentData = this.outcomeStatementDataSource.asObservable();

  constructor(
    private http: HttpClient, private apiService: HttpServiceService, private dataService: SharedDataService
  ) {}

  getOutcomeStatment():void {
    this.getOutcomeStatementSubscription = this.apiService.get(`/v1/getStatement`).subscribe(response => {
      this.outcomeStatementDataSource.next(response.s.statement);
    });
  }

  registerDevice(data: any) {
    this.apiService.post("/v1/registerDevice", data).subscribe(response => {
    });
  }
  getkpislist() {
    this.apiService.get(`/v1/getUserKpi`).subscribe(response => {
      this.kpislist = response;
      this.kpislistdataSource.next(this.kpislist);
    });
  }
  getkpislist1(driverID: any) {
    this.apiService
      .get(`/v1/getKpiDriver?driverID=${driverID}`)
      .subscribe(response => {
        this.kpislist = response;
        this.kpislistdataSource.next(this.kpislist);
      });
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
          driverVideo: response.drivers[key].driverVideo,
          seqNo: response.drivers[key].seqNo
        });
      }
      this.driversdataSource.next(this.drivers);
    });
  }

  getAllUserAns(): any {
    this.apiService.get(`/v1/getUserAns`).subscribe(
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
      }
    );
  }
  /** CRUD METHODS */
  getAllItems(type: any): void {
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
        for (const key in response.userAnswer) {
          for (const qkey in this.qBank) {
            if (this.qBank[qkey].queID === response.userAnswer[key].queID) {
              if (this.qBank[qkey].QuestionType.typeName === "Single Choice") {
                this.qBank[qkey].Options.forEach(element => {
                  if (element.optionID === response.userAnswer[key].optionID) {
                    element.correctAns = true;
                  }
                });
              } else {
                this.qBank[qkey].desc = response.userAnswer[key].answer;
                this.qBank[qkey].Options.forEach(element => {
                  if (element.optionID === response.userAnswer[key].optionID) {
                    element.correctAns = true;
                  }
                });
              }
              this.qBank[qkey].answer = true;
            }
          }
        }
        this.qBankdataSource.next(this.qBank);
      },
      error => {
      }
    );
  }

  updateMilestone(data) {
    this.apiService.put("/v1/milesstone", data).subscribe(response => {
    });
  }

  getQuarterList(): any {
    this.apiService.get(`/v1/quartersplit`).subscribe(
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
      },
      error => {
      }
    );
  }
  getDeptUsers(): any {
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
        this.dUsersdataSource.next(this.deptUsers);
      },
      error => {
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
            question: response.uoptions[key].Question.question,
            queID: response.uoptions[key].queID
          });
        }
        this.rfpOptionsdataSource.next(this.rfpOptions);
      },
      error => {
      }
    );
  }

  getUserInfo(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    return v.name;
  }
  destroyRouteData(): any {
    this.routeData = [];
    this.routedataSource.next(this.routeData);
  }
  getActiveState(): any {
    this.apiService.get(`/v1/getActivePage`).subscribe(
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
        this.routedataSource.next(this.routeData);
      },
      error => {
      }
    );
  }
  getActiveState1(): any {
    this.apiService.get(`/v1/getActivePage`).subscribe(
      response => {
        this.routeData1 = [];
        for (const key in response.pagecontents) {
          this.routeData1.push({
            route: response.pagecontents[key].PageContent.routers,
            nextRoute: response.pagecontents[key].PageContent.nextRoute,
            nextPage: response.pagecontents[key].PageContent.nextPage,
            driverImage:
              response.pagecontents[key].PageContent.Driver.driverImage,
            driverID: response.pagecontents[key].PageContent.driverID
          });
        }
        this.routedataSource1.next(this.routeData1);
      },
      error => {
      }
    );
  }

  getKpiMilestone(): any {
    this.apiService.get(`/v1/milesstoneKpiAll`).subscribe(
      response => {
        this.kpiMilestones = [];
        for (const key in response.kpis) {
          let mileStones = [];
          this.kpiMilestones.push({
            objective: response.kpis[key].objective,
            qty: response.kpis[key].qty,
            Milestones: response.kpis[key].Milestones,
            Driver: response.kpis[key].Driver,
            cinput: false,
            unit: response.kpis[key].unit,
            kpiID: response.kpis[key].kpiID
          });
        }
        this.mileStonedataSource.next(this.kpiMilestones);
      },
      error => {
      }
    );
  }
  getMilestoneAll(type): any {
    this.apiService.get(`/v1/milesstoneAll`).subscribe(
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
                driverID: response.milesstones[key].Kpi
                  ? response.milesstones[key].Kpi.Driver.driverID
                  : "",
                kpiID: response.milesstones[key].kpiID,
                driverImage: response.milesstones[key].Kpi
                  ? response.milesstones[key].Kpi.Driver.driverImage
                  : "",
                startDate:
                  response.milesstones[key].QuarterKpiAssigns[0].QuarterSplit
                    .startDate,
                endDate:
                  response.milesstones[key].QuarterKpiAssigns[0].QuarterSplit
                    .endDate,
                quarterType:
                  response.milesstones[key].QuarterKpiAssigns[0].QuarterSplit
                    .type,
                assignName: ""
              });
            } else {
              // milesstones[""0""].Kpi.Driver.driverImage
              this.mileStoneAll.push({
                driverImage: response.milesstones[key].Kpi
                  ? response.milesstones[key].Kpi.Driver.driverImage
                  : "",
                objective: response.milesstones[key].achieveText,
                type: response.milesstones[key].type,
                qty: response.milesstones[key].qty,
                mileID: response.milesstones[key].mileID,
                kpiID: response.milesstones[key].kpiID,
                assignName: ""
              });
            }
          }
        }
        this.mileDataSource.next(this.mileStoneAll);
      },
      error => {
      }
    );
  }
  getUserKpiAll(): any {
    this.apiService.get(`/v1/getUserKpi`).subscribe(
      response => {
        this.kpiListAll = [];
        for (const key in response.kpis) {
          this.kpiListAll.push({
            objective: response.kpis[key].objective,
            type: response.kpis[key].type,
            qty: response.kpis[key].qty,
            kpiID: response.kpis[key].kpiID
          });
        }
        this.kpiListdataSource.next(this.kpiListAll);
      },
      error => {
      }
    );
  }
  addMilestone(data) {
    this.apiService.post("/v1/milesstone", data).subscribe(response => {
    });
  }
  
  updateActiveState(data: any): Observable<any> {
    return this.apiService.put("/v1/updateActive", data);
  }

  assignUsers(data) {
    this.apiService.post("/v1/registerAssignMile", data).subscribe(response => {
    });
  }
  assignTaskSelf() {
    this.apiService.get("/v1/registerAssignMileSelf").subscribe(response => {
    });
  }
  assignKpiQuarter(data) {
    this.apiService.post("/v1/registerKpi", data).subscribe(response => {
    });
  }
  addActiveState(data: any): any {
    // this.bill =[];
    this.apiService.post("/v1/registerOnboarding", data).subscribe(
      response => {
      },
      error => {
        //  this.router.navigateByUrl('/account');
      }
    );
  }
  addUserAns(uAns: any): any {
    this.apiService.post("/v1/registerAnsUser", uAns).subscribe(
      response => {
      },
      error => {
      }
    );
  }
  addUserRfpqAns(uAns: any, driverID: any): any {
    this.apiService.post("/v1/registerAnsrfpqUser", uAns).subscribe(
      response => {
        const p = response.q;
        // this.addUserKpi({
        //   objective: response.q.answer,
        //   driverID
        // });
      },
      error => {
      }
    );
  }

  addUserKpi(uAns: any): any {
    // this.bill =[];
    this.apiService.post("/v1/kpi", uAns).subscribe(
      response => {
      },
      error => {
        //  this.router.navigateByUrl('/account');
      }
    );
  }
  addUserMileStones(m: any): any {
    // this.bill =[];
    this.apiService.post("/v1/registerMileBulk", m).subscribe(
      response => {
      },
      error => {
        //  this.router.navigateByUrl('/account');
      }
    );
  }
  addOutcomeStatement(s: any): any {
    // this.bill =[];
    this.apiService.put("/v1/registerOutcome", s).subscribe(
      response => {
        return response;
      },
      error => {
        return error;
        //  this.router.navigateByUrl('/account');
      }
    );
  }

  updateUserAns(uAns: any): any {
    this.apiService.put("/v1/updateAnsUser", uAns).subscribe(
      response => {
      },
      error => {
      }
    );
  }
  rmoveUserAns(optionID: any): any {
    this.apiService.delete(`/v1/removeAnsUser?optionID=${optionID}`).subscribe(
      response => {
      },
      error => {
      }
    );
  }

  putUserAnswer(body:object):void {
    this.putUserAnswerSubscription = this.apiService.put(`/v1/userAnswer`,body).subscribe(response => {
    });
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.getOutcomeStatementSubscription ? this.getOutcomeStatementSubscription.unsubscribe() : null;
    this.putUserAnswerSubscription ? this.putUserAnswerSubscription.unsubscribe() : null;
  }
}
