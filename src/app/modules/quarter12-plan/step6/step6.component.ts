import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DataServiceService } from '../services/data-service/data-service.service';
import { Router } from '@angular/router';

export interface Food {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss']
})
export class Step6Component implements OnInit {
  leftStyle = 'card';
  todo = [
  ];
  name='';
  done = [
  ];
  done1 = [
  ];
  done2 = [
  ];
  done3 = [
  ];
  done4=[];
  done5=[];
  done6=[];
  done7=[];
  done8=[];
  done9=[];
  done10=[];
  done11=[];
  done12=[];
  done13=[];
  doneList2=[];
  doneList3=[];
  doneList4=[];
  doneList5=[];
  doneList6=[];
  doneList7=[];
  doneList8=[];
  doneList9=[];
  doneList10=[];
  doneList11=[];
  doneList12=[];

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  matcher = new MyErrorStateMatcher();
  constructor(breakpointObserver: BreakpointObserver,
    public dataService: DataServiceService) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step6response';
        console.log('handset mode');
      }
    });
    breakpointObserver.observe([
      Breakpoints.WebLandscape,
      Breakpoints.Large,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step6';
        console.log('handset mode');
      }
    });
   }

  ngOnInit() {
    this.name = this.dataService.getUserInfo();
     }
     drop(event: CdkDragDrop<string[]>) {
       console.log(event);
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
    }


}
