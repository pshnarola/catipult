import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service'

export interface User {
  email: any;
  password: any;
}

export class UserInfo implements User {
  constructor(public email: any, public password: any) {}
}

@Injectable()
export class DataService {

  postQuarterSplitBulkSubscription:Subscription;

  // Temporarily stores data from dialogs
  dialogData: any = null;
  bill: any = null;
  routeData: any = null;
  rfpOptions: any = null;
  kpislist: any = null;
  statement: any = null;
  kpis: any = [];
  private rfpOptionsdataSource = new BehaviorSubject<any>(this.rfpOptions);
  rfpOptionsdata = this.rfpOptionsdataSource.asObservable();

  public routedataSource = new BehaviorSubject<any>(this.routeData);
  routeUrldata = this.routedataSource.asObservable();

  private billdataSource = new BehaviorSubject<any>(this.bill);
  billdata = this.billdataSource.asObservable();

  private kpislistdataSource = new BehaviorSubject<any>(this.kpislist);
  kpislistdata = this.kpislistdataSource.asObservable();

  private statementSource = new BehaviorSubject<any>(this.statement);
  statementdata = this.statementSource.asObservable();

  private outcomeStatementDataSource = new Subject();
  outcomeStatementData = this.outcomeStatementDataSource.asObservable();

  private kpisdataSource = new BehaviorSubject<any>(this.kpis);
  kpisdata = this.kpisdataSource.asObservable();

  private postQuarterSplitBulkDataSource = new Subject();
  public postQuarterSplitBulkData = this.postQuarterSplitBulkDataSource.asObservable();

  constructor(private apiService: HttpServiceService, private dataService: SharedDataService) {}

  getAllRfpOptions(driverID: any): any {
    this.apiService
      .get(`/v1/getAllrfpoptionsDriver?driverID=${driverID}`)
      .subscribe(
        response => {
          this.rfpOptions = [];
          for (const key in response.uoptions) {
            this.rfpOptions.push({
              answer: response.uoptions[key].answer,
              question: response.uoptions[key].Question.question,
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

  login(data) {
    this.apiService.post("/v1/login", data).subscribe(response => {
      this.bill = response;
    });
  }

  getUserInfo(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    return v.name;
  }

  getRoleInfo(): any {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    return v.roleAdmin;
  }

  getUserUid(): string {
    const token = this.dataService.getToken();
    const v = JSON.parse(token);
    return v.uID;
  }

  destroyState(): any {
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
            driverID: response.pagecontents[key].PageContent.driverID
          });
        }
        // console.log(this.users);
        this.routedataSource.next(this.routeData);
      },
      error => {
      }
    );
  }

  addActiveState(data: any): Observable<any> {
    return this.apiService.post("/v1/registerOnboarding", data);
  }

  updateActiveState(data): Observable<any> {
    return this.apiService.put("/v1/updateActive", data);
  }

  getStatement() {
    this.apiService.get("/v1/getStatement").subscribe(response => {
      this.statement = response;
      this.statementSource.next(this.statement);
      this.outcomeStatementDataSource.next(this.statement);
    });
  }

  resetKpi() {
    this.apiService.delete("/v1/resetUser").subscribe(response => {
      console.log("kpi Reset");
    });
  }

  addUserKpi(uAns: any): Observable<any> {
    return this.apiService.post("/v1/kpi", uAns);
  }

  updateUserKpi(kpi: any): any {
    this.apiService.put("/v1/kpi", kpi).subscribe(
      response => {
        console.log("updated kpi" + response);
      },
      error => {
        console.log(error);
      }
    );
  }

  getkpislist(driverID: any) {
    this.apiService
      .get(`/v1/getKpiDriver?driverID=${driverID}`)
      .subscribe(response => {
        this.kpislist = response;
        this.kpislistdataSource.next(this.kpislist);
      });
  }
  deleteKpi(kpiID: any) {
    this.apiService
      .delete(`/v1/deletekpi?kpiID=${kpiID}`)
      .subscribe(response => {
        console.log("deleted kpi");
      });
  }
  addKpi(kpi) {
    this.kpis.push(kpi);
  }

  postQuarterSplitBulk(body:any):void {
    this.postQuarterSplitBulkSubscription = this.apiService.post("/v1/quarterSplitBulk", body).subscribe(response => {
      this.postQuarterSplitBulkDataSource.next(response);
    });
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions(): void {
    this.postQuarterSplitBulkSubscription ? this.postQuarterSplitBulkSubscription.unsubscribe() : null;
  }
}
