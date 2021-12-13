import { Component, OnInit, Input, TemplateRef } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Subscription } from 'rxjs';
import { take,takeLast } from 'rxjs/operators';

import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';
import { environment } from 'src/environments/environment';

import * as notification from 'src/app/shared/libraries/exports.library';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit {
  modalRef: BsModalRef;

  constructor(private dataservice: DataServiceService, private modalService: BsModalService) { }

  @Input() uID: string;

  coachNameSubscription:Subscription;
  assignmentSubscription:Subscription;
  putUserAssignmentSubscription:Subscription;
  loginUidSubscription:Subscription;
  driverIdSubscription:Subscription;

  coachName:string;
  coachImgUrl:string;
  editAssignmentDescription:string;
  editAssignmentUrl:string;
  editAssignmentStatus:string;
  editAssignmentId:string;
  driverID:string;

  assignmentData:any;
  assignmentColumns:any = ['ID', 'Type','Assignment','Status'];
  status: AssignmentStatus[] = [
    {value: 'Assigned', viewValue: 'Assigned'},
    {value: 'Canceled', viewValue: 'Canceled'},
    {value: 'Completed', viewValue: 'Completed'},
  ];

  ngOnInit() {
    this.setSubscriptions();
    this.startupScript();
  }

  setSubscriptions():void {
    this.coachNameSubscription = this.dataservice.coachInfoData.subscribe((data:any) => {
      if (data){
        this.coachName = data.coachName;
        this.coachImgUrl = environment.imgUrl + '/' + data.coachImg;
      }
    });

    this.assignmentSubscription = this.dataservice.getUserAssignmentData.subscribe(data =>{
        this.assignmentData = data;
    });

    this.driverIdSubscription = this.dataservice.driverIdData.subscribe(data => {
      this.driverID = data.driverID;
    });   
  }

  destroySubscriptions():void {
    this.coachNameSubscription ? this.coachNameSubscription.unsubscribe() : null;
    this.assignmentSubscription ? this.assignmentSubscription.unsubscribe() : null;
    this.putUserAssignmentSubscription ? this.putUserAssignmentSubscription.unsubscribe() : null;
    this.loginUidSubscription ? this.loginUidSubscription.unsubscribe() : null;
    this.driverIdSubscription ? this.driverIdSubscription.unsubscribe() : null;
  }

  startupScript():void {
    this.dataservice.getUserCoach();
  }

  goToAssignment(url:any):void {
    const link = document.createElement('a');

    if(url){
      if (!/^http[s]?:\/\//.test(url)) {
        url = 'http://' + url;
      }
  
      link.target = '_blank';
      link.href = url;
      
      link.setAttribute('visibility', 'hidden');
      link.click();  
    }
  }

  editAssignment(element:any):void {

    this.editAssignmentDescription = element.Assignment;
    this.editAssignmentUrl = element.Url;
    this.editAssignmentStatus = element.Status;
    this.editAssignmentId = element.userAssignmentId

  }

  updateAssignment():void {
    var body:object = {};

    body={
      userAssignmentId:this.editAssignmentId,
      assignmentDisplayText: this.editAssignmentDescription,
      assignmentUrl: this.editAssignmentUrl,
      assignmentStatus: this.editAssignmentStatus
    }

    this.putUserAssignmentSubscription = this.dataservice.putUserResponseData.pipe(take(1)).subscribe((response:any) =>{
      if (response){
        notification.notification(response.status,response.msg,5000)
        if(response.status.toLowerCase() == 'success'){
          this.modalRef.hide();
          this.clearModal();
        }
      }
    })

    this.dataservice.putUserAssignment(body);
    this.timeoutList();

  }

  clearModal():void {
    this.editAssignmentId = '';
    this.editAssignmentDescription = '';
    this.editAssignmentUrl = '';
    this.editAssignmentStatus = '';
  }

  showModal(template: TemplateRef<any>,cls:any){
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: cls })  
    ); 
  }

  timeoutList():void {
    setTimeout(() => {
      this.dataservice.getUserAssignment(this.uID,this.driverID,'coach-timeoutlist');
    }, 1000);
  }
}

export interface AssignmentStatus {
  value: string;
  viewValue: string;
}
