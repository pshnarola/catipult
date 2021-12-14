import { Component, OnInit, TemplateRef,OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup,FormArray,FormBuilder } from '@angular/forms';

import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators'

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { DateTime } from 'luxon';

import { MeetingDataService } from '../data.service';
import { SharedDataService } from 'src/app/shared/services/data.service';
import { TeamLevelAllDataService } from 'src/app/modules/dashboard/home/team-level-all/data.service';
import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';
import { IssueDataService } from '../../issue/data.service'

import * as notification from 'src/app/shared/libraries/exports.library';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})

export class MeetingComponent implements OnInit,OnDestroy {

  modalRef:BsModalRef;
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

  constructor(private router: Router, private dataService: MeetingDataService, private modalService: BsModalService, private SharedDataService: SharedDataService,private formBuilder: FormBuilder
    ,private TeamLevelAllDataService: TeamLevelAllDataService,private DataServiceService: DataServiceService, private IssueDataService: IssueDataService) { }


  // Tab  variable
  rythm: boolean = true;
  custom: boolean = false;
  completedMeeting: boolean = false;

  meetingListSubscription:Subscription;
  timerSubscription:Subscription[] = [];
  dataSubscription:Subscription[] = [];
  orgUserListSubscription:Subscription;
  meetingHistoryListSubscription:Subscription;
  postUserMeetingSubscription:Subscription;
  deleteMeetingUserSubscription:Subscription;
  putUserMeetingSubscription:Subscription;
  deleteUserMeetingSubscription:Subscription;
  milestoneDataSubscription:Subscription;
  postMeetingHistorySubscription:Subscription;
  putMeetingHistorySubscription:Subscription;

  meetingInProgress:boolean = false;
  meetingIsLaunched:boolean = false;
  displayAttendeeList:boolean = true;
  displayMeetingList:boolean = true;
  displayMeetingConclusion:boolean = false;
  displayAgenda:boolean = true;
  displayMeetingNotes:boolean = false;

  timerNewArr:any = [];
  timerEditArr:any = [];

  activeMeeting:any;
  activeMeetingName:string;
  activeMeetingNotes:string = null;
  activeMeetingScore:number = 0;
  activeMeetingScoreNotes:string = null;
  activeMeetingUser:any = [];

  previewMeeting:boolean = false;
  meetingIsPreview:boolean = false;
  previewMeetingName:string;
  previewTimers:any;
  previewMeetingId:string;

  uID:string = this.SharedDataService.getUserId();
  orgID:string = this.SharedDataService.getUserOrgId();
  
  conclusionFinished:boolean = false;

  meetingData:any;
  meetingHistoryData:any;
  orgUserList:any;
  userMeetingData:any;
  issueData:any = [];
  issueDataFiltered:any;

  meetingEditMeeting:any = [];
  meetingEditCustomTimer:boolean = false;
  meetingEditMeetingName:string;
  meetingEditMeetingDate:Date;
  meetingEditMeetingTime:String;
  meetingEditMeetingFrequency:String;
  meetingEditMeetingId:string;
  meetingEditMeetingAttendees:any = [];
  meetingEditMeetingInterval:number;

  meetingNewCustomTimer:boolean = false;
  meetingNewMeetingName:string;
  meetingNewMeetingDate:Date;
  meetingNewMeetingTime:String;
  meetingNewMeetingFrequency:String;
  meetingNewMeetingAttendees:any = [this.uID]
  meetingNewMeetingInterval:number;

  activeMeetingAttendeeList:any;
  activeMeetingMilestoneData:any;
  activeMeetingDisplayMilestones:boolean;
  // activeMeetingDisplayIssues:boolean;
  activeMeetingUid:string;

  userAccessList:any = [];
  activeTimer:any = null;

  // Milestone Edit //
  milestoneDueDateEdit:string;
  milestoneMilestoneEdit:string;
  milestoneMileIdEdit:string;
  milestoneStatusEdit:string;
  MilestoneQsIdEdit:string;
  milestoneNoteEdit:string;
  editMilestoneKpiId:string;
  milestoneAssignedEdit:string;
  milestoneAssignedUidEdit:string;
  milestoneRecurringFrequencyEdit:string;
  milestoneRecurringEdit:boolean;
  milestoneEditMilestone:any;

  milliseconds:number = 1000;
  seconds:number = 60
  minutes:number = 60;
  hours:number = 24;

  timerCount:number = 1;
  timerTimeRemainingInt:number;

  milestoneQuarterList:any;

  frequency: RecurringFrequency[] = [
    { value: 'Not Recurring', viewValue: 'Not Recurring' },
    { value: 'Weekly', viewValue: 'Weekly' },
    { value: 'Monthly', viewValue: 'Monthly' },
  ];

  timers:any = [
    { name: 'You (Good News)', duration: 5, display:'5:00' },
    { name: 'Milestones/Rocks', duration: 15, display:'15:00', artifacts:{ milestones: true } },
    { name: 'Issues', duration: 5, display:'5:00' },
    { name: 'Decisions', duration: 60, display:'60:00' },
    { name: 'Conclusion', duration: 5, display:'5:00' }
  ];

  dayOfTheWeek:any = [
    { id: 1, dayOfWeek: 'Sunday' },
    { id: 2, dayOfWeek: 'Monday' },
    { id: 3, dayOfWeek: 'Tuesday' },
    { id: 4, dayOfWeek: 'Wednesday' },
    { id: 5, dayOfWeek: 'Thursday' },
    { id: 6, dayOfWeek: 'Friday' },
    { id: 7, dayOfWeek: 'Saturday' },
  ]

  dayOfTheMonth:any = [
    { id: 1, dayOfTheMonth: 1, display: '1st' },
    { id: 2, dayOfTheMonth: 2, display: '2nd' },
    { id: 3, dayOfTheMonth: 3, display: '3rd' },
    { id: 4, dayOfTheMonth: 4, display: '4th' },
    { id: 5, dayOfTheMonth: 5, display: '5th' },
    { id: 6, dayOfTheMonth: 6, display: '6th' },
    { id: 7, dayOfTheMonth: 7, display: '7th' },
    { id: 8, dayOfTheMonth: 8, display: '8th' },
    { id: 9, dayOfTheMonth: 9, display: '9th' },
    { id: 10, dayOfTheMonth: 10, display: '10th' },
    { id: 11, dayOfTheMonth: 11, display: '11th' },
    { id: 12, dayOfTheMonth: 12, display: '12th' },
    { id: 13, dayOfTheMonth: 13, display: '13th' },
    { id: 14, dayOfTheMonth: 14, display: '14th' },
    { id: 15, dayOfTheMonth: 15, display: '15th' },
    { id: 16, dayOfTheMonth: 16, display: '16th' },
    { id: 17, dayOfTheMonth: 17, display: '17th' },
    { id: 18, dayOfTheMonth: 18, display: '18th' },
    { id: 19, dayOfTheMonth: 19, display: '19th' },
    { id: 20, dayOfTheMonth: 20, display: '20th' },
    { id: 21, dayOfTheMonth: 21, display: '21st' },
    { id: 22, dayOfTheMonth: 22, display: '22nd' },
    { id: 23, dayOfTheMonth: 23, display: '23rd' },
    { id: 24, dayOfTheMonth: 24, display: '24th' },
    { id: 25, dayOfTheMonth: 25, display: '25th' },
    { id: 26, dayOfTheMonth: 26, display: '26th' },
    { id: 27, dayOfTheMonth: 27, display: '27th' },
    { id: 28, dayOfTheMonth: 28, display: '28th' },
    { id: 29, dayOfTheMonth: 29, display: '29th' },
    { id: 30, dayOfTheMonth: 30, display: '30th' },
    { id: 31, dayOfTheMonth: 31, display: '31st' },
  ]

  charp : Charp[] = [
    { value: "C", viewValue: "Change" },
    { value: "H", viewValue: "Help" },
    { value: "A", viewValue: "Aware" },
    { value: "R", viewValue: "Redirect" },
    { value: "P", viewValue: "Plan" },
    { value: "D", viewValue: "Done" }
  ];
  milestoneColumns:any = ['ID','Driver','KPI','Milestone','Due Date','Status','User'];

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions():void {
    this.orgUserListSubscription = this.dataService.getOrganizationUserListData.subscribe(data=>{
      this.orgUserList = data;
    });

    this.dataService.getOrganizationUserList(this.orgID);

    this.dataSubscription.push(this.TeamLevelAllDataService.dataAccessUserListdata.subscribe(data=>{
      this.userAccessList = data;
    }))

    this.TeamLevelAllDataService.getDataAccessUserList(this.uID);

    this.dataSubscription.push(this.DataServiceService.quarterListdata.subscribe(data => {
      this.milestoneQuarterList = data;
    }));

    this.dataSubscription.push(this.dataService.getMeetingUserData.subscribe(data=>{
      this.userMeetingData = data;
    }));

    this.dataService.getUserMeetings(this.uID);

    this.dataSubscription.push(this.IssueDataService.getMeetingIssueData.subscribe((data:any)=>{
        this.issueData = data;
    }));

    this.dataSubscription.push(this.IssueDataService.getUserIssueData.subscribe((data:any)=>{
        this.issueDataFiltered = data;
    }));
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.meetingListSubscription ? this.meetingListSubscription.unsubscribe() : null;
    this.meetingHistoryListSubscription ? this.meetingHistoryListSubscription.unsubscribe() : null;
    this.orgUserListSubscription ? this.orgUserListSubscription.unsubscribe() : null;
    this.deleteMeetingUserSubscription ? this.deleteMeetingUserSubscription.unsubscribe() : null;
    this.timerSubscription.forEach(s=>s.unsubscribe());
    this.dataSubscription.forEach(s=>s.unsubscribe());
    this.postUserMeetingSubscription ? this.postUserMeetingSubscription.unsubscribe() : null;
    this.putUserMeetingSubscription ? this.putUserMeetingSubscription.unsubscribe() : null;
    this.deleteUserMeetingSubscription ? this.deleteUserMeetingSubscription.unsubscribe() : null;
    this.milestoneDataSubscription ? this.milestoneDataSubscription.unsubscribe() : null;
    this.putMeetingHistorySubscription ? this.putMeetingHistorySubscription.unsubscribe(): null;
  }

  launchMeeting(meeting:any):void {
    this.meetingIsLaunched = true;
    this.displayMeetingList = false;
    this.displayAttendeeList = true;
    this.meetingIsPreview = false;
    this.dataSubscription.push(this.dataService.getUserMeetingData(meeting.meetingId).subscribe(data=>{
      if(data){
        this.activeMeeting = meeting;
        this.activeMeetingName = meeting.meeting;
        this.timers = meeting.timerData;
        this.activeMeeting.attendees = data.payload[0].meetingUsers 
        this.activeMeeting.displayIssues = false; 
        this.activeMeeting.activeUser = {};
      } else {
        this.activeMeeting = null;
        this.activeMeetingName = null;
        this.timers = null;
      }
      }))
  }

  viewMeetingDetails(meeting:any):void {
    this.meetingIsPreview = true;
    this.displayMeetingList = true;
    this.previewMeetingId = meeting.meetingId;
    this.dataService.getUserMeetingDataDetail(meeting.meetingId);
  }

  startMeeting(meeting:any) {
    var readyToStart:boolean = true;
    var attendeesPresent:number = 0
    var attendees:any = [];

    for (const a in meeting.attendees){
      if(!meeting.attendees[a].attendeeStatus){
        readyToStart = false;
        notification.notification('Info','All users must be checked into the meeting before starting.',5000)
        return;
      }
    }
    for (const a in meeting.attendees){
      if (meeting.attendees[a].attendeeStatus=='present'){
        attendeesPresent+=1;
      }
    }

    if (attendeesPresent<1){
      readyToStart = false;
      notification.notification('Info','At least one attendee must be present to start the meeting.',5000);
      return;
    }

    for (const d in this.timers){
      if(this.timers[d].artifacts && this.timers[d].artifacts.milestones){
        this.activeMeeting.milestones = true
        this.milestoneDataSubscription = this.dataService.userMilestoneData.subscribe((data:any)=>{
          this.activeMeetingMilestoneData = data && data.length>0 ? this.isNotDone(data).sort((a,b)=>a["Due Date"].localeCompare(b["Due Date"])) : this.isNotDone(data);
        })
      }  
    }
    const meetingBody = { meetingId:meeting.meetingId,meetingName:meeting.meeting,meetingDate:Date.now(),uID:this.uID,timerData:meeting.timerData };
    this.dataSubscription.push(this.dataService.postMeetingHistoryData.pipe(take(1)).subscribe((data:any)=>{
      this.activeMeeting.meetingHistoryId = data.payload.meetingHistoryId;
      this.activeMeeting.meetingDate = data.payload.meetingDate;
      if (data.payload.meetingHistoryId){
        for (const u in this.activeMeeting.attendees){
          attendees.push({ uID: this.activeMeeting.attendees[u].uID, userRole: this.activeMeeting.attendees[u].uID==this.uID ? 'Host' : 'Required', userStatus: this.activeMeeting.attendees[u].attendeeStatus });
        }
        this.dataService.putMeetingUserHistory({ meetingHistoryId:data.payload.meetingHistoryId,attendees:attendees});
      }
    }));
    this.dataService.postMeetingHistory(meetingBody);
    this.meetingInProgress = true;
    this.displayAttendeeList = false;
    this.startAgendaItem(null,0);
  }

  startAgendaItem(agendaItem:any,i:number):void {
    this.timerSubscription.forEach(s=>s.unsubscribe());
    this.activeTimer = this.timers[i];
    this.timers[i].durationSeconds = this.timers[i].timeRemaining ? this.timers[i].timeRemaining : this.timers[i].duration*this.minutes;
    this.timers[i].timeRemaining = this.timers[i].durationSeconds;
    this.timers[i].timeRemainingDisplay=+ this.timers[i].timeRemaining%60<10 ? ('00' + parseInt(((this.timers[i].timeRemaining) / 60).toString()).toString()).slice(-2) + ':0' + (this.timers[i].timeRemaining) % 60 : ('00' + parseInt(((this.timers[i].timeRemaining) / 60).toString()).toString()).slice(-2) + ':' + (this.timers[i].timeRemaining) % 60;
    this.timerSubscription.push(interval(1000).subscribe(x=>{
      this.timers[i].timeRemaining = Math.abs(this.timers[i].durationSeconds - x);
      this.timers[i].timeRemainingDisplay = + this.timers[i].timeRemaining%60<10 ? ('00' + parseInt(((this.timers[i].timeRemaining) / 60).toString()).toString()).slice(-2) + ':0' + (this.timers[i].timeRemaining) % 60 : ('00' + parseInt(((this.timers[i].timeRemaining) / 60).toString()).toString()).slice(-2) + ':' + (this.timers[i].timeRemaining) % 60;
      this.timers[i].timeRemainingDisplay = this.timers[i].durationSeconds<x ? '-' + this.timers[i].timeRemainingDisplay : this.timers[i].timeRemainingDisplay;
      this.timers[i].status = this.timers[i].durationSeconds<x ? 'danger' : this.timers[i].timeRemaining < 6 ? 'danger' : this.timers[i].timeRemaining < 16 ? 'warning' : 'info';
      this.activeTimer = this.timers[i];
    }))
  }

  pauseAgendaItem():void {
    this.timerSubscription.forEach(s=>s.unsubscribe());
  }

  stopMeeting(meetingData:any):void {
    this.meetingInProgress = false;
    this.timerSubscription.forEach(s=>s.unsubscribe());
    this.timerSubscription = [];
    // this.displayMeetingList = true;
  }

  resetTimers(meetingData:any):void {
    if(this.activeMeeting && this.activeMeeting.timerData){
      for (const t in this.activeMeeting.timerData){
        delete this.activeMeeting.timerData[t].timeRemaining;
        delete this.activeMeeting.timerData[t].timeRemainingDisplay;
      }  
    }
  }

  editMeeting(meeting:any):void {
    this.meetingEditMeeting = meeting;
    this.dataSubscription.push(this.dataService.getUserMeetingData(meeting.meetingId).subscribe(data=>{
      if(data){
        this.meetingEditMeetingName = meeting.meeting;
        this.meetingEditMeetingDate = meeting.meetingDate;
        this.meetingEditMeetingTime = meeting.meetingTime;
        this.meetingEditMeetingFrequency = meeting.meetingFrequency;
        this.meetingEditMeetingInterval = parseInt(meeting.meetingInterval);
        this.meetingEditMeetingId = meeting.meetingId;
        this.meetingEditMeetingAttendees = [];
        for (const u in data.payload[0].meetingUsers){
          this.meetingEditMeetingAttendees.push(
            data.payload[0].meetingUsers[u].uID
          )
        }
        meeting.timerData && meeting.timerData.length>0 ? this.meetingEditCustomTimer = true : false;
        this.timerEditArr = meeting.timerData;  
      }
    }))
  }

  showModal(template: TemplateRef<any>,cls:any){
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: cls })  
    ); 
  }

  concludeMeeting(meeting:any):void {
    if(!this.activeMeetingScore || (this.activeMeetingScore<8 && !this.activeMeetingScoreNotes)){
      notification.notification('Error','Remember to score the meeting and enter notes if score is less than 8.',7000);
      return;
    }
    const meetingBody = { meetingHistoryId:meeting.meetingHistoryId,meetingId:meeting.meetingId,meetingName:meeting.meeting,meetingDate:meeting.meetingDate,uID:this.uID,timerData:meeting.timerData,meetingScore:this.activeMeetingScore,scoreNotes:this.activeMeetingScoreNotes,meetingNotes:this.activeMeetingNotes };
    this.putMeetingHistorySubscription = this.dataService.putMeetingHistoryData.pipe(take(1)).subscribe((data:any)=>{
      if(data && data.status=='Success'){
        notification.notification('Success','You have successfully concluded the meeting. Nice work.',5000)
        this.meetingInProgress = false;
        this.meetingIsLaunched = false;
        this.stopMeeting(null);
        this.resetTimers(meeting);
        this.resetMeetingData();
      }
    });
    this.dataService.putMeetingHistory(meetingBody);
    this.displayMeetingList = true;
  }

  exitMeeting(meetingData:any):void {
    this.meetingInProgress = false;
    this.meetingIsLaunched = false;
    this.displayMeetingList = true;
    // this.activeMeetingDisplayIssues = false;
    this.stopMeeting(null);
    this.resetTimers(meetingData);
    this.resetMeetingData();
  }

  updateMeetingData():void {
    var body: any = {};
    var attendees:any = [];

    body = {
      meetingName: this.meetingEditMeetingName,
      meetingDate: this.meetingEditMeetingDate,
      meetingFrequency: this.meetingEditMeetingFrequency,
      meetingInterval: this.meetingEditMeetingInterval,
      meetingId: this.meetingEditMeetingId,
      timerData: this.meetingEditCustomTimer ? this.timerEditArr : this.timers
    }
    for (const a in this.meetingEditMeetingAttendees){
      if (this.meetingEditMeetingAttendees[a] == this.uID){
        attendees.push({uID: this.meetingEditMeetingAttendees[a], userRole:'Host'})
      } else {
        attendees.push({ uID: this.meetingEditMeetingAttendees[a], userRole:'Required'})
      }
    }
    body.attendees = attendees;

    this.putUserMeetingSubscription = this.dataService.putUserMeetingData.pipe(take(1)).subscribe((data:any)=>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          this.dataService.putMeetingUsers(body);
          this.modalRef.hide();
          this.clearModal();
        }
      }
    });
    this.dataService.putUserMeeting(body);
    this.timeoutList();
  }

  goToMeetingArchive():void {
    this.router.navigateByUrl("/meeting/archive");
  }

  createNewMeeting():void {
    var body: any = {}
    var attendees:any = []

    if(this.meetingNewCustomTimer){
      this.timerNewArr[0].artifacts = { milestones: true }
    }

    body = {
      meetingName: this.meetingNewMeetingName,
      meetingDate: this.meetingNewMeetingDate,
      meetingFrequency: this.meetingNewMeetingFrequency,
      meetingInterval: this.meetingNewMeetingInterval,
      uID: this.uID,
      timerData: this.meetingNewCustomTimer ? this.timerNewArr : this.timers
    }

    this.postUserMeetingSubscription = this.dataService.postUserMeetingData.pipe(take(1)).subscribe((data:any)=>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          for (const u in this.meetingNewMeetingAttendees){
            attendees.push({ uID: this.meetingNewMeetingAttendees[u], userRole: this.meetingNewMeetingAttendees[u]==this.uID ? 'Host' : 'Required' })
          //   this.dataService.postMeetingUsers({ meetingName: data.payload.meetingName, meetingId: data.payload.meetingId, uID: this.meetingNewMeetingAttendees[u] });
          }
          this.dataService.putMeetingUsers({ meetingName: data.payload.meetingName, meetingId: data.payload.meetingId, attendees: attendees });
          this.modalRef.hide();
          this.clearNewMeetingFields();
        }
      }
    });
    this.dataService.postUserMeeting(body);
    this.timeoutList();
  }

  clearModal():void {
    this.meetingNewMeetingName = null;
    this.meetingNewMeetingFrequency = null;
    this.meetingNewMeetingDate = null;
    this.meetingNewMeetingAttendees = null;
    this.meetingNewMeetingInterval = null;
    this.meetingNewCustomTimer = false;
  }

  resetMeetingData():void {
    this.conclusionFinished = false;
    this.activeMeetingNotes = null;
    this.activeMeetingScore = 0;
    this.activeMeetingScoreNotes = null;
    this.activeTimer = null;
    this.displayMeetingConclusion = false;
    this.displayMeetingNotes = false;
    this.activeMeetingMilestoneData = null;
    for (const a in this.activeMeeting.attendees){
      delete this.activeMeeting.attendees[a].attendeeStatus
    }
    this.activeMeeting = null;
    this.milestoneDataSubscription ? this.milestoneDataSubscription.unsubscribe() : null;
  }

  timeoutList():void {
    setTimeout(() => {
      this.dataService.getUserMeetings(this.uID);
    }, 1000);
  }

  deleteMeeting(meeting:any):void {
    this.deleteUserMeetingSubscription = this.dataService.deleteUserMeetingData.pipe(take(1)).subscribe((data:any)=>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          this.clearModal();
        }
      }
    });
    this.dataService.deleteUserMeeting(meeting.meetingId);
    this.timeoutList();
  }

  setMeetingNewCustomTimer():void {
    this.meetingNewCustomTimer = !this.meetingNewCustomTimer;
  }

  setMeetingEditCustomTimer(timerData:any):void {
    this.meetingEditCustomTimer = !this.meetingEditCustomTimer;
  }

  createTimer(data:any = null): FormGroup {
    return this.formBuilder.group({
      name: data.name ? data.name : '',
      duration: data.duration ? data.duration : 0,
      display: data.display ? data.display : ''
    })
  }

  addTimer(timerName:string,data:any = null):void {
    if(timerName=='new'){
      this.timerNewArr.push(data);
    }else if (timerName=='edit'){
      this.timerEditArr.push(data);
    }
  }

  removeTimer(timerName:string,i:any):void {
    if(timerName=='new'){
      this.timerNewArr.splice(i,1);
    } else if (timerName=='edit'){
      this.timerEditArr.splice(i,1);
    }
  }

  showAttendeeList():void {
    this.displayAttendeeList = !this.displayAttendeeList;
  }

  assignAttendee(user:any,index:number,attendeeStatus:string):void {
    this.activeMeeting.attendees[index].attendeeStatus = attendeeStatus
    if(this.activeMeeting.meetingHistoryId){
      const userBody = { uID:this.activeMeeting.attendees[index].uID,meetingHistoryId:this.activeMeeting.meetingHistoryId,userStatus:attendeeStatus }
      this.dataService.postMeetingUserHistory(userBody);  
    }
  }

  setTimerDisplay(timerName:string,i:any):void {
    var minutes:number;
    var seconds:number;
    var secondDigit:string;
    var minuteDigit:string;

    if(timerName=='new'){
      seconds = (this.timerNewArr[i].duration*60)%60;
      minutes = (this.timerNewArr[i].duration*60-seconds)/60;
      secondDigit = seconds<10 ? '0' : '';
      minuteDigit = minutes<10 ? '0' : '';
      this.timerNewArr[i].display = minuteDigit + (minutes).toString() + ':' + secondDigit + (seconds).toString();
    } else if (timerName='edit'){
      seconds = (this.timerEditArr[i].duration*60)%60;
      minutes = (this.timerEditArr[i].duration*60-seconds)/60;
      secondDigit = seconds<10 ? '0' : '';
      minuteDigit = minutes<10 ? '0' : '';
      this.timerEditArr[i].display = minuteDigit + (minutes).toString() + ':' + secondDigit + (seconds).toString();
    }
  }

  updateMeetingScore():boolean {
    this.modalRef.hide();
    this.stopMeeting(null);
    return true;
  }

  setMeetingListDisplay():void {
    this.displayMeetingList = !this.displayMeetingList;
    this.meetingIsPreview = false;
  }

  showScoreNotes():void {
  }

  notifyAttendee(user:any):void {
    notification.notification('Info',`We're hoping to have this feature implemented soon.`,5000);
  }

  clearNewMeetingFields():void {
    this.meetingNewMeetingName = null;
    this.meetingNewMeetingFrequency = null;
    this.meetingNewMeetingDate = null;
    this.meetingNewMeetingAttendees = [this.uID]
    this.meetingNewMeetingInterval = null;
    this.meetingNewCustomTimer = false;
    this.timerNewArr = [];
  }

  clearMeetingInterval():void {
    this.meetingEditMeetingInterval = null;
  }

  isNotDone(array){

    var arr:any = [];

    Object.keys(array).forEach(function(i){
      if (array[i].Status!="D"){
        arr.push(array[i]);
      }
    });

    return arr;
  }

  getMilestoneData(a:any):void {
    if(this.meetingInProgress){
      for(const u in this.activeMeeting.attendees){
        this.activeMeeting.attendees[u].selected = false;
        if(a['uID']==this.activeMeeting.attendees[u].uID){
          if(this.isApprovedUser(a.uID)){
              this.activeMeeting.attendees[u].selected = true
          }
        }
      }
      if(!this.activeMeetingUid || this.activeMeetingUid!=a.uID){
        if (this.isApprovedUser(a.uID)){
          this.activeMeetingUid = a.uID;
          this.activeMeeting.activeUser = a;
          this.activeMeeting.activeUser.filterIssues = false;
          this.dataService.getUserMilestones(a.uID);
          this.activeMeetingDisplayMilestones = true;
        } else {
          notification.notification('Info','You are not authorized to view this user\'s milestones.',5000);
          this.activeMeeting.activeUser = null; 
          this.activeMeeting.activeUser = null;
          this.activeMeetingUid = null;
          this.activeMeetingDisplayMilestones = false;
        }
      }else{
        this.activeMeetingDisplayMilestones = !this.activeMeetingDisplayMilestones;
        this.activeMeeting.activeUser = null;
        this.activeMeetingUid = null;
      }
    }
  }

  getIssueData(meetingId:string):void {
    this.activeMeeting.displayIssues = !this.activeMeeting.displayIssues;
    this.IssueDataService.getMeetingIssue(meetingId);
  }

  incrementMeetingScore(direction:string): void {
    
    if(direction=='down'){
      if(this.activeMeetingScore-1<0){
        notification.notification('Info','That must have been a tough meeting. The minimum score is 0, however.',5000)
        return;
      }
      this.activeMeetingScore-=1;
    }else if (direction=='up'){
      if(this.activeMeetingScore+1>10){
        notification.notification('Info','It sounds like you crushed it. We do limit the score to 10, however.',5000)
        return;
      }
      this.activeMeetingScore+=1;
    }
  }

  resetTimer():void {
    this.timers = [
      { name: 'You (Good News)', duration: 5, display:'5:00' },
      { name: 'Milestones/Rocks', duration: 15, display:'15:00', artifacts:{ milestones: true } },
      { name: 'Issues', duration: 5, display:'5:00' },
      { name: 'Decisions', duration: 60, display:'60:00' },
      { name: 'Conclusion', duration: 5, display:'5:00' }
    ];  
    this.meetingNewMeetingAttendees = [this.uID]
  }

  isApprovedUser(uID:string):boolean {
    for (const u in this.userAccessList){
      if (this.userAccessList[u].uID == uID){
        return true;        
      } else if (this.uID == uID){
        return true;
      }
    }
    return false;
  }

  toggleMeetingConclusion():void {
    this.displayMeetingConclusion = !this.displayMeetingConclusion;
  }

  showMeetingConclusion():void {
    this.displayMeetingConclusion = true;
  }
  showAgenda():void {
    this.displayAgenda = !this.displayAgenda;
  }

  showMeetingNotes():void {
    this.displayMeetingNotes = !this.displayMeetingNotes;
  }

  milestoneEdit(template: TemplateRef<any>,cls:any,element: any){
    var body:any = {}

    this.milestoneEditMilestone = element;
    this.milestoneMilestoneEdit = element.Milestone;
    this.milestoneMileIdEdit = element.mileID;
    this.milestoneDueDateEdit = element['Due Date'];
    this.milestoneStatusEdit = element.Status;
    this.milestoneAssignedEdit = element.User;
    this.milestoneAssignedUidEdit = element.uID;
    this.milestoneRecurringEdit = element.recurringFrequency ? true : false;
    this.milestoneRecurringFrequencyEdit = element.recurringFrequency;
    this.milestoneNoteEdit = element.note
    // this.dataservice.getQuarterList(element.uID); // i believe this is still needed. Removing to test progress
    this.updateQuarterList();
    this.editMilestoneKpiId = element.kpiID;

    body.milestone = element.Milestone;
    body.mileID = element.mileID;
    body.dueDate = element['Due Date'];
    body.status = element.Status;
    body.assigned = element.User;
    body.isRecurring = element.recurringFrequency ? true : false;
    body.recurringFrequency = element.recurringFrequency;
    body.note = element.note;
    this.showModal(template,cls);
  }

  setMilestoneRecurringEdit():void {
    this.milestoneRecurringEdit = !this.milestoneRecurringEdit;
    if(!this.milestoneRecurringEdit){
      this.milestoneRecurringFrequencyEdit = null;
    }
  }

  updateMilestoneData():void {

    var milestoneData: any;
    var quarterData: any;
    var frequency:object = {};
    var uID:string;

    uID = this.milestoneEditMilestone.uID

    milestoneData = {
      dueDate: this.milestoneDueDateEdit,
      achieveText: this.milestoneMilestoneEdit,
      mileID: this.milestoneMileIdEdit,
      uID: uID,
      charpStatus: this.milestoneStatusEdit,
      recurringFrequency: this.milestoneRecurringFrequencyEdit,
      milestoneNote: this.milestoneNoteEdit
    }

    quarterData = { qkaID: this.milestoneEditMilestone.qkaID }
    quarterData.uID = uID;

    if(this.milestoneQuarterList && this.milestoneQuarterList.length<1){
      this.dataSubscription.push(this.dataService.postQuarterSplitBulk({ uID: uID }).subscribe(()=>{
        this.updateQuarterList();
      }));
    }

    for (const q in this.milestoneQuarterList){
      if(milestoneData.dueDate>=this.milestoneQuarterList[q].startDate && milestoneData.dueDate<=this.milestoneQuarterList[q].endDate){
        quarterData.qsID = this.milestoneQuarterList[q].qsID
      }
    }

    if(!quarterData.qsID){
      quarterData.qsID = this.milestoneQuarterList[0].qsID
    }

    this.dataSubscription.push(this.dataService.updateMilestone(milestoneData).subscribe(()=>{
      this.dataSubscription.push(this.dataService.updateMilestoneQuarter(quarterData).subscribe(()=>{
        if(this.milestoneRecurringEdit&&this.milestoneStatusEdit=='D'){
          if(this.milestoneRecurringFrequencyEdit=='Weekly'){
            frequency['a'] = 'days';
            frequency['b'] = 7;
            frequency = {days: 7};
          } else if (this.milestoneRecurringFrequencyEdit=='Monthly'){
            frequency['a'] = 'months';
            frequency['b'] = 1;
            frequency = {months: 1};
          } else if (this.milestoneRecurringFrequencyEdit=='Quarterly'){
            frequency['a'] = 'quarters';
            frequency['b'] = 1;
            frequency = {quarters: 1};
          } else if (this.milestoneRecurringFrequencyEdit=='Yearly'){
            frequency['a']='years';
            frequency['b']=1;
            frequency = {years: 1}
          }
          this.createRecurringMilestone(milestoneData.achieveText,this.milestoneEditMilestone.kpiId,DateTime.fromISO(milestoneData.dueDate).plus(frequency).toISODate(),'P',uID,this.uID,milestoneData.recurringFrequency);
        }
        this.dataService.getUserMilestones(uID);
      }))
    }));
    
    this.modalRef.hide();
  }

  updateQuarterList(): void {
    this.DataServiceService.getQuarterList(this.milestoneEditMilestone.uID);
  }

  createRecurringMilestone(achieveText:string,kpiID:string,dueDate:string,charpStatus:string,uID:string,superReferUserID:string,recurringFrequency:string):void {
    var body:Object = {
      achieveText: achieveText,
      kpiID: kpiID,
      dueDate: dueDate,
      charpStatus: charpStatus,
      uID: uID,
      superReferUserID: superReferUserID,
      recurringFrequency: recurringFrequency
    }

    this.dataSubscription.push(this.DataServiceService.postPortfolioMilestoneData.pipe(take(1)).subscribe((data:any) =>{
      if(data){
        notification.notification(data.status,data.msg,5000)
        if(data.status.toLowerCase() == 'success'){
          this.modalRef.hide();
          this.clearModal();
        }
      }
    }));
    this.DataServiceService.postPortfolioMilestone(body);
  }

  getUserIssue():void {
      this.activeMeeting.activeUser.filterIssues = !this.activeMeeting.activeUser.filterIssues
      if(this.activeMeeting.activeUser.filterIssues){
        this.IssueDataService.getMeetingUserIssue(this.activeMeeting.activeUser.uID);
      } else {
        this.IssueDataService.getMeetingIssue(this.activeMeeting.meetingId);
      }
  }

  tabChange(tab){
    if(tab === 'rhythm') {
      this.rythm = true;
      this.custom = false;
      this.completedMeeting = false;
    } else if(tab === 'custom') {
      this.rythm = false;
      this.custom = true;
      this.completedMeeting = false;
    } else {
      this.rythm = false;
      this.custom = false;
      this.completedMeeting = true;
    }
    console.log(': ===> 1111', 1111);
    console.log(': ===> this.completedMeeting , this.custom , this.rythm', this.completedMeeting , this.custom , this.rythm);
  }
}

export interface RecurringFrequency {
  value: string;
  viewValue: string;
}

export interface Charp {
  value: string;
  viewValue: string;
}