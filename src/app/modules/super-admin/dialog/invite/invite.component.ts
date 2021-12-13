import { Component, ViewChild, AfterViewInit, Inject, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  userDetailsForm: any;
  roles: any;
  users: any;
  roleID: any;
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
     console.log(this.roles);
   });

    console.log(this.data);
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
    this.dialogRef.close();
  }

}
