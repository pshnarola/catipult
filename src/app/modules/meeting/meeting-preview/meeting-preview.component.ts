import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";

import { Subscription } from "rxjs";

import { MeetingDataService } from "../data.service";
import { IssueDataService } from "../../issue/data.service";

@Component({
  selector: "app-meeting-preview",
  templateUrl: "./meeting-preview.component.html",
  styleUrls: ["./meeting-preview.component.scss"]
})
export class MeetingPreviewComponent implements OnInit, OnDestroy {
  @Input() previewMeetingId: string;
  @Input() userRole: string;
  @Output() launchMeetingId = new EventEmitter<any>();
  @Output() meetingModify = new EventEmitter<any>();

  constructor(
    private MeetingDataService: MeetingDataService,
    private IssueDataService: IssueDataService
  ) {}

  dataSubscription: Subscription[] = [];

  meetingData: any;
  issueData: Array<boolean> = [];
  milestoneData: Array<boolean> = [];
  issueDataFiltered: Array<boolean> = [];
  milestoneDataFiltered: Array<boolean> = [];

  dayOfTheWeek: any = [
    { id: 1, dayOfWeek: "Sunday" },
    { id: 2, dayOfWeek: "Monday" },
    { id: 3, dayOfWeek: "Tuesday" },
    { id: 4, dayOfWeek: "Wednesday" },
    { id: 5, dayOfWeek: "Thursday" },
    { id: 6, dayOfWeek: "Friday" },
    { id: 7, dayOfWeek: "Saturday" }
  ];

  dayOfTheMonth: any = [
    { id: 1, dayOfTheMonth: 1, display: "1st" },
    { id: 2, dayOfTheMonth: 2, display: "2nd" },
    { id: 3, dayOfTheMonth: 3, display: "3rd" },
    { id: 4, dayOfTheMonth: 4, display: "4th" },
    { id: 5, dayOfTheMonth: 5, display: "5th" },
    { id: 6, dayOfTheMonth: 6, display: "6th" },
    { id: 7, dayOfTheMonth: 7, display: "7th" },
    { id: 8, dayOfTheMonth: 8, display: "8th" },
    { id: 9, dayOfTheMonth: 9, display: "9th" },
    { id: 10, dayOfTheMonth: 10, display: "10th" },
    { id: 11, dayOfTheMonth: 11, display: "11th" },
    { id: 12, dayOfTheMonth: 12, display: "12th" },
    { id: 13, dayOfTheMonth: 13, display: "13th" },
    { id: 14, dayOfTheMonth: 14, display: "14th" },
    { id: 15, dayOfTheMonth: 15, display: "15th" },
    { id: 16, dayOfTheMonth: 16, display: "16th" },
    { id: 17, dayOfTheMonth: 17, display: "17th" },
    { id: 18, dayOfTheMonth: 18, display: "18th" },
    { id: 19, dayOfTheMonth: 19, display: "19th" },
    { id: 20, dayOfTheMonth: 20, display: "20th" },
    { id: 21, dayOfTheMonth: 21, display: "21st" },
    { id: 22, dayOfTheMonth: 22, display: "22nd" },
    { id: 23, dayOfTheMonth: 23, display: "23rd" },
    { id: 24, dayOfTheMonth: 24, display: "24th" },
    { id: 25, dayOfTheMonth: 25, display: "25th" },
    { id: 26, dayOfTheMonth: 26, display: "26th" },
    { id: 27, dayOfTheMonth: 27, display: "27th" },
    { id: 28, dayOfTheMonth: 28, display: "28th" },
    { id: 29, dayOfTheMonth: 29, display: "29th" },
    { id: 30, dayOfTheMonth: 30, display: "30th" },
    { id: 31, dayOfTheMonth: 31, display: "31st" }
  ];

  ngOnInit() {
    this.setSubscriptions();
    // this.getKpiData(this.previewMeetingId);
  }

  setSubscriptions(): void {
    this.dataSubscription.push(
      this.MeetingDataService.getUserMeetingDataDetailData.subscribe(
        (data: any) => {
          this.meetingData = data.payload[0];
          this.meetingData.displayKPI = true;
          this.meetingData.displayIssues = false;
          this.meetingData.displayMilestones = false;
          this.meetingData.selectedUser = null;
        }
      )
    );

    this.MeetingDataService.getUserMeetingDataDetail(this.previewMeetingId);

    this.dataSubscription.push(
      this.IssueDataService.getMeetingIssueData.subscribe((data: any) => {
        this.issueData = data;
      })
    );

    this.dataSubscription.push(
      this.IssueDataService.getUserIssueData.subscribe((data: any) => {
        this.issueDataFiltered = data;
      })
    );

    this.dataSubscription.push(
      this.IssueDataService.getMeetingMilestoneData.subscribe((data: any) => {
        this.milestoneData = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  destroySubscriptions(): void {
    this.dataSubscription.forEach(s => s.unsubscribe());
  }

  getIssueData(meetingId: string): void {
    this.meetingData.displayIssues = true;
    this.meetingData.displayMilestones = false;
    this.meetingData.displayKPI = false;
    this.IssueDataService.getMeetingIssue(meetingId);
  }

  getMilestoneData(meetingID: string): void {
    this.meetingData.displayMilestones = true;
    this.meetingData.displayIssues = false;
    this.meetingData.displayKPI = false;
    this.IssueDataService.getMeetingMilestone(meetingID);
  }

  getKpiData(meetingID: string): void {
    this.meetingData.displayKPI = true;
    this.meetingData.displayMilestones = false;
    this.meetingData.displayIssues = false;
  }

  setFilter(type: string): void {
    if (type == "issues") {
      this.meetingData.selectedUser.filterIssues = !this.meetingData
        .selectedUser.filterIssues;
    } else if (type == "milestones") {
      this.meetingData.selectedUser.filterMilestones = !this.meetingData
        .selectedUser.filterMilestones;
    }
  }

  getUserIssue(): void {
    if (this.meetingData.selectedUser.filterIssues) {
      this.IssueDataService.getMeetingUserIssue(
        this.meetingData.selectedUser.uID
      );
    } else {
      this.IssueDataService.getMeetingIssue(this.meetingData.meetingId);
    }
  }

  getUserMilestone(): void {
    if (this.meetingData.selectedUser.filterMilestones) {
      this.milestoneDataFiltered = this.milestoneData.filter(
        (user: any) => user.uID === this.meetingData.selectedUser.uID
      );
    } else {
      this.milestoneDataFiltered = []; // does this cause issues?
      this.IssueDataService.getMeetingMilestone(this.meetingData.meetingId);
    }
  }

  setSelectedUser(user: Object): void {
    for (const u in this.meetingData.meetingUsers) {
      if (user["uID"] == this.meetingData.meetingUsers[u].uID) {
        if (
          this.meetingData.selectedUser &&
          user["uID"] == this.meetingData.selectedUser.uID
        ) {
          this.meetingData.meetingUsers[u].selected = false;
        } else {
          this.meetingData.meetingUsers[u].selected = true;
        }
      } else {
        this.meetingData.meetingUsers[u].selected = false;
      }
    }
    let filterIssues =
      this.meetingData.selectedUser &&
      this.meetingData.selectedUser.filterIssues
        ? this.meetingData.selectedUser.filterIssues
        : false;
    let filterMilestones =
      this.meetingData.selectedUser &&
      this.meetingData.selectedUser.filterMilestones
        ? this.meetingData.selectedUser.filterMilestones
        : false;
    this.meetingData.selectedUser = user;
    this.meetingData.selectedUser.filterIssues = filterIssues;
    this.meetingData.selectedUser.filterMilestones = filterMilestones;
    this.getUserIssue();
    this.getUserMilestone();
  }

  launchMeeting(meetingId: any) {
    var obj = {
      attendees: null,
      meeting: this.meetingData.meetingName,
      meetingDate: this.meetingData.meetingDate,
      meetingFrequency: this.meetingData.meetingFrequency,
      meetingId: meetingId,
      meetingInterval: this.meetingData.meetingInterval,
      timerData: this.meetingData.timerData,
      userRole: this.userRole
    };
    this.launchMeetingId.emit(obj);
  }

  manageMeeting(type: string) {
    if (type === "edit") {
      this.meetingModify.emit("edit");
    } else if ("delete") {
      this.meetingModify.emit("delete");
    }
  }
}
