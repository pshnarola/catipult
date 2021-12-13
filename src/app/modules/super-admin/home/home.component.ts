import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl } from '@angular/forms';

import { DataService } from '../services/data.service';
import { MessageComponent } from '../dialog/message/message.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  updateFlag=false;
  showlist=true;
  myform: FormGroup;
  orgtext1: FormControl;
  info='';
  orgtext = '';
  passFlag=false;
  email = '';
  text= 'Show Password';
  passtxt='';
  startDate ='';
  minEndDate1= '';
  addNew=true;
  updateOrg: any;
  endDate = '';
  startDate1 = '';
  endDate1 = '';
  orgs: any;
  msg= '';
  minDate =  new Date();
  minDate1 =  new Date();
  endDateStart: any;
  constructor(public dataService: DataService,public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.orgdata.subscribe((data) =>{
      console.log(data);
      this.orgs= data;
    });
    this.dataService.orgmsgdata.subscribe((data) =>{
      console.log(data);
      this.msg= data;
      this.info = this.msg;
      if(this.info){
      document.getElementById('openModalButton').click();
      }
      if(this.info === 'Orgnization added..'){
        this.addNew=true;
        this.holdTime();
        this.timeout();
      }
    });
    this.dataService.getOrg();

  }
  addNewData(){
this.addNew=false;
  }
  submit(){
    console.log(this.startDate,this.endDate,this.orgtext,this.email, this.passtxt);
    this.dataService.addOrg({
      orgName: this.orgtext,
      startDate: this.startDate,
      endDate: this.endDate,
      email: this.email,
    });
    this.info = 'Registered Organization';


  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    // tslint:disable-next-line: max-line-length
    this.startDate = `${event.value.getFullYear()}/${ event.value.getMonth() + 1 }/${event.value.getDate()> 9 ? event.value.getDate() : '0' + event.value.getDate()}`;
      if(this.updateFlag){
        this.updateOrg.startDate = `${event.value.getFullYear()}/${ event.value.getMonth() + 1 }/${event.value.getDate()> 9 ? event.value.getDate() : '0' + event.value.getDate()}`;
        this.startDate1= this.updateOrg.startDate;
      }
      // this.date.setDate( this.date.getDate() + 3 );
      let sDate = new Date();
    //  this.endDateStart= sDate.setDate(event.value.getDate() +1);
    this.endDateStart= new Date(sDate.setDate(event.value.getDate() + 1));
      console.log(this.endDateStart);
  }
  addEvent1(type: string, event: MatDatepickerInputEvent<Date>) {
    // tslint:disable-next-line: max-line-length
    this.endDate = `${event.value.getFullYear()}/${ event.value.getMonth() + 1 }/${event.value.getDate()> 9 ? event.value.getDate() : '0' + event.value.getDate()}`;

    if(this.updateFlag){
      this.updateOrg.endDate = `${event.value.getFullYear()}/${ event.value.getMonth() + 1 }/${event.value.getDate()> 9 ? event.value.getDate() : '0' + event.value.getDate()}`;
      this.endDate1= `${event.value.getFullYear()}-${ event.value.getMonth() + 1 }-${event.value.getDate()> 9 ? event.value.getDate() : '0' + event.value.getDate()}`;
      console.log(this.updateOrg);
    }

    console.log(this.updateFlag);
   }
   toggle(){
    this.passFlag = !this.passFlag;
    if(!this.passFlag){
      this.text= 'Show Password'
    }
    else{
      this.text = 'Hide Password';
    }
   }
   deleteo(item: any){
     console.log(item);
     this.dataService.deleteOrg(item.orgID,item.email);
     this.info = 'Organization Deleted';
      if(this.info){
      document.getElementById('openModalButton').click();
      this.holdTime();
      }
   }
   editO(item: any){
     this.updateOrg = item;
     this.updateFlag =true;
     this.minDate1 = item.startDate;
     this.startDate1= item.startDate;
     this.endDate1= item.endDate;
     this.minEndDate1 = item.endDate;
     this.showlist =false;
     console.log(this.updateOrg, item);
   }
   submitU(){
     console.log(this.updateOrg);
     delete this.updateOrg.email;
     this.dataService.updateOrg(this.updateOrg);
    this.holdTime();
    const dialogRef1 = this.dialog.open(MessageComponent, {
      width: '350px',
      data: 'Organization Updated..',
    });

    dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    //  this.dataService.getAllItems();
      // this.animal = result;
    });
    dialogRef1.disableClose = false;
     this.updateFlag = false;
     this.showlist= true;
   }
   timeout(){
    setTimeout((d) => {
      this.msg= '';
    }, 4000);
   }
   holdTime() {
    setTimeout((d) => {
      this.dataService.getOrg();
    }, 2000);
  }
   cancelU(){
     this.updateFlag = false;
     this.showlist= true;

   }

}
