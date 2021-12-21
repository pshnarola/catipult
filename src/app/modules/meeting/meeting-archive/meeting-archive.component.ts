import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { Router } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

import { Subscription } from "rxjs";
import { take } from "rxjs/operators";

import { MeetingDataService } from "../data.service";
import { SharedDataService } from "src/app/shared/services/data.service";

import * as notification from "src/app/shared/libraries/exports.library";

@Component({
  selector: "app-meeting-archive",
  templateUrl: "./meeting-archive.component.html",
  styleUrls: ["./meeting-archive.component.scss"]
})
export class MeetingArchiveComponent implements OnInit, OnDestroy {
  @Output() activeTab = new EventEmitter<any>();

  constructor(
    private router: Router,
    private dataService: MeetingDataService,
    private SharedDataService: SharedDataService,
    private BreakpointObserver: BreakpointObserver
  ) {}

  meetingHistoryListSubscription: Subscription;
  getMeetingHistorySubscription: Subscription;
  dataSubscription: Subscription[] = [];

  displayMeetingDetail: boolean = false;
  displayMeetingHistory: boolean = true;
  displayDeleteMeeting: boolean = false;
  fullDisplay: boolean = false;

  deleteMeetingText: string = "";

  uID: string = this.SharedDataService.getUserId();
  orgID: string = this.SharedDataService.getUserOrgId();

  meetingHistory: any;
  meetingHistoryData: any;
  activeMeetingData: any;

  selectedMeetingId: any;
  selectedMeetingHistoryId: any;

  ngOnInit() {
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this.meetingHistoryListSubscription
      ? this.meetingHistoryListSubscription.unsubscribe()
      : null;
  }

  setSubscriptions(): void {
    this.getMeetingHistorySubscription = this.dataService.getMeetingHistoryData.subscribe(
      data => {
        this.meetingHistoryData = data;
        this.setActiveUserMeetingRole();
      }
    );

    this.dataService.getMeetingHistory(this.uID);

    this.dataSubscription.push(
      this.BreakpointObserver.observe(["(min-width:992px)"]).subscribe(
        result => {
          if (result.matches) {
            this.fullDisplay = true;
          } else {
            this.fullDisplay = false;
          }
        }
      )
    );
  }

  goToActiveMeetings(): void {
    this.router.navigateByUrl("/meeting/home");
  }

  showMeetingDetail(meeting: any): void {
    console.log(meeting);

    this.displayMeetingDetail = true;
    this.displayMeetingHistory = this.fullDisplay;
    this.activeMeetingData = meeting;
    this.selectedMeetingHistoryId = meeting.meetingHistoryId;
  }

  setMeetingArchiveDisplay(): void {
    this.displayMeetingHistory = !this.displayMeetingHistory;
    this.displayMeetingDetail = false;
  }

  deleteMeetingPrompt(item1: number, item2: number): void {
    this.displayDeleteMeeting = !this.displayDeleteMeeting;
    if (!this.displayDeleteMeeting) {
      delete this.meetingHistoryData[item1].meetingHistory[item2].deleteStatus;
    } else {
      this.meetingHistoryData[item1].meetingHistory[item2].deleteStatus = "";
    }
  }

  deleteMeeting(element): void {
    var body: any = {};
    body = {
      meetingHistoryId: element.meetingHistoryId
    };
    this.dataSubscription.push(
      this.dataService
        .deleteMeetingHistory(element.meetingHistoryId)
        .pipe(take(1))
        .subscribe((data: any) => {
          if (data) {
            notification.notification(data.status, data.msg, 5000);
            if (data.status.toLowerCase() == "success") {
              this.dataService.getMeetingHistory(this.uID);
              this.clearDelete();
            }
          }
        })
    );
  }

  clearDelete(): void {
    this.displayDeleteMeeting = false;
    this.deleteMeetingText = "";
  }

  expandMeeting(i: number): void {
    if (
      !this.meetingHistoryData[i].display ||
      this.meetingHistoryData[i].display == "collapsed"
    ) {
      this.meetingHistoryData[i].display = "expanded";
    } else {
      this.meetingHistoryData[i].display = "collapsed";
    }
  }

  setActiveUserMeetingRole(): void {
    for (const m in this.meetingHistoryData) {
      for (const mh in this.meetingHistoryData[m].meetingHistory) {
        for (const muh in this.meetingHistoryData[m].meetingHistory[mh]
          .meetingUserHistories) {
          if (
            this.meetingHistoryData[m].meetingHistory[mh].meetingUserHistories[
              muh
            ].uID == this.uID
          ) {
            this.meetingHistoryData[m].meetingHistory[
              mh
            ].userRole = this.meetingHistoryData[m].meetingHistory[
              mh
            ].meetingUserHistories[muh].userRole;
          }
        }
      }
    }
  }

  getPresentUser(users: any) {
    let count = users.filter(x => x.userStatus == "present").length;
    return count;
  }

  getMeetingHistory(meetingId: any) {
    this.selectedMeetingId = meetingId;
    const result = this.meetingHistoryData.find(
      element => element.meetingId === meetingId
    );
    this.meetingHistory = result;
    this.displayMeetingDetail = false;
    this.activeMeetingData = null;
  }

  tabChange(tab: any) {
    console.log(tab);
    this.activeTab.emit(tab);
  }
}
