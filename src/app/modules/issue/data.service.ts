import { OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Subject, Observable, Subscription } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service'

export class IssueDataService implements OnDestroy{

  constructor (private http: HttpClient, private apiService: HttpServiceService, private dataService: SharedDataService) {}

  dataSubscription:Subscription[] = [];
  
  private getUserIssueDataSource = new Subject();
  public getUserIssueData = this.getUserIssueDataSource.asObservable();

  private getUserMilestoneDataSource = new Subject();
  public getUserMilestoneData = this.getUserMilestoneDataSource.asObservable();

  private getMeetingIssueDataSource = new Subject();
  public getMeetingIssueData = this.getMeetingIssueDataSource.asObservable();

  private getMeetingMilestoneDataSource = new Subject();
  public getMeetingMilestoneData = this.getMeetingMilestoneDataSource.asObservable();

  getMeetingUserIssue(uID:string):void {
    this.dataSubscription.push(this.apiService.get(`/v1/issue?uID=${uID}`).subscribe(response=>{
      this.getUserIssueDataSource.next(response.payload);
    }));
  }

  getMeetingIssue(meetingId:string):void {
    this.dataSubscription.push(this.apiService.get(`/v1/issueByMeeting?meetingId=${meetingId}`).subscribe(response=>{
      this.getMeetingIssueDataSource.next(response.payload);
    }));
  }

  getMeetingMilestone(meetingId:string):void {
    this.dataSubscription.push(this.apiService.get(`/v1/milestoneByMeeting?meetingId=${meetingId}`).subscribe(response=>{
      this.getMeetingMilestoneDataSource.next(response.payload);
    }));
  }


  postUserIssue(body:any):Observable<any> {
    return this.apiService.post(`/v1/issue`,body);
  }

  putUserIssue(body:any):Observable<any> {
    return this.apiService.put(`/v1/issue`,body);
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.dataSubscription.forEach(s=>s.unsubscribe());
  }
}