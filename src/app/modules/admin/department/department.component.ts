import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';

import { DataService } from '../services/data.service';
import { MessageComponent } from '../dialog/message/message.component';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  updateFlag=false;
  updateDept: any;
  showlist=true;
  deptSub: Subscription;
  orgSub: Subscription;
  dept: any;
  createFlag = false;
  depttext= '';
  orgID ='';
  constructor(public dataService: DataService,public dialog: MatDialog) { }

  ngOnInit() {
    this.deptSub = this.dataService.deptdata.subscribe((data) =>{
      this.dept = data;
    });

    this.orgSub =  this.dataService.orgIDdata.subscribe((data) =>{
      this.orgID = data;
      this.dataService.getAllDept(this.orgID);
    });

    this.dataService.deptFlagdata.subscribe((data) =>{
      this.createFlag= data;
    });

    this.dataService.orgFetch();
  }
  editd(item: any){
    this.updateFlag=true;
    this.updateDept = item;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.orgSub.unsubscribe();
    this.deptSub.unsubscribe();
  }

  timeOut(){
    setTimeout((d) => {
      if(this.createFlag){
        const dialogRef1 = this.dialog.open(MessageComponent, {
          width: '350px',
          data: 'Department Already Exists',
        });

        dialogRef1.afterClosed().subscribe(result => {
        //  this.dataService.getAllItems();
          // this.animal = result;
        });
        dialogRef1.disableClose = false;
        this.createFlag=false;
      }
      else{
        const dialogRef1 = this.dialog.open(MessageComponent, {
          width: '350px',
          data: 'Department Created',
        });

        dialogRef1.afterClosed().subscribe(result => {
        //  this.dataService.getAllItems();
          // this.animal = result;
        });
        dialogRef1.disableClose = false;
      }
    }, 2000);

  }

  cancelD(){
    this.updateFlag=false;
  }

  submitD(){
     this.dataService.addDept({
      deptName: this.depttext,
      orgID: this.orgID,
     });
     this.timeOut();
     this.depttext='';
     this.getDept();

  }

  getDept(){
    setTimeout((d) => {
      this.dataService.getAllDept(this.orgID);
    }, 2000);
  }

  submitU(){
    this.dataService.updateDept(this.updateDept);
    this.updateFlag =false;
    this.getDept();
    const dialogRef1 = this.dialog.open(MessageComponent, {
      width: '350px',
      data: 'Department Updated',
    });

    dialogRef1.afterClosed().subscribe(result => {
    //  this.dataService.getAllItems();
      // this.animal = result;
    });
    dialogRef1.disableClose = false;
  }

  deleteDept(item){
    const dialogRef1 = this.dialog.open(MessageComponent, {
      width: '350px',
      data: 'Do You Really want to delete Dept ?',
    });

    dialogRef1.afterClosed().subscribe(result => {
      if(result ==='OK'){
      this.dataService.deleteRole(item.rID);
      setTimeout((d) => {
        this.dataService.deleteDeptRole(item.depID);
        this.getDept();
      }, 2000);
    }
    //  this.dataService.getAllItems();
      // this.animal = result;
    });
    dialogRef1.disableClose = false;
  }

  deleted(item: any){
    this.getDept();
  }

}
