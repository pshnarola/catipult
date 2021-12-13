import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';

@Component({
  selector: 'app-team-level-zero',
  templateUrl: './team-level-zero.component.html',
  styleUrls: ['./team-level-zero.component.scss']
})
export class TeamLevelZeroComponent implements OnInit {

  milestoneManagerSubscription:Subscription;
  managerKpiDataSubscription:Subscription;
  driverDetailSubscription:Subscription;

  currState:number = 0;
  currStateM:number = 0;
  userCurrentIndexM:number = 0;

  depID:string;
  driverID:string;

  milestonemanagers:any = [];
  userKpiDataM:any = [];

  constructor( private dataservice: DataServiceService) { }

  ngOnInit() {
    this.setSubscriptions();
  }

  ngOnDestroy(){
    this.destroySubscriptions();
  }

  setSubscriptions():void {

    this.depID = this.dataservice.getUserInfoList();
    this.driverDetailSubscription = this.dataservice.driverIdData.subscribe(data => {
      if(data){
        this.driverID = data.driverID
      }
    });

    this.milestoneManagerSubscription = this.dataservice.mileStoneManagerUsersdata.subscribe(data => {
      if (data) {
        this.milestonemanagers = data;
      }
    });

    this.managerKpiDataSubscription = this.dataservice.kpiListdataM.subscribe(data => {
      this.userKpiDataM = data;
    });

  }

  destroySubscriptions():void {
    this.milestoneManagerSubscription.unsubscribe();
    this.managerKpiDataSubscription.unsubscribe();
    this.driverDetailSubscription.unsubscribe();
  }

  getKpiM(item, i) {
    this.currStateM = i;
    this.userCurrentIndexM = i;
    this.userKpiDataM = [];

    console.log(this.depID);
    this.dataservice.getUserKpiAllM(item.uID, this.driverID);
  }
}
