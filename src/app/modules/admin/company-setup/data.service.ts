import { Injectable,OnDestroy } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

import { Subject, BehaviorSubject, throwError, Observable, Subscription } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service'

export class CompanyDataService implements OnDestroy {

  constructor (private http: HttpClient, private apiService: HttpServiceService, private dataService: SharedDataService) {}

  dataSubscription:Subscription[] = [];

  data:any = {
    position: "Chief Executive Officer",
    name: 'Karen Smith',
    department: "Admin",
    children: [
      {
        position: "Chief Financial Officer",
        name: 'TestUser9',
        department: "Finance"
      },
      {
        position: "Chief Operations Officer",
        name: 'TestUser1',
        department: "Engineering",
        children: [
          {
            position: "EVP, Operations",
            name: 'TestUser2',
            children: [{
                position: 'VP, Operations',
                name: 'TestUser3'
            }]
          },
        ]
      },
      {
          position: "Chief Revenue Officer",
          name: 'TestUser4',
          department: "Marketing",
          children: [{
              position: "Vice President, Marketing",
              name:'TestUser5',
              department: "Marketing",
              children: [{
                  position: "Director, Marketing",
                  name:'TestUser6',
                  department: "Marketing",
                  children: [{
                      position: "Senior Manager, Marketing",
                      name:'TestUser7',
                      department: "Marketing",
                      children: [{
                          position: "Manager, Marketing",
                          name:'TestUser8',
                          department: "Marketing"
                      }]
                  }]
              }]
          }]
      }
    ]
  };

  private orgHierarchyDataSource = new Subject();
  public orgHierarchyData = this.orgHierarchyDataSource.asObservable();

  private orgCompleteDataSource = new Subject();
  public orgCompleteData = this.orgCompleteDataSource.asObservable();

  private organizationalDataSource = new Subject();
  public organizationalData = this.organizationalDataSource.asObservable();

  private putOrganizationDataSource = new Subject();
  public putOrganizationData = this.putOrganizationDataSource.asObservable();

  private postDepartmentDataSource = new Subject();
  public postDepartmentData = this.postDepartmentDataSource.asObservable();

  private putDepartmentDataSource = new Subject();
  public putDepartmentData = this.putDepartmentDataSource.asObservable();

  private postRoleDataSource = new Subject();
  public postRoleData = this.postRoleDataSource.asObservable();

  private putRoleDataSource = new Subject();
  public putRoleData = this.putRoleDataSource.asObservable();

  private postUserDataSource = new Subject();
  public postUserData = this.postUserDataSource.asObservable();

  private putUserDataSource = new Subject();
  public putUserData = this.putUserDataSource.asObservable();

  private deleteDepartmentDataSource = new Subject();
  public deleteDepartmentData = this.deleteDepartmentDataSource.asObservable();

  private deleteRoleDataSource = new Subject();
  public deleteRoleData = this.deleteRoleDataSource.asObservable();

  private deleteUserDataSource = new Subject();
  public deleteUserData = this.deleteUserDataSource.asObservable();

  getOrgHierarchyData(orgID:string):void {
      this.orgHierarchyDataSource.next(this.data);
  }

  getOrganizationComplete(orgID:string):void {
    
    var data:any = [];

    this.dataSubscription.push(this.apiService.get(`/v1/organizationComplete?orgID=${orgID}`).subscribe(response => {
      for (const key in response.payload[0]) {
        if (key == 'Departments'){
          for (const x in response.payload[0].Departments){
            for (const y in response.payload[0].Departments[x]){
              if (y == 'Roles'){
                if (response.payload[0][key][x][y].length<1){
                  data.push({
                    Organization: response.payload[0].orgName,
                    Department: response.payload[0][key][x].deptName,
                    Role: null,
                    uID: null,
                    First: null,
                    Last: null,
                    Email: null,
                    "Reports to": null
                  });
                }
                for (const z in response.payload[0][key][x][y]){
                  for (const a in response.payload[0][key][x][y][z]){
                    if (a == 'Users'){
                      if (response.payload[0][key][x][y][z][a].length<1){
                        data.push({
                          Organization: response.payload[0].orgName,
                          Department: response.payload[0][key][x].deptName,
                          Role: response.payload[0][key][x][y][z].roleName,
                          uID: null,
                          First: null,
                          Last: null,
                          Email: null,
                          "Reports to": null
                        });
                      }
                      for (const b in response.payload[0][key][x][y][z][a]){
                        data.push({
                          Organization: response.payload[0].orgName,
                          Department: response.payload[0][key][x].deptName,
                          Role: response.payload[0][key][x][y][z].roleName,
                          uID: response.payload[0][key][x][y][z][a][b].uID,
                          First: response.payload[0][key][x][y][z][a][b].name,
                          Last: response.payload[0][key][x][y][z][a][b].lname,
                          Email: response.payload[0][key][x][y][z][a][b].email,
                          "Reports to": response.payload[0][key][x][y][z][a][b].Manager ? response.payload[0][key][x][y][z][a][b].Manager.name + ' ' + response.payload[0][key][x][y][z][a][b].Manager.lname : null
                        });
                      }
                    }
                  }
                }
              }  
            }
          }
        }
      }
      this.orgCompleteDataSource.next(data);
      this.organizationalDataSource.next(response.payload[0]);
    }));
  }

  putOrganization(body:any): any {
    this.dataSubscription.push(this.apiService.put("/v1/organization", body).subscribe(response => {
      this.putOrganizationDataSource.next(response);
    }));
  }
  
  postDepartment(body:any): any {
    this.dataSubscription.push(this.apiService.post("/v1/department", body).subscribe(response => {
      this.postDepartmentDataSource.next(response);
    }));
  }

  putDepartment(body:any): any {
    this.dataSubscription.push(this.apiService.put("/v1/department", body).subscribe(response => {
      this.putDepartmentDataSource.next(response);
    }));
  }

  postRole(body:any): any {
    this.dataSubscription.push(this.apiService.post("/v1/role", body).subscribe(response => {
      this.postRoleDataSource.next(response);
    }));
  }

  putRole(body:any): any {
    this.dataSubscription.push(this.apiService.put("/v1/role", body).subscribe(response => {
      this.putRoleDataSource.next(response);
    }));
  }

  postUser(body:any): any {
    this.dataSubscription.push(this.apiService.post("/v1/invite", body).subscribe(response => {
      this.postUserDataSource.next(response);
    }));
  }

  putUser(body:any): any {
    this.dataSubscription.push(this.apiService.put("/v1/user", body).subscribe(response => {
      this.putUserDataSource.next(response);
    }));
  }

  deleteDepartment(depID:string): void{
    this.dataSubscription.push(this.apiService.delete(`/v1/deleteDept?depID=${depID}`).subscribe(response=>{
      this.deleteDepartmentDataSource.next(response);
    }));
  }

  deleteRole(rID:string): void{
    this.dataSubscription.push(this.apiService.delete(`/v1/deleteRole?rID=${rID}`).subscribe(response=>{
      this.deleteRoleDataSource.next(response);
    }));
  }

  deleteUser(uID:string): void{
    this.dataSubscription.push(this.apiService.delete(`/v1/user?uID=${uID}`).subscribe(response=>{
      this.deleteUserDataSource.next(response);
    }));
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.dataSubscription.forEach(s=>s.unsubscribe());
  }
}