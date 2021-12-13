
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { HttpServiceService } from 'src/app/core/http-service/http-service.service';
import { SharedDataService } from 'src/app/shared/services/data.service'

@Injectable()
export class DataService {
  // Temporarily stores data from dialogs
  dialogData: any = null;
  qTypes: any = null;
  users: any = null;
  roles: any = null;
  qID: any = null;
  drivers: any = null;
  org: any = null;
  questionsList: any = null;
  flag: any = null;
  msg: any = null;
  qListSeq: any = null;
  qListSelected: any = null;
  status: any = null;
  deleteList: any = null;


  private qListSelecteddataSource = new BehaviorSubject<any>(this.qListSelected);
  qListSelecteddata = this.qListSelecteddataSource.asObservable();

  private deleteListdataSource = new BehaviorSubject<any>(this.deleteList);
  deleteListdata = this.deleteListdataSource.asObservable();

  private statusdataSource = new BehaviorSubject<any>(this.status);
  statusddata = this.statusdataSource.asObservable();

  private qIDdataSource = new BehaviorSubject<any>(this.qID);
  qIDdata = this.qIDdataSource.asObservable();

  private driversdataSource = new BehaviorSubject<any>(this.drivers);
  driversdata = this.driversdataSource.asObservable();

  private orgmsgdataSource = new BehaviorSubject<any>(this.msg);
  orgmsgdata = this.orgmsgdataSource.asObservable();


  private orgdataSource = new BehaviorSubject<any>(this.org);
  orgdata = this.orgdataSource.asObservable();

  private confirmdataSource = new BehaviorSubject<any>(this.flag);
  confirmdata = this.confirmdataSource.asObservable();

  private qTypedataSource = new BehaviorSubject<any>(this.qTypes);
  qTypedata = this.qTypedataSource.asObservable();

  private qListdataSource = new BehaviorSubject<any>(this.questionsList);
  qListdata = this.qListdataSource.asObservable();

  private qListSeqdataSource = new BehaviorSubject<any>(this.qListSeq);
  qListSeqdata = this.qListSeqdataSource.asObservable();

  private rolesdataSource = new BehaviorSubject<any>(this.roles);
  rolesdata = this.rolesdataSource.asObservable();

  private usersdataSource = new BehaviorSubject<any>(this.users);
  usersdata = this.usersdataSource.asObservable();



  constructor(private apiService: HttpServiceService, private dataService: SharedDataService) { }
  getUserInfo(): any {
    const token =  this.dataService.getToken();
    const v = JSON.parse(token);
    return v.name;
  }
  resetPush() {
    this.apiService.get(`/v1/resetPush`).subscribe((response) => {

      console.log('push notify reset..');
    });
  }
  getDrivers() {
    this.apiService.get('/v1/drivers').subscribe((response) => {

      this.drivers = [];
      // tslint:disable-next-line:forin
      for (const key in response.drivers) {
        this.drivers.push({
          driverID: response.drivers[key].driverID,
          driverName: response.drivers[key].driverName,
          driverImage: response.drivers[key].driverImage,
        });
      }
      this.driversdataSource.next(this.drivers);
    });
  }
  getAvailable(seqNo: any) {
    this.apiService.get(`/v1/getSeqNo?seqNo=${seqNo}`).subscribe((response) => {

      this.status = '';
      // tslint:disable-next-line:forin
      if(response){
        this.status = response.msg;
      }
      this.statusdataSource.next(this.status);
    });
  }
  getDeleteDepend(queID: any) {
    this.apiService.get(`/v1/getDeleteDepend?queID=${queID}`).subscribe((response) => {

      this.deleteList = [];
      // tslint:disable-next-line:forin
      for (const key in response.rfps) {
        this.deleteList.push({
          Question: response.rfps[key].Question,
        });
      }
      this.deleteListdataSource.next(this.deleteList);
    });
  }
  deleteOrg(orgID: any,email: any) {
    this.apiService.delete(`/v1/orgnization?orgID=${orgID}&email=${email}`).subscribe((response) => {

    console.log('deleted organization');
    });
  }
  getOrg() {
    this.apiService.get('/v1/orgnizationAll').subscribe((response) => {

      this.org = [];
      // tslint:disable-next-line:forin
      console.log(response);
      for (const key in response.Organizations) {
        this.org.push({
          orgID: response.Organizations[key].orgID,
          orgName: response.Organizations[key].orgName,
          email: response.Organizations[key].email,
          address: response.Organizations[key].address,
          startDate: response.Organizations[key].startDate,
          endDate: response.Organizations[key].endDate,
          isActive: response.Organizations[key].isActive,
        });
      }
      this.orgdataSource.next(this.org);
    });
  }
  confirmService(c: any){
    this.flag = c;
    console.log(this.flag);
    this.confirmdataSource.next(this.flag);
  }
  getQuestionsList(d:any) {
    this.apiService.get(`/v1/questions?driverID=${d}`).subscribe((response) => {

      this.questionsList = [];
      // tslint:disable-next-line:forin
      for (const key in response.sec) {
        this.questionsList.push({
          queID: response.sec[key].queID,
          question: response.sec[key].question,
          driverID: response.sec[key].driverID,
          Options: response.sec[key].Options,
          QuestionType: response.sec[key].QuestionType,
          qtID: response.sec[key].qtID,
          seqNo: response.sec[key].seqNo,
          QuestionTypetext: response.sec[key].QuestionType.typeName
        });
      }
      this.qListdataSource.next(this.questionsList);
    });
  }
  getQuestionListSelected(qID:any) {
    this.apiService.get(`/v1/getAllRfp?queID=${qID}`).subscribe((response) => {

      this.qListSelected = [];
      // tslint:disable-next-line:forin
      for (const key in response.rfps) {
        this.qListSelected.push({
          rfpID: response.rfps[key].rfpID,
          qSelectID: response.rfps[key].qSelectID,
          queID: response.rfps[key].queID,
        });
      }
      this.qListSelecteddataSource.next(this.qListSelected);
    });
  }

  getQuestionsListSeq(d: any, seqNo: any) {
    this.apiService.get(`/v1/questionsPrev?driverID=${d}&seqNo=${seqNo}`).subscribe((response) => {

      this.qListSeq = [];
      // tslint:disable-next-line:forin
      for (const key in response.sec) {
        this.qListSeq.push({
          queID: response.sec[key].queID,
          question: response.sec[key].question,
          driverID: response.sec[key].driverID,
          Options: response.sec[key].Options,
          QuestionType: response.sec[key].QuestionType,
          qtID: response.sec[key].qtID,
          seqNo: response.sec[key].seqNo,
          QuestionTypetext: response.sec[key].QuestionType.typeName,
          checked: false,
          rfpID: ''
        });
      }
      this.qListSeqdataSource.next(this.qListSeq);
    });
  }
  deleteQuestion(queID:any) {
    this.apiService.delete(`/v1/question?queID=${queID}`).subscribe((response) => {

     console.log("deleted");
    });
  }
  deleteRfpQuestion(rfpID:any) {
    this.apiService.delete(`/v1/deleteRfp?rfpID=${rfpID}`).subscribe((response) => {

     console.log("deleted");
    });
  }
  getQType() {
    this.apiService.get('/v1/questiontypes').subscribe((response) => {

      this.qTypes = [];
      // tslint:disable-next-line:forin
      for (const key in response.sec) {
        this.qTypes.push({
          qtID: response.sec[key].qtID,
          typeName: response.sec[key].typeName,
        });
      }
      this.qTypedataSource.next(this.qTypes);
    });
  }
  getRoles() {
    this.apiService.get('/v1/roleAll').subscribe((response) => {

      this.roles = [];
      // tslint:disable-next-line:forin
      for (const key in response.Roles) {
        this.roles.push({
          roleName: response.Roles[key].roleName,
          rID: response.Roles[key].rID,
          depID: response.Roles[key].depID,
          deptName: response.Roles[key].Department.deptName,
          leval: response.Roles[key].leval
        });
      }
      this.rolesdataSource.next(this.roles);
    });
  }
  addOrg (orgnization: any): any {
    // console.log(order);
   // this.bill =[];
    this.apiService.post('/v1/orgnization', orgnization).subscribe((response) =>{
      console.log('added'+ response);

      if(response.msg){
     this.orgmsgdataSource.next(response.msg);
     }

    },((error)=>{
      console.log(error);
    //  this.router.navigateByUrl('/account');
    }));
  }
  addRfpQuestion (rfp: any): any {
    // console.log(order);
   // this.bill =[];
    this.apiService.post('/v1/rfpI', rfp).subscribe((response) =>{
      console.log('added'+ response);
    },((error)=>{
      console.log(error);
    //  this.router.navigateByUrl('/account');
    }));
  }
  updateOrg (orgnization: any): any {
    // console.log(order);
   // this.bill =[];
    this.apiService.put('/v1/orgnization', orgnization).subscribe((response) =>{
      console.log('updated');
    },((error)=>{
      console.log(error);
    //  this.router.navigateByUrl('/account');
    }));
  }
  addQuestion (question: any): any {
    // console.log(order);
   // this.bill =[];
    this.apiService.post('/v1/question',question).subscribe((response) =>{
      console.log('added', response);
      const qID = response.q.queID;
      this.qIDdataSource.next(qID);

    },((error)=>{
      console.log(error);
    //  this.router.navigateByUrl('/account');
    }));
  }
  addRfp (rfp: any): any {
    // console.log(order);
   // this.bill =[];
    this.apiService.post('/v1/rfp',rfp).subscribe((response) =>{
      console.log('added', response);

    },((error)=>{
      console.log(error);
    //  this.router.navigateByUrl('/account');
    }));
  }
  updateQuestion (question: any): any {
    // console.log(order);
   // this.bill =[];
    this.apiService.put('/v1/question',question).subscribe((response) =>{
      console.log('updated');
    },((error)=>{
      console.log(error);
    //  this.router.navigateByUrl('/account');
    }));
  }

  getAllUsers(orgID: any) {
    console.log('enter');
    this.apiService.get('/v1/getUserAll?orgID=' + orgID).subscribe((response) => {
      console.log('doe');
      this.users = [];
      // tslint:disable-next-line:forin
      for (const key in response.users) {
        this.users.push({
          email: response.users[key].email,
          roleName: response.users[key].Role.roleName,
          leval: response.users[key].Role.leval
        });
      }
      this.usersdataSource.next(this.users);
    });
  }
  inviteUser(userInfo){
    this.apiService.post('/v1/invite',userInfo).subscribe((response) => {

      console.log(response);
    });
  }
}


