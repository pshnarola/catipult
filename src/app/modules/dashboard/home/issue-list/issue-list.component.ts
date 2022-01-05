import { Component, Input, TemplateRef, OnChanges } from '@angular/core';

import { Subscription } from 'rxjs'
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AngularEditorConfig } from "@kolkov/angular-editor";


import * as notification from 'src/app/shared/libraries/exports.library';
import { IssueDataService } from 'src/app/modules/issue/data.service';
import { SharedDataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnChanges {

  @Input() data:any;
  @Input() userData:any;
  @Input() scope:string;
  @Input() modify:boolean = true;

  modalRef: BsModalRef;

  constructor(private IssueDataService: IssueDataService,private modalService: BsModalService,private SharedDataService: SharedDataService) { }

  dataSubscription:Subscription[] = [];
  
  displayIssueArchive:boolean = false;

  issueData:any;
  issueArchiveData:any;
  issueDataActive:any;

  newIssue:any = {};
  editIssue:any = {};

  issueColumns:any = ['ID','Name','Notes','Status','User'];

  charp : Charp[] = [
    { value: "C", viewValue: "Change" },
    { value: "H", viewValue: "Help" },
    { value: "A", viewValue: "Aware" },
    { value: "R", viewValue: "Redirect" },
    { value: "P", viewValue: "Plan" },
    { value: "D", viewValue: "Done" }
  ];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
  };

  ngOnChanges():void {

    this.issueData = this.isNotDone(this.userData);
    for (const d in this.issueData){
      this.issueData[d].ID = parseInt(d)+1
    }
    this.issueArchiveData = this.isDone(this.userData);
    for (const d in this.issueArchiveData){
      this.issueArchiveData[d].ID = parseInt(d)+1
    }

    if(this.displayIssueArchive){
      this.issueDataActive = this.issueArchiveData;
    } else {
      this.issueDataActive = this.issueData;
    }
  }

  showModal(template: TemplateRef<any>, cls: any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: cls })
    );
  }

  initializeNewIssue():void {
    this.newIssue.uID = this.data.user.uID
  }
  createNewIssue():void {
    this.dataSubscription.push(this.IssueDataService.postUserIssue(this.newIssue).subscribe((data:any)=>{
      if(data && data.status=='Success'){
        notification.notification('Success','You have successfully added the issue.',5000)
        this.newIssue = {}
        if(this.data.meetingId){
          this.IssueDataService.getMeetingIssue(this.data.meetingId)
          if(this.data.user.filterIssues){
            this.IssueDataService.getMeetingUserIssue(this.data.user.uID);
          }
        } else {
          this.IssueDataService.getMeetingUserIssue(this.data.user.uID);
        }
        this.modalRef.hide();
      }
    }));
  }

  EditIssue(template: TemplateRef<any>,cls:any,element: any){
    this.editIssue = element
    this.showModal(template,cls);
  }

  UpdateIssue():void {
    this.dataSubscription.push(this.IssueDataService.putUserIssue(this.editIssue).subscribe((data:any)=>{
      if(data && data.status=='Success'){
        notification.notification('Success','You have successfully updated the issue.',5000)
        this.modalRef.hide();
        if(this.data.meetingId){
          this.IssueDataService.getMeetingIssue(this.data.meetingId)
        } else {
          this.IssueDataService.getMeetingUserIssue(this.data.user.uID);
        }
        this.editIssue = {};
      }
    }));
  }

  isDone(array){
    var arr:any = [];
    Object.keys(array).forEach(function(i){
      if (array[i].issueStatus=="D"){
        arr.push(array[i]);
      }
    });
    return arr;
  }

  isNotDone(array){
    var arr:any = [];
    Object.keys(array).forEach(function(i){
      if (array[i].issueStatus!="D"){
        arr.push(array[i]);
      }
    });
    return arr;
  }

  showIssueArchive(display:boolean):void {
    this.displayIssueArchive = display;
    if(display){
      this.issueDataActive = this.issueArchiveData;
    }else if (!display){
      this.issueDataActive = this.issueData;
    }
  }
}

export interface Charp {
  value: string;
  viewValue: string;
}