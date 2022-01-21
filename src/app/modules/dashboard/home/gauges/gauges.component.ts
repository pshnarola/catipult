import { Component, OnInit, Input, Output, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Chart } from "chart.js";

import { DataServiceService } from "src/app/modules/dashboard/services/data-service/data-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service';
import { TeamLevelAllDataService } from 'src/app/modules/dashboard/home/team-level-all/data.service'

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gauges',
  templateUrl: './gauges.component.html',
  styleUrls: ['./gauges.component.scss']
})

export class GaugesComponent implements OnInit {

  @Input() uID:string;

  modalRef: BsModalRef;

  @Output('driverID') driverID:string;

  paramSub: Subscription;
  driverIdSubscription: Subscription;
  milestoneManagerSubscription:Subscription;
  dashStatusDataSubscription:Subscription;
  driverDataSubscription:Subscription;
  activeUserDataSubscription:Subscription;
  selectedUserDataSubscription: Subscription;

  selectedUserUID: string = null;

  canvas: any;
  ctx: any;
  dashStatus: any;
  you:any;
  leadership:any;
  customers:any;
  employees:any;
  financialPartners:any;
  cash:any;
  growth:any;
  milestonemanagers:any;
  gauge:any;
  myChart:any = null;

  managerUid:string;
  activeUserId:string;
  driverId: string = null
  videoUrl:string;
  videoDriverName:string;

  driverData:any;

  constructor(public dataservice: DataServiceService, public route: ActivatedRoute, private dataService: SharedDataService, private modalService: BsModalService, private DataService: TeamLevelAllDataService) { 
    
  }

  ngOnInit() {
    this.setGaugeStartup();
    this.setSubscriptions();
    this.setCardToggle();
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  setGaugeStartup():void {
    var driverDetail:object = this.dataservice.driverDetail

    this.setDriverName(driverDetail['driverID'],driverDetail['driverName']);
  }

  setSubscriptions():void {

    this.dashStatusDataSubscription ? this.dashStatusDataSubscription : null;
    this.dashStatusDataSubscription = this.dataservice.dashStatusSummaryData.subscribe(data=>{
        this.dashStatus = data;
        const loggedInUserID =  this.dataService.getUserId();
        this.you = data[0].uID === loggedInUserID ? data[0] : this.you;
        this.leadership = data[1];
        this.employees = data[2];
        this.customers = data[3];
        this.financialPartners = data[4];
        this.cash = data[5];
        this.growth = data[6];
        // Object.keys(data).forEach(function(i){
        //   this.getChart(data[i].pCount,data[i].total-data[i].dCount,data[i].driverName);
        // },this);  

    });  

    this.selectedUserDataSubscription = this.dataservice.selectedMemberData.subscribe(uID => {
      if(uID) {
        this.selectedUserUID = uID;
        console.log("selectedUID", this.selectedUserUID);
      }
    })

    this.milestoneManagerSubscription = this.dataservice.mileStoneManagerUsersdata.subscribe(data => {
      if (data) {
        this.milestonemanagers = data;
        this.managerUid = data.length > 0 ? data[0].uID : null;
      }
    });

    this.driverDataSubscription = this.dataservice.driversData.pipe(take(1)).subscribe(data=>{
      this.driverData = data;
    })

    this.activeUserDataSubscription = this.dataservice.activeUserIdData.subscribe((data:string)=>{
      this.activeUserId = data;
    });

    this.dataservice.getDrivers();
  }

  destroySubscriptions():void {
    this.milestoneManagerSubscription ? this.milestoneManagerSubscription.unsubscribe() : null;
    this.dashStatusDataSubscription ? this.dashStatusDataSubscription.unsubscribe() : null;
    this.driverDataSubscription ? this.driverDataSubscription.unsubscribe() : null;
  }

  // getChart(achieved:number, total:number, label: string):void {
    
  //   document.getElementById(`chart-${label}`).innerHTML=`<canvas id="myChart-${label}" width="100" height="100"></canvas>`;

  //   this.canvas = document.getElementById(`myChart-${label}`);
  //   this.ctx = this.canvas.getContext('2d');


  //   this.myChart = new Chart(this.ctx, {
  //     type: 'doughnut',
  //     data: {
  //         labels: ['Plan','Other'],
  //         datasets: [{
  //             label: label,
  //             data: [achieved,total-achieved],
  //             backgroundColor: [
  //                 achieved/total < .36 ? '#FA3E4B' : achieved/total < .51 ? '#FE9801' : achieved/total<.91 ? '#FFE75E' : '#28DF99'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //       legend: {
  //         display: false
  //       },
  //       responsive: true,
  //       maintainAspectRatio: true,
  //       rotation: .75 * Math.PI,
  //       circumference: 1.5 * Math.PI,
  //       cutoutPercentage: 85
  //     }
  //   });
  // }

  setCardToggle():void{

    var header = document.getElementById("gauge");
    var cards = header.getElementsByClassName("mat-elevation-z4");

    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("isActive");
        current[0].className = current[0].className.replace(" isActive", "");
        this.className += " isActive";
      });
    }
  }

  setDriverName(driverID:string,driverName:string):void {
    this.dataservice.setDriverId(driverID,driverName);

    console.log(driverName);
    
    if(this.selectedUserUID && driverName !== 'You'){
      this.dataservice.getDashStatus(this.selectedUserUID);
      this.dataservice.getKpiDriverByMember(driverID, this.selectedUserUID);
    } else {
      this.dataservice.getDashStatus(this.uID);
      this.dataservice.getKpiDriver(driverID);
    }
    this.dataservice.getMileStoneAssignUsersKpi(driverID, JSON.parse(this.dataService.getToken()).depID, null, 'dash');

    this.dataservice.getUserKpiAllM(this.managerUid,driverID);

    this.dataservice.getCorporateKpi(this.uID,driverID,'Gauges'); 
    this.dataservice.getMileStoneAssignUsersl2(null,null,null);
    this.dataservice.setLevel3Display(false);
    this.dataservice.getUserAssignment(this.uID,driverID,'Gauges');
    this.DataService.getUserMilestonesAll(this.uID,driverID);
    this.DataService.showUserDataAccessData(false);
    this.DataService.getUserKpis(this.uID,driverID);
    
  }

  scrollLeft(e){
    document.getElementById('cards').scrollLeft-=150;
  }

  scrollRight(e){
    document.getElementById('cards').scrollLeft+=150;
  }

  showModal(template: TemplateRef<any>,cls:any){
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: cls })  
    ); 
  }

  setVideo(driverName:string):void {
    Object.keys(this.driverData).forEach(i=>{
      if(this.driverData[i].driverName.toLowerCase()==driverName.toLowerCase()){
        this.videoUrl = environment.videoUrl + this.driverData[i].driverVideo
        this.videoDriverName = driverName;
      }
    })
  }
}
