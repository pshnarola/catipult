import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';

@Component({
  selector: 'app-portfolio-team-level-corporate',
  templateUrl: './team-level-corporate.component.html',
  styleUrls: ['./team-level-corporate.component.scss']
})
export class PortfolioTeamLevelCorporateComponent implements OnInit {

  milestoneManagerSubscription:Subscription;
  managerKpiDataSubscription:Subscription;
  driverDetailSubscription:Subscription;
  corporateKpiDataSubscription:Subscription;
  activeUserIdSubscription:Subscription;

  currState:number = 0;
  currStateM:number = 0;
  userCurrentIndexM:number = 0;

  depID:string;
  driverID:string;
  toolTipText:string;
  
  milestonemanagers:any = [];
  userKpiDataM:any = [];

  constructor(private dataservice: DataServiceService) { }

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

    this.corporateKpiDataSubscription = this.dataservice.corporateKpiData.subscribe(data => {
      this.userKpiDataM = data;
    });

    this.activeUserIdSubscription = this.dataservice.activeUserIdData.subscribe((data:string)=>{
      this.dataservice.getCorporateKpi(data, this.driverID,'Home-Portfolio-Corporate');
    })

  }

  startupScript():void {
    this.toolTipText = 'This section contains KPIs that have been designated as company-wide by the admin.'
  }

  destroySubscriptions():void {
    this.milestoneManagerSubscription ? this.milestoneManagerSubscription.unsubscribe() : null;
    this.managerKpiDataSubscription ? this.managerKpiDataSubscription.unsubscribe() : null;
    this.driverDetailSubscription ? this.driverDetailSubscription.unsubscribe() : null;
    this.activeUserIdSubscription ? this.activeUserIdSubscription.unsubscribe() : null;
  }

  getKpiM(item, i) {
    this.currStateM = i;
    this.userCurrentIndexM = i;
    this.userKpiDataM = [];

    this.dataservice.getUserKpiAllM(item.uID, this.driverID);
  }
}
