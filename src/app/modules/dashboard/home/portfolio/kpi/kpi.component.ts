import { Component, OnInit, TemplateRef } from '@angular/core';

import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { DataServiceService } from "src/app/modules/dashboard/services/data-service/data-service.service";

@Component({
  selector: 'app-portfolio-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class PortfolioKpiComponent implements OnInit {

  modalRef: BsModalRef;

  portfolioUserIdSubscription:Subscription;

  displayYouData: boolean = false;
  kpiMileData: any;
  milestoneDataSubscription: Subscription;
  driverID: string = null
  driverIdSubscription: Subscription;
  kpiObjectiveEdit: string;
  kpiQuantityEdit: string;
  kpiUnitEdit: string;
  kpiAchievedQuantityEdit: string;
  kpiIdEdit: string;
  kpiData:any;
  driverImg: any;
  driverData:any;
  driverName:string;
  
  uID:any;

  constructor(public dataservice: DataServiceService, private modalService: BsModalService) { }

  ngOnInit() {

    this.setSubscriptions();

  }

  ngOnDestroy(): void {
    this.milestoneDataSubscription.unsubscribe();
    this.driverIdSubscription.unsubscribe();
    this.portfolioUserIdSubscription ? this.portfolioUserIdSubscription.unsubscribe() : null;
  }

  showYouData(){
    this.displayYouData = !this.displayYouData;
  }

  edit(template: TemplateRef<any>,element: any) {

    this.setDriverImg();

    this.kpiObjectiveEdit = this.kpiMileData[element]['objective'];
    this.kpiQuantityEdit = this.kpiMileData[element]['qty'];
    this.kpiUnitEdit = this.kpiMileData[element]['unit'];
    this.kpiAchievedQuantityEdit = this.kpiMileData[element]['achieveQty'];
    this.kpiIdEdit = this.kpiMileData[element]['kpiID']

    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'modal-md' })  
    ); 
  }

  updateKpiData(){
    this.kpiData = {
      achieveQty: this.kpiAchievedQuantityEdit,
      dependFlag: false,
      driverID: this.driverID,
      dueData: null,
      kpiID: this.kpiIdEdit,
      objective: this.kpiObjectiveEdit,
      qty: this.kpiQuantityEdit,
      unit: this.kpiUnitEdit,
      uID: this.uID
    }
    this.dataservice.updateUserKpi(this.kpiData)
    
    this.modalRef.hide();
    
    this.timeoutList();

  }

  timeoutList():void {
      setTimeout(() => {
        this.dataservice.getKpiDriver(this.driverID);
        this.dataservice.getPortfolioUserKpiData(this.uID,this.driverID);
      }, 1000);
  }

  setSubscriptions():void{
    this.dataservice.driversdata.subscribe(data => {
      if (data) {
        this.driverData = data;
        this.setDriverImg();
      }
    });

    this.milestoneDataSubscription = this.dataservice.portfolioUserKpiData.subscribe(data => {
      this.kpiMileData = data;
    });

    this.driverIdSubscription = this.dataservice.driverIdData.subscribe(data =>{
      this.driverID = data.driverID;
      this.driverName = data.driverName;
    });

    this.portfolioUserIdSubscription = this.dataservice.portfolioUserData.subscribe(data => {
      if(data){
        this.uID = data;
      }
    })

  }

  setDriverImg(): void{
    Object.keys(this.driverData).forEach(function(i){
      if(this.driverData[i].driverID == this.driverID){
        this.driverImg = this.driverData[i].driverImage;
      }
    },this)
  }

}
