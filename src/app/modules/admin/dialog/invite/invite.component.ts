import { Component, ViewChild, AfterViewInit, Inject, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  userDetailsForm: any;
  roles: any;
  orgID: any;
  depID: any;
  depts: any;
  users: any;
  roleID: any;
  depts1: Subscription;
  roles1: Subscription;
  orgID1: Subscription;

  constructor(public dialogRef: MatDialogRef<InviteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: DataService) {
               }
               formControl = new FormControl('', [
                Validators.required,
                Validators.email,
              ]);
  ngOnInit() {
    this.dataService.getRoles();

    this.dataService.rolesdata.subscribe((data) => {
     this.roles = data;
   });
    this.dataService.orgIDdata.subscribe((data) =>{
    this.orgID = data;
    this.dataService.getAllDept(this.orgID);
  });
    this.dataService.deptdata.subscribe((data) => {
    this.depts = data;
    if(data){
      this.depID = data[0].depID;
      this.dataService.getAllDeptRole(data[0].depID);
      }
  });

    this.dataService.orgFetch();

  }
  selectDept(value){
    this.dataService.getAllDeptRole(value);

  }
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addUser() {
    this.data.rID = this.roleID;
    this.dataService.inviteUser(this.data);

    this.dialogRef.close('invite');
  }

}
