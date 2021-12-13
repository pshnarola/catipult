import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ParamMap , ActivatedRoute} from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { DataService } from '../services/data.service';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { MessageComponent } from '../dialog/message/message.component';
import { QuestionListComponent } from '../dialog/question-list/question-list.component';



export interface Driver {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  unit: string;
  action: boolean;
}
export class Drivers implements PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  unit: string;
  action: boolean;
}


@Component({
  selector: 'app-qaupdates',
  templateUrl: './qaupdates.component.html',
  styleUrls: ['./qaupdates.component.scss']
})
export class QaupdatesComponent implements OnInit {
  selectedValue: string;
  updateFlag=false;
  value = '';
  hideAll = false;
  seqNo: any;
  options = [];
  option1 = '';
  option2 = '';
  option3 = '';
  option4 = '';
  option5 = '';
  option6 = '';
  option7 = '';
  option8 = '';
  option9 = '';
  option10 = '';
  desc = false;
  o1flag = false;
  o2flag = false;
  o3flag = false;
  o4flag = false;
  o5flag = false;
  o6flag = false;
  o7flag = false;
  o8flag = false;
  o9flag = false;
  o10flag = false;
  showlist= true;
  qID: any;
  qtext: any;
  o1text: any;
  o2text: any;
  o3text: any;
  o4text: any;
  o5text: any;
  o6text: any;
  o7text: any;
  o8text: any;
  o9text: any;
  o10text: any;
  rfpFlag=false;
  ELEMENT_DATA: PeriodicElement[] = [
  ];
  displayedColumns = ['position', 'objective', 'qty', 'action'];
  dataSource = this.ELEMENT_DATA;
  driverID: any;
  id: any;
  qList: any;
  qtID: any;
  driverName: any;
  updateQ: any;
  selectedOption: any;
  qtypes: any;
  status = '';
  drivers: Driver[] = [
    {value: '0', viewValue: 'None'},
    {value: '1', viewValue: 'Single Choice'},
    {value: '2', viewValue: 'Multiple Choice'},
    {value: '3', viewValue: 'Descriptive'}
  ];

  constructor(public dataService: DataService, public dialog: MatDialog, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    // this.driverID = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getHero(params.get('id')))
    // );
    this.id = this.route.snapshot.params.id;
    this.driverName = this.route.snapshot.params.driver;
    console.log(this.id, this.driverName);
  //   this.route.queryParams.subscribe(params => {
  //     console.log(params);
  //     this.id = params['id'];
  //     this.driverName = params['driver'];
  //     console.log(this.id, this.driverName);
  // });
    this.o1flag = true;
    this.dataService.statusddata.subscribe((data) => {
      console.log(data);
      this.status = data;
    });
    this.dataService.qTypedata.subscribe((data) => {
      console.log(data);
      this.qtypes = data;
    });
    this.dataService.qIDdata.subscribe((data) => {
      console.log(data);
      this.qID = data;
    });
    this.dataService.qListdata.subscribe((data) => {
      console.log(data);
      this.qList = data;
      // this.qtypes = data;
    });
    this.dataService.confirmdata.subscribe((data) => {
      console.log(data);
      const v= data ? data.queID : false;
      if (v) {
      this.dataService.deleteQuestion(data.queID);
      this.holdTime();
      }
      // this.qList = data;
      // this.qtypes = data;
    });
    this.dataService.getQuestionsList(this.id);
    this.dataService.getQType();
  }
  addQ() {

  }
  getAvailable(){
    this.dataService.getAvailable(this.seqNo);
  }
  resetAll(){
    this.seqNo = '';
    this.qtext = '';
    this.o1text ='';
    this.o2text ='';
    this.o3text ='';
    this.o4text ='';
    this.o5text ='';
    this.o6text ='';
    this.o7text ='';
    this.o8text ='';
    this.o9text ='';
    this.o10text ='';
    this.o1flag =true;
    this.o2flag =false;
    this.o3flag =false;
    this.o4flag =false;
    this.o5flag =false;
    this.o6flag = false;
    this.o7flag =false;
    this.o8flag =false;
    this.o9flag =false;
    this.o10flag =false;
   // this.qType('977bca4e-1c37-474b-9791-1409018f9b8d');

  }
  editQ(item: any){
    console.log(item);
    this.resetAll();
    this.showlist=false;
    this.updateQ = item;
    let flag=false;
    this.selectedOption = item.QuestionType.qtID;
    if(item.QuestionType.typeName ==='Descriptive'){
      flag= true;
    }
    if(item.QuestionType.qtID ==='23921a23-2aac-4d96-b1a1-faeba9118e9c'){
      this.rfpFlag=true;
    }
    else{
      this.rfpFlag=false;
    }
    if(this.updateQ.Options[0] && !flag){
      this.o1flag = true;
    }
    if(this.updateQ.Options[1] && !flag){
      this.o2flag = true;
    }
    if(this.updateQ.Options[2] && !flag){
      this.o3flag = true;
    }
    if(this.updateQ.Options[3] && !flag){
      this.o4flag = true;
    }
    if(this.updateQ.Options[4] && !flag){
      this.o5flag = true;
    }
    if(this.updateQ.Options[5] && !flag){
      this.o6flag = true;
    }
    if(this.updateQ.Options[6] && !flag){
      this.o7flag = true;
    }
    if(this.updateQ.Options[7] && !flag){
      this.o8flag = true;
    }
    if(this.updateQ.Options[8] && !flag){
      this.o9flag = true;
    }
    if(this.updateQ.Options[9] && !flag){
      this.o10flag = true;
    }
    console.log(this.selectedOption);
    this.updateFlag=true;
  }
  updateItem(){
    console.log(this.updateQ);
    this.dataService.updateQuestion({
      queID: this.updateQ.queID,
      seqNo: this.updateQ.seqNo.toString(),
      question: this.updateQ.question,
      options: JSON.stringify(this.updateQ.Options)
    });
    this.showlist=true;
    this.updateFlag =false;
    this.resetAll();
  }
  cancelItem(){
    this.showlist=true;
    this.updateFlag=false;
  }
  qType(value) {
    console.log(value);
    this.qtID = value;
    if (value === '977bca4e-1c37-474b-9791-1409018f9b8d' || value === 'de46fb02-1959-4067-97f9-bf4b3fddb3d5') {
      this.hideAll = true;
    } else {
      this.hideAll = false;
    }
    if (value === '6e210430-bec8-4e21-b49d-a859982ffb04') {
      this.desc = true;
    }
    if (value === '23921a23-2aac-4d96-b1a1-faeba9118e9c') {
      this.rfpFlag = true;
    }
    else{
      this.rfpFlag =false;
    }
    this.resetAll();
    console.log(this.hideAll);
  }
  deleteQ(d) {
    console.log(d);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {d}
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
    //  this.dataService.getAllItems();
      // this.animal = result;
    });
    dialogRef.disableClose = false;
  }
  addoption1() {
this.o1flag = true;
  }
  message(m){
    console.log(m);
     const dialogRef = this.dialog.open(MessageComponent, {
      width: '350px',
      data: m
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
    //  this.dataService.getAllItems();
      // this.animal = result;
    });
    dialogRef.disableClose = false;
  }
  addoption2() {
    this.o2flag = true;
      }
      addoption3() {
        this.o3flag = true;
          }
          addoption4() {
            this.o4flag = true;
              }
              addoption5() {
                this.o5flag = true;
                  }
                  addoption6() {
                    this.o6flag = true;
                      }
                      addoption7() {
                        this.o7flag = true;
                          }
                          addoption8() {
                            this.o8flag = true;
                              }
                              addoption9() {
                                this.o9flag = true;
                                  }
                                  addoption10() {
                                    this.o10flag = true;
                                      }
              removeoption2() {
                this.o2flag = false;
              }
              removeoption3() {
                this.o3flag = false;
              }
              removeoption4() {
                this.o4flag = false;
              }
              removeoption5() {
                this.o5flag = false;
              }
              removeoption6() {
                this.o6flag = false;
              }
              removeoption7() {
                this.o7flag = false;
              }
              removeoption8() {
                this.o8flag = false;
              }
              removeoption9() {
                this.o9flag = false;
              }
              removeoption10() {
                this.o10flag = false;
              }
              submit() {
                this.options=[];
                if (this.o1text !== '') {
                  this.options.push(this.o1text);
                }
                if (this.o2text !== '') {
                  this.options.push(this.o2text);
                }
                if (this.o3text !== '') {
                  this.options.push(this.o3text);
                }
                if (this.o4text !== '') {
                  this.options.push(this.o4text);
                }
                if (this.o5text !== '') {
                  this.options.push(this.o5text);
                }
                if (this.o6text !== '') {
                  this.options.push(this.o6text);
                }
                if (this.o7text !== '') {
                  this.options.push(this.o7text);
                }
                if (this.o8text !== '') {
                  this.options.push(this.o8text);
                }
                if (this.o9text !== '') {
                  this.options.push(this.o9text);
                }
                if (this.o10text !== '') {
                  this.options.push(this.o10text);
                }
                console.log(this.qtext, this.o1text, this.o2text, this.o3text, this.o4text, this.options);

                this.dataService.addQuestion({
  question: this.qtext,
  qtID: this.qtID,
  seqNo: this.seqNo.toString(),
  driverID: this.id,
  options: JSON.stringify(this.options)
});

                this.holdTime();
                this.message('Question Added to Driver');

              }
              holdTime() {
                setTimeout((d) => {
                  console.log(this.qtID, this.seqNo);
                  if(this.qtID === '23921a23-2aac-4d96-b1a1-faeba9118e9c' && this.qtID !== undefined) {
                    this.selectQuestions(this.qID, this.seqNo, 'c');
                   }
                   else{
                    this.resetAll();
                    this.dataService.getQuestionsList(this.id);
                   }
                }, 2000);
                this.dataService.getQuestionsList(this.id);
              }
              selectQuestions(qID: any,seqNo: any,action: any) {
                const dialogRef = this.dialog.open(QuestionListComponent, {
                  width: '80%',
                  data: {seqNo, driverID: this.id, qID, action}
                });

                dialogRef.afterClosed().subscribe(result => {
                  console.log('The dialog was closed');
                //  this.dataService.getAllItems();
                  // this.animal = result;
                });
                dialogRef.disableClose = false;
              }
}
