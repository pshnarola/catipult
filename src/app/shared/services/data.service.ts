
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { HttpServiceService } from 'src/app/core/http-service/http-service.service';
export interface User {
  email: any;
  password: any;
}
export class UserInfo implements User {
  constructor(
    public email: any,
    public password: any,
  ) {}
}

@Injectable()
export class SharedDataService {
  // Temporarily stores data from dialogs
  dialogData: any;
  bill: any = null;
  routeData: any = null;
  kpislist: any = null;
  statement: any = null;
  kpis: any = [];

  private routedataSource = new BehaviorSubject<any>(this.routeData);
  routeUrldata = this.routedataSource.asObservable();

  private billdataSource = new BehaviorSubject<any>(this.bill);
  billdata = this.billdataSource.asObservable();

  private kpislistdataSource = new BehaviorSubject<any>(this.kpislist);
  kpislistdata = this.kpislistdataSource.asObservable();

  private statementSource = new BehaviorSubject<any>(this.statement);
  statementdata = this.statementSource.asObservable();


  private kpisdataSource = new BehaviorSubject<any>(this.kpis);
  kpisdata = this.kpisdataSource.asObservable();

  constructor(private apiService: HttpServiceService) {}

  login(data){
    this.apiService.post('/v1/login',data).subscribe((response) =>{
      this.bill = response;
      });
  }

getUserInfo(): any{
  const token =  this.getToken();
  const v = JSON.parse(token);
  return v.name;
}

getUserDeptID():any {
  return JSON.parse(this.getToken()).depID;
}

getRoleInfo(): any{
  const token =  this.getToken();
  const v = JSON.parse(token);
  return v.roleAdmin;
}

getRole(): any{
  const token =  this.getToken();
  const v = JSON.parse(token);
  return v.role;
}

getToken():any {
  return sessionStorage.getItem('user');
}

getUserId():any {
  return JSON.parse(this.getToken()).uID;
}

getUserOrgId():any {
  return JSON.parse(this.getToken()).orgID;
}

getUserOrgName():string {
  return JSON.parse(this.getToken()).orgName;
}

getUserOrgImg():string {
  return JSON.parse(this.getToken()).companyImg;
}

removeToken():any {
  sessionStorage.removeItem('user');
}

getActiveState(): any {
  this.apiService.get(`/v1/getActivePage`).subscribe((response) => {
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

  }, (error) => {
    console.log(error);
  });
}
addActiveState (data: any): any {
  // console.log(order);
 // this.bill =[];
  this.apiService.post('/v1/registerOnboarding', data).subscribe((response) =>{
    console.log('added'+ response);
  },((error)=>{
    console.log(error);
  //  this.router.navigateByUrl('/account');
  }));
}

updateActiveState(data){
  this.apiService.put('/v1/updateActive',data).subscribe((response) =>{
   console.log('updateActive');
    });
}
getStatement(){
  this.apiService.get('/v1/getStatement').subscribe((response) =>{
    this.statement = response;
    this.statementSource.next(this.statement);
  });

}
resetKpi(){
  this.apiService.delete('/v1/resetUser').subscribe((response) =>{
   console.log('kpi Reset');
  });

}
addUserKpi (uAns: any): any {
  // console.log(order);
 // this.bill =[];
  this.apiService.post('/v1/kpi', uAns).subscribe((response) =>{
    console.log('added kpi'+ response);
  },((error)=>{
    console.log(error);
  //  this.router.navigateByUrl('/account');
  }));
}
updateUserKpi (kpi: any): any {
  // console.log(order);
 // this.bill =[];
  this.apiService.put('/v1/kpi', kpi).subscribe((response) =>{
    console.log('updated kpi'+ response);
  },((error)=>{
    console.log(error);
  //  this.router.navigateByUrl('/account');
  }));
}
getkpislist(driverID:any){
  this.apiService.get(`/v1/getKpiDriver?driverID=${driverID}`).subscribe((response) =>{
    this.kpislist = response;
    this.kpislistdataSource.next(this.kpislist);
  });
}
getKPIHistory(kpiID:any){
  this.apiService.get(`/v1/getkpihistoryV2?kpiID=${kpiID}`).subscribe((response) =>{
    this.kpis = response;
  });
}
postKPIHistory(kpiReport:any){
  this.apiService.post(`/v1/kpihistory`, kpiReport).subscribe((response) =>{
    console.log('created kpi report'+ response);
  },((error)=>{
    console.log(error);
  }));
}
putKPIHistory(kpiReport:any){
  this.apiService.put(`/v1/kpihistory`, kpiReport).subscribe((response) =>{
    console.log('updated kpi report'+ response);
  },((error)=>{
    console.log(error);
  }));
}
deleteKpi(kpiID:any){
  this.apiService.delete(`/v1/deletekpi?kpiID=${kpiID}`).subscribe((response) =>{
  console.log('deleted kpi');
  });
}
addKpi(kpi) {
  this.kpis.push(kpi);
}
}


