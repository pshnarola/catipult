import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.scss']
})
export class MeetingDetailComponent implements OnInit {

  @Input() meetingData:any;

  constructor() { }

  ngOnInit() {
  }

}
