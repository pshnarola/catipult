import { Component, ViewChild, AfterViewInit, Inject, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataServiceService } from '../../services/data-service/data-service.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  message: any;
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataServiceService) { }

  ngOnInit() {
    console.log(this.data);
    this.message = this.data;
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  confirm(){
 //   this.dataService.confirmService(this.data.d);
    this.dialogRef.close();
    console.log('confirm');
  }
}
