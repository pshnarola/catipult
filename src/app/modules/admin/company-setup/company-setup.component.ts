import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { CompanyDataService } from './data.service';
import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';
import { expandableTableRowAnimation } from 'src/app/shared/animations/exports.animation';
import { SharedDataService } from 'src/app/shared/services/data.service'

import * as notification from 'src/app/shared/libraries/exports.library';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.scss'],
  animations: [ expandableTableRowAnimation ]
})

export class CompanySetupComponent implements OnInit {

  modalRef: BsModalRef;

  orgCompleteDataSubscription:Subscription;
  organizationalDataSubscription:Subscription;
  newDepartmentSubscription:Subscription;
  newRoleSubscription:Subscription;
  newUserSubscription:Subscription;
  editDepartmentSubscription:Subscription;
  editRoleSubscription:Subscription;
  editUserSubscription:Subscription;
  editOrgSubscription:Subscription;
  deleteDepartmentSubscription:Subscription;
  deleteRoleSubscription:Subscription;
  deleteUserSubscription:Subscription;

  userRole: any;

  roleHasUser:boolean = false;

  deleteText:string = null;
  deleteElementType:string = null;
  deptDeleteDeptId:string = null;
  roleDeleteRoleId:string = null;
  userDeleteUserId:string = null;

  orgName:string;
  orgId:string;
  newElement:string;

  orgEditOrgId:string;
  orgEditOrgName:string;
  orgEditAddress:string;
  orgEditCity:string;
  orgEditLogoUrl:string;
  orgEditEmail:string;
  orgEditPhoneNumber:number;
  orgEditMission:string;
  orgEditVision:string;
  orgEditValues:string;
  orgEditOutcomeStatement:string;

  deptNewDepartmentName:string;
  deptNewOrganizationId:string;
  deptEditDepartmentName:string;
  deptEditDepartmentId:string;

  roleNewRoleName:string;
  roleNewLevel:string;
  roleNewDepartmentId:string;
  roleEditRoleId:string;
  roleEditRoleName:string;
  roleEditRoleLevel:string;

  userNewRoleId:string;
  userNewEmail:string;
  userNewName:string;
  userNewLName:string;
  userNewManagerUserId:string;
  userEditRoleId:string;
  userEditRoleName:string;
  userEditUserId:string;
  userEditManagerUserId:string;
  userEditDepId:string;

  departmentColumns:any = ['Department','Role','First','Last','Email','Reports to'];
  departmentData:any;
  orgData:any;
  roleList:any;
  orgUserList:any;
  orgUserListSupervisor:any;
  userEditUserList:any=[];
  departmentList:any=[];

  constructor(private dataService: CompanyDataService, private dataServiceService: DataServiceService, private modalService: BsModalService, private sharedDataService: SharedDataService) { }
 
  ngOnInit() {
    this.setSubscriptions();
    this.userRole = this.dataServiceService.getRole().toLowerCase();
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  setSubscriptions():void {

    this.organizationalDataSubscription = this.dataService.organizationalData.subscribe((data:any)=>{
      this.orgName = data.orgName;
      this.orgEditOrgId = data.orgID;
      this.orgEditAddress = data.address;
      this.orgEditCity = data.city;
      this.orgEditEmail = data.email;
      this.orgEditLogoUrl = data.logoUrl;
      this.orgEditOrgName = data.orgName;
      this.orgData = data.Departments.sort((a,b)=>a.deptName.localeCompare(b.deptName));
      this.orgEditPhoneNumber = data.phoneNumber;
      this.orgEditMission = data.mission;
      this.orgEditVision = data.vision;
      this.orgEditValues = data.values;
      this.orgEditOutcomeStatement = data.outcomeStatement;
      this.deptNewOrganizationId = data.orgID;
      Object.keys(data.Departments).forEach(i=>{
        this.departmentList.push({
          depID: data.Departments[i].depID,
          deptName: data.Departments[i].deptName
        })
      })
      this.departmentList.sort((a,b)=>a.deptName.localeCompare(b.deptName));
    });

    this.orgCompleteDataSubscription = this.dataService.orgCompleteData.subscribe((data:any)=>{
      this.orgUserList = this.getUserList(data);
    })

    this.dataService.getOrganizationComplete(JSON.parse(this.sharedDataService.getToken()).orgID);
  }

  destroySubscriptions():void {
    this.orgCompleteDataSubscription ? this.orgCompleteDataSubscription.unsubscribe() : null;
    this.organizationalDataSubscription ? this.organizationalDataSubscription.unsubscribe() : null;
    this.newRoleSubscription ? this.newRoleSubscription.unsubscribe() : null;
    this.newUserSubscription ? this.newUserSubscription.unsubscribe() : null;
    this.editDepartmentSubscription ? this.editDepartmentSubscription.unsubscribe() : null;
    this.editRoleSubscription ? this.editRoleSubscription.unsubscribe() : null;
    this.editUserSubscription ? this.editUserSubscription.unsubscribe() : null;
    this.editOrgSubscription ? this.editOrgSubscription.unsubscribe() : null;
  }

  addCompanyElement(taskType:string):void {

    this.newElement = taskType;

  }

  showModal(template: TemplateRef<any>,cls:any){
    this.newElement = '';

    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: cls })  
    ); 

    this.clearModal();
  }

  editOrganization():void{
    var body:any = {}

    body={
      orgID: this.orgEditOrgId,
      orgName: this.orgEditOrgName,
      address: this.orgEditAddress,
      city: this.orgEditCity,
      logoUrl: this.orgEditLogoUrl,
      email: this.orgEditEmail,
      phoneNumber: this.orgEditPhoneNumber,
      mission: this.orgEditMission === "" ? null : this.orgEditMission,
      vision: this.orgEditVision === "" ? null : this.orgEditVision,
      values: this.orgEditValues === "" ? null : this.orgEditValues,
      outcomeStatement: this.orgEditOutcomeStatement === "" ? null : this.orgEditOutcomeStatement
    }

    if (this.orgEditMission && this.orgEditMission.length>500) {
      alert("Please limit the Mission to 500 characters.");
      return;
    }

    if (this.orgEditVision && this.orgEditVision.length>500) {
      alert("Please limit the Vision to 500 characters.");
      return;
    }

    if (this.orgEditValues && this.orgEditValues.length>500) {
      alert("Please limit the Values to 500 characters.");
      return;
    }

    if (this.orgEditOutcomeStatement && this.orgEditOutcomeStatement.length>10000) {
      alert("Please limit the Three Year Outcome to 10,000 characters.");
      return;
    }

    if (!this.orgEditPhoneNumber){
      alert('Please fill in the organization phone number before continuing.');
    } else if (!isNaN(this.orgEditPhoneNumber)&&this.orgEditPhoneNumber.toString().length==10){
      this.editOrgSubscription = this.dataService.putOrganizationData.pipe(take(1)).subscribe((data:any) =>{
        if(data){
          notification.notification(data.status,data.msg,10000)
        }
      });
  
      this.dataService.putOrganization(body);
  
      this.modalRef.hide();
  
      this.timeoutList();  
    } else if (!isNaN(this.orgEditPhoneNumber) && this.orgEditPhoneNumber.toString().length!=10){
      alert('Please make sure the phone number contains 10 digits.');
    }else {
      alert('Please remove non-numerical characters from phone number and submit again.');
    }
  }

  createNewDepartment():void {

    var body:any = {}

    body={
      deptName: this.deptNewDepartmentName,
      orgID: this.deptNewOrganizationId
    }

    this.newDepartmentSubscription = this.dataService.postDepartmentData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
      }
    });

    this.dataService.postDepartment(body);

    this.modalRef.hide();

    this.timeoutList();
  }

  editDepartment():void {
    var body:any = {}

    body={
      deptName: this.deptEditDepartmentName,
      depID: this.deptEditDepartmentId
    }

    this.editDepartmentSubscription = this.dataService.putDepartmentData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
      }
    });

    this.dataService.putDepartment(body);

    this.modalRef.hide();

    this.timeoutList();

  }

  createNewRole():void {
    var body:any = {}

    body={
      roleName: this.roleNewRoleName,
      depID: this.roleNewDepartmentId,
      leval: this.roleNewLevel
    }

    this.newRoleSubscription = this.dataService.postRoleData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
      }
    });

    this.dataService.postRole(body);

    this.modalRef.hide();

    this.timeoutList();

  }

  editRole():void {
    var body:any = {}

    body={
      roleName: this.roleEditRoleName,
      leval: this.roleEditRoleLevel,
      rID: this.roleEditRoleId
    }

    this.editRoleSubscription = this.dataService.putRoleData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
      }
    });

    this.dataService.putRole(body);

    this.modalRef.hide();

    this.timeoutList();
  }

  createNewUser():void {
    var body:any = {}

    body={
      email: this.userNewEmail,
      rID: this.userNewRoleId,
      managerUserId: this.userNewManagerUserId
    }

    this.newUserSubscription = this.dataService.postUserData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
      }
    });

    this.dataService.postUser(body);

    this.modalRef.hide();

    this.timeoutList();

  }

  editUser():void{
    var body:any = {}

    body={
      uID: this.userEditUserId,
      rID: this.userEditRoleId,
      managerUserId: this.userEditManagerUserId
    }

    this.editUserSubscription = this.dataService.putUserData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
      }
    });

    this.dataService.putUser(body);

    this.modalRef.hide();

    this.timeoutList();
  }

  timeoutList():void {
    setTimeout(() => {
      this.dataService.getOrganizationComplete(this.deptNewOrganizationId);
      this.clearModal();
    }, 1000);
  }

  clearModal():void {
    this.deptNewDepartmentName = '';
    this.roleNewRoleName = '';
    this.roleNewLevel = '';
    this.roleNewDepartmentId = '';
    this.roleEditRoleId = '';
    this.roleEditRoleLevel = '';
    this.roleEditRoleName = '';
    this.userNewEmail = '';
    this.userNewRoleId = '';
    this.userEditUserId = '';
    this.userEditRoleId = '';
    this.userEditManagerUserId = null;
    this.deleteText = null;
  }

  setEditData(d:any):void {
    var x:number = 0;
    this.setRoleList(d);
    this.userEditUserList = [];
    Object.keys(d.Roles).forEach(i=>{
      if(d.Roles[i].Users.length>0){
        Object.keys(d.Roles[i].Users).forEach(f=>{
          this.userEditUserList[x] = { uID: d.Roles[i].Users[f].uID, name: d.Roles[i].Users[f].name, lname: d.Roles[i].Users[f].lname, rID: d.Roles[i].rID, roleName: d.Roles[i].roleName, managerUserId: d.Roles[i].Users[f].Manager ? d.Roles[i].Users[f].Manager.uID : null }
          x+=1;
        })
      }
    });
    this.deptEditDepartmentName = d.deptName;
    this.deptEditDepartmentId = d.depID;
  }

  refreshRoleEdit():void {
    Object.keys(this.roleList).forEach(i=>{
      if (this.roleList[i].rID==this.roleEditRoleId){
        this.roleEditRoleLevel = this.roleList[i].leval;
        this.roleEditRoleName = this.roleList[i].roleName;
      }
    });
  }

  setUserEditData(depID:string):void {
    Object.keys(this.userEditUserList).forEach(i=>{
      if (this.userEditUserList[i].uID==this.userEditUserId){
        this.roleList.push({
          rID:this.userEditUserList[i].rID,
          roleName:this.userEditUserList[i].roleName
        });
        this.userEditRoleId = this.userEditUserList[i].rID;
        this.userEditManagerUserId = this.userEditUserList[i].managerUserId;
      }
    });
    this.userEditDepId = depID;
  }

  setRoleList(d:any):void {
    this.roleList = d.Roles
  }

  setUserData(depID:any):void {
    var data:any = [];
    Object.keys(this.orgData).forEach(i=>{
      if (depID==this.orgData[i].depID){
        Object.keys(this.orgData[i].Roles).forEach(j=>{
          if(this.orgData[i].Roles[j].Users.length<1){
            data.push({
              rID: this.orgData[i].Roles[j].rID,
              roleName: this.orgData[i].Roles[j].roleName
            })
          }
        })
      }
    })
    this.roleList = data;
  }

  getUserList(orgData:any):any {
    var data:any = [];
    Object.keys(orgData).forEach(i=>{
      if(orgData[i].uID!=null){
        data.push(orgData[i]);
      }
    })
    return data;
  }

  updateOrgUserList():void {
    var data:any = [];
    Object.keys(this.orgUserList).forEach(i=>{
      if(this.orgUserList[i].uID!=this.userEditUserId){
        data.push(this.orgUserList[i]);
      }
    })
    this.orgUserListSupervisor = data;
  }

  deleteDepartment(depID:string):void {

    this.deleteDepartmentSubscription = this.dataService.deleteDepartmentData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
      }
    });

    this.dataService.deleteDepartment(depID);

    this.modalRef.hide();

    this.timeoutList();
  }

  getRoleUser(rID:string,roleList:any):void {

    let data:boolean = false;

    Object.keys(roleList).forEach(i=>{
      if (roleList[i].rID==rID){
        if(roleList[i].Users.length>0){
          data = true;
        }
      }
    });
    this.roleHasUser = data;
  }

  deleteRole(rID:string):void {

    this.deleteRoleSubscription = this.dataService.deleteRoleData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
      }
    });

    this.dataService.deleteRole(rID);

    this.modalRef.hide();

    this.timeoutList();
  }

  deleteUser(uID:string):void {

    this.deleteUserSubscription = this.dataService.deleteUserData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,10000)
      }
    });

    this.dataService.deleteUser(uID);

    this.modalRef.hide();

    this.timeoutList();
  }

  clearDeleteModal():void {
    this.deleteText = '';
  }

  setDeleteElement(deleteElementType:string):void {
    this.deleteElementType = deleteElementType;
    if(deleteElementType=='Department'){
      this.deptDeleteDeptId = this.deptEditDepartmentId;
    }else if (deleteElementType=='Role'){
      this.roleDeleteRoleId = this.roleEditRoleId;
    }else if (this.deleteElementType=='User'){
      this.userDeleteUserId = this.userEditUserId;
    }
  }

  deleteElement():void {

    if (this.deleteElementType=='Department'){
      this.deleteDepartment(this.deptDeleteDeptId);
    }else if (this.deleteElementType=='Role'){
      this.deleteRole(this.roleDeleteRoleId);
    }else if (this.deleteElementType=='User'){
      this.deleteUser(this.userDeleteUserId);
    }
  }
}