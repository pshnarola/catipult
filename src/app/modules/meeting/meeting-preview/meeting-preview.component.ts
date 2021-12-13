import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { MeetingDataService } from '../data.service'
import { IssueDataService } from '../../issue/data.service'

@Component({
  selector: 'app-meeting-preview',
  templateUrl: './meeting-preview.component.html',
  styleUrls: ['./meeting-preview.component.scss']
})

export class MeetingPreviewComponent implements OnInit,OnDestroy {

  @Input() previewMeetingId:string;

  constructor(private MeetingDataService: MeetingDataService, private IssueDataService: IssueDataService ) { }

  dataSubscription:Subscription[] = [];

  meetingData:any;
  issueData:Array<boolean> = [];
  milestoneData:Array<boolean> = [];
  issueDataFiltered:Array<boolean> = [];
  milestoneDataFiltered:Array<boolean> = [];

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions():void {
    this.dataSubscription.push(this.MeetingDataService.getUserMeetingDataDetailData.subscribe((data:any)=>{
      this.meetingData = data.payload[0];
      this.meetingData.displayIssues = false;
      this.meetingData.displayMilestones = false;
      this.meetingData.selectedUser = null;
    }))

    this.MeetingDataService.getUserMeetingDataDetail(this.previewMeetingId);

    this.dataSubscription.push(this.IssueDataService.getMeetingIssueData.subscribe((data:any)=>{
      this.issueData = data;
    }));

    this.dataSubscription.push(this.IssueDataService.getUserIssueData.subscribe((data:any)=>{
        this.issueDataFiltered = data;
    }));

    this.dataSubscription.push(this.IssueDataService.getMeetingMilestoneData.subscribe((data:any)=>{
      this.milestoneData = data;
    }));
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.dataSubscription.forEach(s=>s.unsubscribe());
  }

  getIssueData(meetingId:string):void {
    this.meetingData.displayIssues = !this.meetingData.displayIssues;
    this.meetingData.displayMilestones = false;
    this.IssueDataService.getMeetingIssue(meetingId);
  }

  getMilestoneData(meetingID:string):void {
    this.meetingData.displayMilestones = !this.meetingData.displayMilestones;
    this.meetingData.displayIssues = false;
    this.IssueDataService.getMeetingMilestone(meetingID);
  }

  setFilter(type:string):void {
    if(type=='issues'){
      this.meetingData.selectedUser.filterIssues = !this.meetingData.selectedUser.filterIssues
    }else if (type=='milestones'){
      this.meetingData.selectedUser.filterMilestones = !this.meetingData.selectedUser.filterMilestones
    }
  }

  getUserIssue():void {
    if(this.meetingData.selectedUser.filterIssues){
      this.IssueDataService.getMeetingUserIssue(this.meetingData.selectedUser.uID);
    } else {
      this.IssueDataService.getMeetingIssue(this.meetingData.meetingId);
    }
  }

  getUserMilestone():void {
    if(this.meetingData.selectedUser.filterMilestones){
      this.milestoneDataFiltered = this.milestoneData.filter((user:any)=>user.uID===this.meetingData.selectedUser.uID)
    } else {
      this.milestoneDataFiltered = [] // does this cause issues?
      this.IssueDataService.getMeetingMilestone(this.meetingData.meetingId);
    }
  }

  setSelectedUser(user:Object):void {
    for(const u in this.meetingData.meetingUsers){
      if(user['uID']==this.meetingData.meetingUsers[u].uID){
        if(this.meetingData.selectedUser && user['uID']==this.meetingData.selectedUser.uID){
          this.meetingData.meetingUsers[u].selected = false
        } else {
          this.meetingData.meetingUsers[u].selected = true
        }
      } else {
        this.meetingData.meetingUsers[u].selected = false
      }
    }
    let filterIssues = this.meetingData.selectedUser && this.meetingData.selectedUser.filterIssues ? this.meetingData.selectedUser.filterIssues : false;
    let filterMilestones = this.meetingData.selectedUser && this.meetingData.selectedUser.filterMilestones ? this.meetingData.selectedUser.filterMilestones : false;
    this.meetingData.selectedUser = user;
    this.meetingData.selectedUser.filterIssues = filterIssues
    this.meetingData.selectedUser.filterMilestones = filterMilestones
    this.getUserIssue();
    this.getUserMilestone();
  }

}
