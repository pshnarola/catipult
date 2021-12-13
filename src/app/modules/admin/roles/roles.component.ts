import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';

import { DataService } from '../services/data.service';
import { SharedDataService } from 'src/app/shared/services/data.service';

import { MessageComponent } from '../dialog/message/message.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  updateFlag=false;
  showlist:boolean;
  dept: any;
  deptSub: Subscription;
  roleSub: Subscription;
  // orgSub: Subscription;
  levalSub: Subscription;
  createFlag= false;
  updateRole: any;
  roletext='';
  orgID: any;
  levals: any;
  selectedDept: any;
  selectedLeval: any;
  selectedLeval1: any;
  roles: any;

  constructor(public dataService: DataService,public dialog: MatDialog, private DataService: SharedDataService) { }

  ngOnInit() {

    this.orgID = JSON.parse(this.DataService.getToken()).orgID;

    this.dataService.getAllDept(this.orgID);

    this.dataService.getRoles();

    this.deptSub= this.dataService.deptdata.subscribe((data) => {
      this.dept = data;
      if(data){
        if(data.length>0){
          this.selectedDept = data[0].depID;
          this.dataService.getAllDeptRole(data[0].depID);
        }
      }
    });

    this.roleSub= this.dataService.roleData.subscribe((data) =>{
      this.roles = data;
    },error =>{
    });

    this.levalSub= this.dataService.levalsdata.subscribe((data) =>{
      this.levals = data;
      if(data){
        if(data.length>0){
          this.selectedLeval = data[0].levalName;
        }
      }
    },error =>{
    });

    this.dataService.deptFlagdata.subscribe((data) =>{
      this.createFlag= data;
    });

    this.dataService.orgFetch();
    this.dataService.getLevals();

    this.showlist = true;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.roleSub.unsubscribe();
    this.deptSub.unsubscribe();
    // this.orgSub.unsubscribe();
  }
  selectLeval(value){
    console.log(value);
  }
  selectLeval1(value){
    console.log(value);
  }

  selectDept(value){
    this.dataService.getAllDeptRole(value);
  }
  
  editR(item: any){
    this.updateFlag=true;
    this.updateRole = item;

  }

  cancelU(){
    this.updateFlag=false;
  }

  timeOut(){
    setTimeout((d) => {
      if(this.createFlag){
        const dialogRef1 = this.dialog.open(MessageComponent, {
          width: '350px',
          data: 'Role Already Exists',
        });

        dialogRef1.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        //  this.dataService.getAllItems();
          // this.animal = result;
        });
        this.createFlag =false;
        dialogRef1.disableClose = false;
      }
      else{
        const dialogRef1 = this.dialog.open(MessageComponent, {
          width: '350px',
          data: 'Role Created',
        });

        dialogRef1.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        //  this.dataService.getAllItems();
          // this.animal = result;
        });
        dialogRef1.disableClose = false;
      }
    }, 2000);

  }

  submitR(){
    this.dataService.addRole({
      roleName: this.roletext,
      depID: this.selectedDept,
      leval: this.selectedLeval
    });
    this.roletext='';
    this.timeOut();
    setTimeout((d) => {
      this.dataService.getAllDeptRole(this.selectedDept);
    }, 2000);
  }

  submitU(){
    this.dataService.updateRole({
      rID: this.updateRole.rID,
      roleName: this.updateRole.roleName,
      leval: this.updateRole.leval,
    });
    this.updateFlag =false;
    setTimeout((d) => {
      this.dataService.getAllDeptRole(this.selectedDept);
    }, 2000);
  }

  deleteR(item){
    const dialogRef1 = this.dialog.open(MessageComponent, {
      width: '350px',
      data: 'Do You Really want to delete Role ?',
    });

    dialogRef1.afterClosed().subscribe(result => {
      if(result ==='OK'){
      this.dataService.deleteRole(item.rID);
      setTimeout((d) => {
        this.dataService.getAllDeptRole(this.selectedDept);
      }, 2000);
    }
    });
    dialogRef1.disableClose = false;

  }
}
