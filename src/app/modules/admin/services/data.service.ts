import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, Subject } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { environment } from "src/environments/environment";
import { SharedDataService } from 'src/app/shared/services/data.service';

@Injectable()
export class DataService {
  // Temporarily stores data from dialogs
  dialogData: any = null;
  qTypes: any = null;
  users: any = null;
  roles: any = null;
  levals: any = null;
  orgID: any = null;
  drivers: any = null;
  questionsList: any = null;
  dept: any = null;
  flag: any = null;
  deptCrateFlag: any = null;
  url = environment.imgUrl ? environment.imgUrl : "http://108.163.221.122:2004/";

  private deptFlagdataSource = new BehaviorSubject<any>(this.deptCrateFlag);
  deptFlagdata = this.deptFlagdataSource.asObservable();

  private levalsdataSource = new BehaviorSubject<any>(this.levals);
  levalsdata = this.levalsdataSource.asObservable();

  private driversdataSource = new BehaviorSubject<any>(this.drivers);
  driversdata = this.driversdataSource.asObservable();

  private orgIDdataSource = new BehaviorSubject<any>(this.orgID);
  orgIDdata = this.orgIDdataSource.asObservable();

  private deptdataSource = new BehaviorSubject<any>(this.dept);
  deptdata = this.deptdataSource.asObservable();

  private confirmdataSource = new BehaviorSubject<any>(this.flag);
  confirmdata = this.confirmdataSource.asObservable();

  private qTypedataSource = new BehaviorSubject<any>(this.qTypes);
  qTypedata = this.qTypedataSource.asObservable();

  private qListdataSource = new BehaviorSubject<any>(this.questionsList);
  qListdata = this.qListdataSource.asObservable();

  private rolesdataSource = new BehaviorSubject<any>(this.roles);
  rolesdata = this.rolesdataSource.asObservable();

  private roleDataSource = new Subject();
  roleData = this.roleDataSource.asObservable();

  private usersdataSource = new BehaviorSubject<any>(this.users);
  usersdata = this.usersdataSource.asObservable();

  private userDataSource = new Subject();
  userData = this.userDataSource.asObservable();

  constructor(private apiService: HttpServiceService, private dataService: SharedDataService) {}
  getPhoto(): any {
    // const token = sessionStorage.getItem("user");
    const v = JSON.parse(this.dataService.getToken());
    this.url = environment.imgUrl
      ? environment.imgUrl
      : "http://108.163.221.122:2004/";
    if (v.img) {
      this.url = this.url + v.img;
      console.log(this.url);
    } else {
      this.url = "assets/img.jpg";
    }
    return this.url;
  }
  getRole(): any {
    const v = JSON.parse(this.dataService.getToken());
    return v.roleAdmin;
  }
  getUserInfo(): any {
    const v = JSON.parse(this.dataService.getToken());
    return v.name;
  }

  getOrgId(): any {
    const v = JSON.parse(this.dataService.getToken());
    return v.orgID;
  }

  getUid(): any {
    const v = JSON.parse(this.dataService.getToken());
    return v.uID;
  }
  
  resetKpi() {
    this.apiService.delete("/v1/resetUser").subscribe(response => {
      console.log("kpi Reset");
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
          driverImage: response.drivers[key].driverImage
        });
      }
      this.driversdataSource.next(this.drivers);
    });
  }
  confirmService(c: any) {
    this.flag = c;
    console.log(this.flag);
    this.confirmdataSource.next(this.flag);
  }
  orgFetch() {
    const v = JSON.parse(this.dataService.getToken());
    const orgID = v.orgID;
    this.orgIDdataSource.next(orgID);
  }
  getQuestionsList(d: any) {
    this.apiService.get(`/v1/questions?driverID=${d}`).subscribe(response => {
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
  deleteQuestion(queID: any) {
    this.apiService
      .delete(`/v1/question?queID=${queID}`)
      .subscribe(response => {
        console.log("deleted");
      });
  }
  getQType() {
    this.apiService.get("/v1/questiontypes").subscribe(response => {
      this.qTypes = [];
      // tslint:disable-next-line:forin
      for (const key in response.sec) {
        this.qTypes.push({
          qtID: response.sec[key].qtID,
          typeName: response.sec[key].typeName
        });
      }
      this.qTypedataSource.next(this.qTypes);
    });
  }
  getLevals() {
    this.apiService.get("/v1/getAllLevals").subscribe(response => {
      this.levals = [];
      // tslint:disable-next-line:forin
      for (const key in response.levals) {
        this.levals.push({
          levalID: response.levals[key].levalID,
          levalName: response.levals[key].levalName,
          levalNo: response.levals[key].levalNo
        });
      }
      this.levalsdataSource.next(this.levals);
    });
  }

  getRoles() {
    this.apiService.get("/v1/roleAll").subscribe(response => {
      this.roles = [];
      // tslint:disable-next-line:forin
      for (const key in response.Roles) {
        this.roles.push({
          roleName: response.Roles[key].roleName,
          rID: response.Roles[key].rID,
          depID: response.Roles[key].depID,
          deptName: response.Roles[key].Department ? response.Roles[key].Department.deptName ? response.Roles[key].Department.deptName : '' : '',
          leval: response.Roles[key].leval
        });
      }
      this.rolesdataSource.next(this.roles);
    });
  }

  addQuestion(question: any): any {

    this.apiService.post("/v1/question", question).subscribe(
      response => {
        console.log("added");
      },
      error => {
        console.log(error);
      }
    );
  }

  addRole(role: any): any {

    this.apiService.post("/v1/role", role).subscribe(
      response => {
        console.log("added");
        if (response.msg === "Role Allready exists") {
          this.deptFlagdataSource.next(true);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addDept(dept: any): any {

    this.apiService.post("/v1/department", dept).subscribe(
      response => {
        console.log("added");
        if (response.msg === "Department already exists") {
          this.deptFlagdataSource.next(true);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  updateQuestion(question: any): any {

    this.apiService.put("/v1/question", question).subscribe(
      response => {
        console.log("updated");
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllUsers(orgID: any) {
    this.apiService.get("/v1/getUserAll?orgID=" + orgID).subscribe(response => {
      this.users = [];
    // tslint:disable-next-line:forin
      for (const key in response.users) {
        if (response.users[key].Role) {
          this.users.push({
            email: response.users[key].email,
            roleName: response.users[key].Role.roleName,
            leval: response.users[key].Role.leval,
            uId: response.users[key].uID,
            name: response.users[key].name,
            lname: response.users[key].lname,
            deptName: response.users[key].Role.Department.deptName ? response.users[key].Role.Department.deptName : ""
          });
        }
      }
      this.usersdataSource.next(this.users);
      this.userDataSource.next(this.users);
    });
  }
  getAllDept(orgID: any) {
    this.apiService
      .get("/v1/getAllDeptOrg?orgID=" + orgID)
      .subscribe(response => {
        this.dept = [];
        // tslint:disable-next-line:forin
        for (const key in response.Departments) {
          this.dept.push({
            depID: response.Departments[key].depID,
            deptName: response.Departments[key].deptName
          });
        }
        this.deptdataSource.next(this.dept);
      });
  }
  getAllDeptRole(rID) {
    this.apiService
      .get("/v1/getAllDeptRole?deptID=" + rID)
      .subscribe(response => {
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
        this.roleDataSource.next(this.roles);
      });
  }

  updateDept(dept) {
    this.apiService.put("/v1/department", dept).subscribe(response => {
      console.log(response);
    });
  }
  updateRole(role) {
    this.apiService.put("/v1/role", role).subscribe(response => {
      console.log(response);
    });
  }
  deleteDeptRole(depID: any) {
    this.apiService
      .delete("/v1/deleteDept?depID=" + depID)
      .subscribe(response => {
        console.log(response);
      });
  }
  deleteRole(rID: any) {
    this.apiService.delete("/v1/deleteRole?rID=" + rID).subscribe(response => {
      console.log(response);
    });
  }
  async deleteUser(uID: any) {
    const v = await this.apiService
      .deletePromise("/v1/deleteUser?uID=" + uID)
      .then(
        data => {
          return data;
        },
        error => {
          return error;
        }
      );
    return v;
  }
  inviteUser(userInfo) {
    this.apiService.post("/v1/invite", userInfo).subscribe(response => {
      console.log(response);
    });
  }
}
