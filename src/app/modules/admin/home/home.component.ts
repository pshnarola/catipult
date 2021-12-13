import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

import { Subscription } from 'rxjs';

import { DataService } from '../services/data.service';
import { InviteComponent } from '../dialog/invite/invite.component';
import { MessageComponent } from '../dialog/message/message.component';
import { SharedDataService } from 'src/app/shared/services/data.service';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  animal: string;
  roles: any;
  selectuser: any;
  email: any;
  users: any;
  add = false;
  orgID='';
  depID: any;
  depts: any;
  roleID: any;
  depts1: Subscription;
  roles1: Subscription;
  orgID1: Subscription;
  name: string;
  userDetailsForm: any;

  constructor(private fb: FormBuilder,public dialog: MatDialog,
              public dataService: DataService, private DataService: SharedDataService) { }

  ngOnInit() {

    this.orgID = JSON.parse(this.DataService.getToken()).orgID;

    this.dataService.getAllUsers(this.orgID);

    this.dataService.userData.subscribe((data) => {
      this.users = data;
    });

    this.roles = [{ rID: 1, roleName: 'No Roles' }];

    this.dataService.getRoles();

    this.userDetailsForm = this.fb.group({email: ['', Validators.required ]});

    this.dataService.rolesdata.subscribe((data)=>{
      this.roles = data;
    });

    this.dataService.deptdata.subscribe((data) => {

      this.depts = data;
      
      if(data) {
        this.depID = data[0].depID;
        this.dataService.getAllDeptRole(data[0].depID);
      }
    });

    this.dataService.orgFetch();
  }

  selectDept(value){
    this.dataService.getAllDeptRole(value);
  }

  selecUser(user){
    this.selectuser = user;
  }

  addUser1() {

  }

  async deleteUser(user){
   let  msg= 'This user has Milestones associated. Please delete them first'

    const v = await this.dataService.deleteUser(this.selectuser.uId);
    if(v.msg === 'User Deleted..'){
      this.dataService.getAllUsers(this.orgID);
        }
  }

  inviteAdd() {
    const dialogRef = this.dialog.open(InviteComponent, { width: '350px', data: {email: '', rID: ''} });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'invite') {
        const dialogRef1 = this.dialog.open(MessageComponent, { width: '350px', data: 'Invitation sent successfully..'});

        dialogRef1.afterClosed().subscribe(result => {
        });
        dialogRef1.disableClose = false;
      }
    });
    dialogRef.disableClose = false;
  }

  addUser() {
  }

}
