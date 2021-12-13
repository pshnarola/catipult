import { Component, ViewChild, AfterViewInit, Inject, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  message: any;
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService) { }

  ngOnInit() {
    console.log(this.data);
    this.message = this.data;
  }
  onNoClick(): void {
    this.dialogRef.close('No');

  }
  confirm(){
 //   this.dataService.confirmService(this.data.d);
    this.dialogRef.close('Yes');
    console.log('confirm');
  }
}
