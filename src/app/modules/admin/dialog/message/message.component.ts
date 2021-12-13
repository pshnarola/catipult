import { Component, ViewChild, AfterViewInit, Inject, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message = '';
  constructor(public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.message = this.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(){
 //   this.dataService.confirmService(this.data.d);
    this.dialogRef.close('OK');
  }
}
