import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';

@Component({
  selector: 'app-dashboard-charp',
  templateUrl: './charp.component.html',
  styleUrls: ['./charp.component.scss']
})

export class CharpComponent implements OnInit {

  driverIdSubscription:Subscription;
  dashStatusSubscription:Subscription;

  cCount: number;
  hCount: number;
  aCount: number;
  rCount: number;
  pCount: number;
  dCount:number;
  total:number;

  driverID:string; 

  dashStatus:any;

  constructor(private dataservice: DataServiceService) { }

  ngOnInit() {
    this.setSubscriptions();
  }

  ngOnDestroy(){
    this.destroySubscriptions();
  }

  setSubscriptions(){
    this.driverIdSubscription = this.dataservice.driverIdData.subscribe(data =>{
      if (data){
        this.driverID = data.driverID;
        this.dashStatusSubscription ? this.dashStatusSubscription.unsubscribe() : null;
        this.dashStatusSubscription = this.dataservice.dashStatusdata.subscribe(data => {
          if (data) {
            this.dashStatus = this.setCharpData(data,this.driverID);
            this.cCount = this.dashStatus.cCount;
            this.hCount = this.dashStatus.hCount;
            this.aCount = this.dashStatus.aCount;
            this.rCount = this.dashStatus.rCount;
            this.pCount = this.dashStatus.pCount;
            this.dCount = this.dashStatus.dCount;
            this.total = this.dashStatus.total;
          }
        });
      }
    });
  }

  destroySubscriptions():void{
    this.driverIdSubscription ? this.driverIdSubscription.unsubscribe() : null;
    this.dashStatusSubscription ? this.dashStatusSubscription.unsubscribe(): null;  
  }

  setCharpData(data:any, driverID:any): void{
    var returnData:any = {};

    Object.keys(data).forEach(function(i){
      if(data[i].driverID == driverID){
        returnData = data[i];
      }
    },this)
    
    return returnData;
  }
}
