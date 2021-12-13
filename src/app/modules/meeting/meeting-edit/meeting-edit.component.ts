import { Component, OnInit, TemplateRef  } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.scss']
})
export class MeetingEditComponent implements OnInit {

  modalRef: BsModalRef;

  kpiEditIsCorporate:boolean = false;
  kpiObjectiveEdit:any;
  kpiQuantityEdit:number;
  kpiUnitEdit:string;
  userRole:string;
  driverName:string;
  kpiAchievedQuantityEdit:number;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  setKpiCorporateEdit():void {
    console.log('set KPI');
  }

  updateMeetingData():void {
    console.log('updateMeetingData');
  }

  showModal():void {
    console.log('show modal');
  }
}
