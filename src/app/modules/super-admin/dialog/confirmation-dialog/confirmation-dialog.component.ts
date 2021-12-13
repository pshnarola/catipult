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
  list: any;
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataService) { }

  ngOnInit() {
    console.log(this.data);
    this.list = [];
    this.dataService.getDeleteDepend(this.data.d.queID);
    this.dataService.deleteListdata.subscribe((data) =>{
      this.list= data;
      console.log(this.list);
    })
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  confirm(){
    this.dataService.confirmService(this.data.d);
    this.dialogRef.close();
    console.log('confirm');
  }
}
