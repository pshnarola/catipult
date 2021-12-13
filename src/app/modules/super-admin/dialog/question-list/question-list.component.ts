import { Component, ViewChild, AfterViewInit, Inject, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  qListSeq: any;
  qListSelected: any;
  public loading = false;
  qlist = [];
  qListObservable: Subscription;
  qListSelectedObservable: Subscription;
  constructor(public dialogRef: MatDialogRef<QuestionListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: DataService) { }

  ngOnInit() {
    console.log(this.data);
    this.loading= true;
    this.qListObservable = this.dataService.qListSelecteddata.subscribe((data) => {
      this.qListSelected = data;
      console.log(data);
      if(data){
     this.holdLoadingS();
      }
      console.log(this.qListSelected);
    });

    this.qListSelectedObservable = this.dataService.qListSeqdata.subscribe((data) => {
      this.qListSeq = data;
      if(this.data.action === 'u' && this.qListSeq) {
        this.dataService.getQuestionListSelected(this.data.qID);
      }
      console.log(this.qListSeq);
    });
    if(this.data) {
      this.dataService.getQuestionsListSeq(this.data.driverID,this.data.seqNo);
    }


  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.qListObservable.unsubscribe();
    this.qListSelectedObservable.unsubscribe();
  }
  holdLoading(){
    setTimeout((d) => {
      this.dataService.getQuestionsListSeq(this.data.driverID,this.data.seqNo);
      this.loading= false;
    }, 2000);
  }
  holdLoadingS(){
    setTimeout((d) => {
      this.bindQuestion();
      this.loading= false;
    }, 2000);
  }
  bindQuestion() {
console.log(this.qListSeq, this.qListSelected);
const temp = [];
this.qListSeq.forEach(element => {
      this.qListSelected.forEach(ele => {
        if (element.queID === ele.qSelectID) {
          element.checked = true;
          element.rfpID = ele.rfpID;
        }
      });
    });
  }
  updateQuestion(){
    console.log(this.qListSeq);
  }
  addQuestion() {
    console.log(this.qListSeq);
    this.qListSeq.forEach(element => {
      if (element.checked) {
        this.qlist.push(element.queID);
      }
    });
    console.log(this.qlist);
    const qstring = JSON.stringify(this.qlist);
    this.dataService.addRfp({
      queID: this.data.qID,
      qSelectID: qstring,
    });
    console.log(qstring);
  }

  onChange(event, item) {

    // item.checked = !item.checked;

    // this.lastAction = 'index: ' + index + ', label: ' + item.label + ', checked: ' + item.checked;
    if(this.data.action === 'u'){
    console.log(event, item);
    this.loading=true;
    if(event.checked){
      console.log('insert');
      this.dataService.addRfpQuestion({
        queID: this.data.qID,
        qSelectID: item.queID,
      });
      this.holdLoading();
    }
    else{
      console.log('delete');
      this.dataService.deleteRfpQuestion(item.rfpID);
      this.holdLoading();
    }
  }
}

}
