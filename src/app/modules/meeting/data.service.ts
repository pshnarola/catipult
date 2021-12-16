import { OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Subject, Observable, Subscription } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service'

export class MeetingDataService implements OnDestroy{

  constructor (private http: HttpClient, private apiService: HttpServiceService, private dataService: SharedDataService) {}

  dataSubscription:Subscription[] = [];
  getOrganizationUserListSubscription:Subscription;
  getUserMeetingDataSubscription:Subscription;
  postUserMeetingDataSubscription:Subscription;
  postMeetingUserDataSubscription:Subscription;
  deleteMeetingUserDataSubscription:Subscription;
  putUserMeetingDataSubscription:Subscription;
  putMeetingUsersDataSubscription:Subscription;
  deleteUserMeetingDataSubscription:Subscription;
  putMeetingHistorySubscription:Subscription;
  postMeetingHistorySubscription:Subscription;
  getMeetingHistorySubscription:Subscription;
  userMilestonesSubscription:Subscription;
  postMeetingUserHistorySubscription:Subscription;
  
  private meetingDataDemoSource = new Subject();
  public meetingDemoData = this.meetingDataDemoSource.asObservable();

  private getOrganizationUserListDataSource = new Subject();
  public getOrganizationUserListData = this.getOrganizationUserListDataSource.asObservable();

  private meetingHistoryDataSource = new Subject();
  public meetingHistoryData = this.meetingHistoryDataSource.asObservable();

  private userListDataSource = new Subject();
  public userListData = this.userListDataSource.asObservable();

  private postUserMeetingDataSource = new Subject();
  public postUserMeetingData = this.postUserMeetingDataSource.asObservable();

  private postMeetingUserDataSource = new Subject();
  public postMeetingUserData = this.postMeetingUserDataSource.asObservable();

  private deleteMeetingUserDataSource = new Subject();
  public deleteMeetingUserData = this.deleteMeetingUserDataSource.asObservable();

  private putUserMeetingDataSource = new Subject();
  public putUserMeetingData = this.putUserMeetingDataSource.asObservable();

  private putMeetingUsersDataSource = new Subject();
  public putMeetingUsersData = this.putMeetingUsersDataSource.asObservable();

  private deleteUserMeetingDataSource = new Subject();
  public deleteUserMeetingData = this.deleteUserMeetingDataSource.asObservable();

  private putMeetingHistoryDataSource = new Subject();
  public putMeetingHistoryData = this.putMeetingHistoryDataSource.asObservable();

  private postMeetingHistoryDataSource = new Subject();
  public postMeetingHistoryData = this.postMeetingHistoryDataSource.asObservable();

  private getMeetingHistoryDataSource = new Subject();
  public getMeetingHistoryData = this.getMeetingHistoryDataSource.asObservable();

  private userMilestoneDataSource = new Subject();
  public userMilestoneData = this.userMilestoneDataSource.asObservable();

  private postMeetingUserHistoryDataSource = new Subject();
  public postMeetingUserHistoryData = this.postMeetingUserHistoryDataSource.asObservable();

  private putMeetingUserHistoryDataSource = new Subject();
  public putMeetingUserHistoryData = this.putMeetingUserHistoryDataSource.asObservable();

  private getMeetingUserDataSource = new Subject();
  public getMeetingUserData = this.getMeetingUserDataSource.asObservable();

  public getUserMeetingDataDetailDataSource = new Subject();
  public getUserMeetingDataDetailData = this.getUserMeetingDataDetailDataSource.asObservable();

  data:any = [{
    meeting: "Executive Leadership Team",
    meetingId: '1636dfcb-d6e3-4bad-9c9b-9b27c27dd107',
    organizer: 'Karen Smith',
    meetingDate: '2021-04-27T08:13:24.214Z',
    meetingFrequency: 'Weekly',
    attendees: [
      {
        uID: 'testUser9',
        name: 'TestUser9',
        department: "Finance",
        position: "Chief Financial Officer"
      },
      {
        uID: 'TestUser1',
        name: 'TestUser1',
        department: "Engineering",
        position: "Chief Operations Officer"
      },
      {
        uID: 'TestUser4',
        name: 'TestUser4',
        department: "Marketing",
        position: "Chief Revenue Officer"
      }
    ]
  },
  {
    meeting: "Senior Leadership Team",
    meetingId: 'e59db4f5-f6ef-43c6-8e37-d40064d39ec8',
    organizer: 'Acme Jake',
    orgID: '74a52879-bb1b-401a-9562-527fa1e08569',
    meetingDate: '4/31/2021 16:00:00',
    meetingFrequency: 'Weekly',
    attendees: [
      {
        name: 'TestUser9',
        department: "Finance",
        position: "VP, Finance"
      },
      {
        name: 'TestUser1',
        department: "Accounting",
        position: "Corporate Controller"
      },
      {
        name: 'TestUser4',
        department: "Finance",
        position: "Director, Finance"
      }
    ]
  }];

  historyData:any = [{
    meeting: "Executive Leadership Team",
    meetingId: '1636dfcb-d6e3-4bad-9c9b-9b27c27dd107',
    organizer: 'Karen Smith',
    orgID: '74a52879-bb1b-401a-9562-527fa1e08569',
    meetingDate: '4/16/2021 14:57:00',
    meetingFrequency: 'Weekly',
    attendees: [
      {
        uID: 'testUser9',
        name: 'TestUser9',
        department: "Finance",
        position: "Chief Financial Officer"
      },
      {
        uID: 'TestUser1',
        name: 'TestUser1',
        department: "Engineering",
        position: "Chief Operations Officer"
      },
      {
        uID: 'TestUser4',
        name: 'TestUser4',
        department: "Marketing",
        position: "Chief Revenue Officer"
      }
    ]
  },
  {
    meeting: "Executive Leadership Team",
    meetingId: '1636dfcb-d6e3-4bad-9c9b-9b27c27dd107',
    organizer: 'Karen Smith',
    orgID: '74a52879-bb1b-401a-9562-527fa1e08569',
    meetingDate: '4/23/2021 14:57:00',
    meetingFrequency: 'Weekly',
    attendees: [
      {
        uID: 'testUser10',
        name: 'TestUser10',
        department: "Accounting",
        position: "Director, Corporate Accounting"
      },
      {
        uID: 'TestUser11',
        name: 'TestUser1',
        department: "Security",
        position: "Chief Security Officer"
      },
      {
        uID: 'TestUser42',
        name: 'TestUser42',
        department: "Marketing",
        position: "Vice President, Sales"
      }
    ]
  },
  {
    meeting: "Executive Leadership Team",
    meetingId: '1636dfcb-d6e3-4bad-9c9b-9b27c27dd107',
    organizer: 'Karen Smith',
    orgID: '74a52879-bb1b-401a-9562-527fa1e08569',
    meetingDate: '4/30/2021 14:57:00',
    meetingFrequency: 'Weekly',
    attendees: [
      {
        uID: 'testUser9',
        name: 'TestUser9',
        department: "Finance",
        position: "Chief Financial Officer",
        inAttendance: true
      },
      {
        uID: 'Karen Smith',
        name: 'Karen Smith',
        department: 'admin',
        position: 'CEO',
        inAttendance: true
      },
      {
        uID: 'TestUser1',
        name: 'TestUser1',
        department: "Engineering",
        position: "Chief Operations Officer",
        inAttendance: false
      },
      {
        uID: 'TestUser4',
        name: 'TestUser4',
        department: "Marketing",
        position: "Chief Revenue Officer",
        inAttendance: true
      },
      {
        uID: 'TestUser44',
        name: 'TestUser44',
        department: "Marketing",
        position: "Chief Revenue Officer",
        inAttendance: true
      },
      {
        uID: 'TestUser46',
        name: 'TestUser46',
        department: "Marketing",
        position: "Chief Revenue Officer",
        inAttendance: true
      },
      {
        uID: 'TestUser49',
        name: 'TestUser49',
        department: "Marketing",
        position: "Chief Revenue Officer",
        inAttendance: true
      }
    ]
  }];
  
  getDemoMeetingData():void {
    this.meetingDataDemoSource.next(this.data);
  }

  getDemoMeetingHistoryData():void {
    this.meetingHistoryDataSource.next(this.historyData);
  }

  getUserMeetingData(meetingId:string):Observable<any> {
    return this.apiService.get(`/v1/meeting?meetingId=${meetingId}`)
  }

  getUserMeetingDataDetail(meetingId:string):void {
    this.dataSubscription.push(this.apiService.get(`/v1/meeting?meetingId=${meetingId}`).subscribe(response=>{
      this.getUserMeetingDataDetailDataSource.next(response);
    }));
  }

  postUserMeeting(body:any):void {
    this.dataSubscription.push(this.apiService.post(`/v1/meeting`,body).subscribe(response=>{
      this.postUserMeetingDataSource.next(response);
    }));
  }

  postMeetingUsers(body:any):void {
    this.dataSubscription.push(this.apiService.post(`/v1/meetingUser`,body).subscribe(response=>{
      this.postMeetingUserDataSource.next(response);
    }));
  }

  deleteMeetingUsers(meetingUserId:string):void {
    this.dataSubscription.push(this.apiService.delete(`/v1/meetingUser?meetingUserId=${meetingUserId}`).subscribe(response=>{
      this.deleteMeetingUserDataSource.next(response);
    }));
  }

  putUserMeeting(body:any):void {
    this.dataSubscription.push(this.apiService.put(`/v1/meeting`,body).subscribe(response=>{
      this.putUserMeetingDataSource.next(response);
    }));
  }

  putMeetingUsers(body:any):void {
    this.dataSubscription.push(this.apiService.put(`/v1/meetingUser`,body).subscribe(response=>{
      this.putMeetingUsersDataSource.next(response);
    }));
  }

  deleteUserMeeting(meetingId:string):void {
    this.dataSubscription.push(this.apiService.delete(`/v1/meeting?meetingId=${meetingId}`).subscribe(response=>{
      this.deleteUserMeetingDataSource.next(response);
    }));
  }

  getOrganizationUserList(orgID:string):void {
    var data:any = [];

    this.dataSubscription.push(this.apiService.get(`/v1/organizationUserList?orgID=${orgID}`).subscribe(response=>{
      for (const u in response.payload){
        data.push({
          uID: response.payload[u].uID,
          name: response.payload[u].name,
          lname: response.payload[u].lname
        })
      }
      this.getOrganizationUserListDataSource.next(data);
    }));
  }

  putMeetingHistory(body:any):void {
    this.dataSubscription.push(this.apiService.put(`/v1/meetingHistory`,body).subscribe(response=>{
      this.putMeetingHistoryDataSource.next(response);
    }));
  }

  postMeetingHistory(body:any):void {
    this.dataSubscription.push(this.apiService.post(`/v1/meetingHistory`,body).subscribe(response=>{
      this.postMeetingHistoryDataSource.next(response);
    }));
  }

  getMeetingHistory(uID:string):void {
    var data:any = [];
    this.dataSubscription.push(this.apiService.get(`/v1/meetingHistory?uID=${uID}`).subscribe(response=>{
      for (const d in response.payload){
        data.push({
          meetingId: response.payload[d].meetingId,
          meetingName: response.payload[d].meetingName,
          meetingFrequency: response.payload[d].meetingFrequency,
          isActive: !response.payload[d].deactivationDate ? true : false,
          meetingHistory: response.payload[d].meetingHistories
        })
      }
      this.getMeetingHistoryDataSource.next(data);
    }));
  }

  getUserMilestones(uID:string):void {
    var data:any = [];
    this.dataSubscription.push(this.apiService.get(`/v1/userMilestones?uID=${uID}`).subscribe(response => {
        for (const key in response.payload) {
            if (response.payload[key].charpStatus!='D'){
                data.push({
                    ID: parseInt(key)+1,
                    Milestone: response.payload[key].achieveText,
                    "Due Date": response.payload[key].dueDate,
                    KPI: response.payload[key].Kpi ? response.payload[key].Kpi.objective : null,
                    Driver: response.payload[key].Kpi ? response.payload[key].Kpi.Driver.driverName : null,
                    kpiId: response.payload[key].Kpi ? response.payload[key].Kpi.kpiID : null,
                    Status: response.payload[key].charpStatus,
                    User: response.payload[key].User.name + ' ' + response.payload[key].User.lname,
                    uID: response.payload[key].User.uID,
                    mileID: response.payload[key].mileID,
                    recurringFrequency: response.payload[key].recurringFrequency,
                    note: response.payload[key].milestoneNote,
                    qkaID: response.payload[key].QuarterKpiAssigns[0].qkaID,
                    qsID: response.payload[key].QuarterKpiAssigns[0].qsID
                })    
            }
        }
    this.userMilestoneDataSource.next(data);
    }));
  }

  postMeetingUserHistory(body:any):void {
    this.dataSubscription.push(this.apiService.post(`/v1/meetingUserHistory`,body).subscribe(response=>{
      this.postMeetingUserHistoryDataSource.next(response);
    }));
  }

  putMeetingUserHistory(body:any):void {
    this.dataSubscription.push(this.apiService.put(`/v1/meetingUserHistory`,body).subscribe(response=>{
      this.putMeetingUserHistoryDataSource.next(response);
    }));
  }

  postQuarterSplitBulk(body: any): Observable<any> {
    return this.apiService.post("/v1/quarterSplitBulk", body);
  }

  updateMilestone(data): Observable<any> {
    return this.apiService.put("/v1/milesstone", data);
  }

  updateMilestoneQuarter(data): Observable<any>{
    return this.apiService.put('/v1/updateMilestoneQuarter',data);
  }

  deleteMeetingHistory(meetingHistoryId): Observable<any>{
    return this.apiService.delete(`/v1/meetingHistory?meetingHistoryId=${meetingHistoryId}`);
  }

  getUserMeetings(uID:string):void {
    var data:any = [];
    this.dataSubscription.push(this.apiService.get(`/v1/meetingUser?uID=${uID}`).subscribe(response => {
          for (const key in response.payload) {
                data.push({
                  attendees:null,
                  meeting:response.payload[key].meeting.meetingName,
                  meetingUserId:response.payload[key].meetingUserId,
                  meetingDate:response.payload[key].meeting.meetingDate,
                  meetingFrequency:response.payload[key].meeting.meetingFrequency,
                  meetingId:response.payload[key].meeting.meetingId,
                  meetingInterval:response.payload[key].meeting.meetingInterval,
                  timerData:response.payload[key].meeting.timerData,
                  userRole: response.payload[key].userRole
                })    
            }
    this.getMeetingUserDataSource.next(data);
    }));
  }


  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.dataSubscription.forEach(s=>s.unsubscribe());
    this.getUserMeetingDataSubscription ? this.getUserMeetingDataSubscription.unsubscribe() : null;
    this.getOrganizationUserListSubscription ? this.getOrganizationUserListSubscription.unsubscribe() : null;
    this.postUserMeetingDataSubscription ? this.postUserMeetingDataSubscription.unsubscribe() : null;
    this.postMeetingUserDataSubscription ? this.postMeetingUserDataSubscription.unsubscribe() : null;
    this.deleteMeetingUserDataSubscription ? this.deleteMeetingUserDataSubscription.unsubscribe() : null;
    this.putUserMeetingDataSubscription ? this.putUserMeetingDataSubscription.unsubscribe() : null;
    this.putMeetingUsersDataSubscription ? this.putMeetingUsersDataSubscription.unsubscribe() : null;
    this.deleteUserMeetingDataSubscription ? this.deleteUserMeetingDataSubscription.unsubscribe() : null;
    this.postMeetingHistorySubscription ? this.postMeetingHistorySubscription.unsubscribe() : null;
    this.putMeetingHistorySubscription ? this.putMeetingHistorySubscription.unsubscribe() : null;
    this.getMeetingHistorySubscription ? this.getMeetingHistorySubscription.unsubscribe() : null;
    this.userMilestonesSubscription ? this.userMilestonesSubscription.unsubscribe() : null;
    this.postMeetingUserHistorySubscription ? this.postMeetingUserHistorySubscription.unsubscribe() : null;
  }
}