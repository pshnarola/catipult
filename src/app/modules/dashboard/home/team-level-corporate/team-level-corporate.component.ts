import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';
import { SharedDataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-team-level-corporate',
  templateUrl: './team-level-corporate.component.html',
  styleUrls: ['./team-level-corporate.component.scss']
})
export class TeamLevelCorporateComponent implements OnInit {

  corporateKpiDataSubscription:Subscription;
  driverDetailSubscription:Subscription;

  currState:number = 0;
  currStateM:number = 0;
  userCurrentIndexM:number = 0;

  depID:string;
  driverID:string;
  uID:string;
  toolTipText:string;
  milestonemanagers:any = [];
  userKpiDataM:any = [];

  constructor( private dataservice: DataServiceService, private dataService: SharedDataService) { }

  ngOnInit() {
    this.startupScripts();
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

    this.corporateKpiDataSubscription = this.dataservice.corporateKpiData.subscribe(data => {
      this.userKpiDataM = data;
    });

    this.dataservice.getCorporateKpi(this.uID, this.driverID,'Home-Corporate');
  }

  destroySubscriptions():void {
    this.corporateKpiDataSubscription.unsubscribe();
    this.driverDetailSubscription.unsubscribe();
  }

  startupScripts():void {
    this.uID = this.dataService.getUserId()

    this.toolTipText = 'This section contains KPIs that have been designated as company-wide by the admin.'
  }

  getKpiM(item, i) {
    this.currStateM = i;
    this.userCurrentIndexM = i;
    this.userKpiDataM = [];

    this.dataservice.getCorporateKpi(item.uID, this.driverID,'Home-Corporate-getKpiM');
  }

}
