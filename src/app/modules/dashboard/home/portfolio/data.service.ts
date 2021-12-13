import { OnDestroy } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Subject, Subscription } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service'

export class PortfolioDataService implements OnDestroy{

  constructor (private http: HttpClient, private apiService: HttpServiceService, private dataService: SharedDataService) {}

  dataSubscription:Subscription[] = [];

  private postPortfolioGroupDataSource = new Subject();
  public postPortfolioGroupData = this.postPortfolioGroupDataSource.asObservable();

  private getPortfolioGroupDataSource = new Subject();
  public getPortfolioGroupData = this.getPortfolioGroupDataSource.asObservable();

  private deletePortfolioGroupDataSource = new Subject();
  public deletePortfolioGroupData = this.deletePortfolioGroupDataSource.asObservable();

  private postPortfolioGroupUserDataSource = new Subject();
  public postPortfolioGroupUserData = this.postPortfolioGroupUserDataSource.asObservable();

  private deletePortfolioGroupUserDataSource = new Subject();
  public deletePortfolioGroupUserData = this.deletePortfolioGroupUserDataSource.asObservable();

  postPortfolioGroup(body:any):void {
    this.dataSubscription.push(this.apiService.post(`/v1/portfolioGroup`,body).subscribe(response=>{
      this.postPortfolioGroupDataSource.next(response);
    }));
  }

  getPortfolioGroup(uID:string):void {
    this.dataSubscription.push(this.apiService.get(`/v1/portfolioGroup?uID=${uID}`).subscribe(response=>{
      this.getPortfolioGroupDataSource.next(response.payload);
    }));
  }

  deletePortfolioGroup(portfolioGroupId:string):void {
    this.dataSubscription.push(this.apiService.delete(`/v1/portfolioGroup?portfolioGroupId=${portfolioGroupId}`).subscribe(response=>{
      this.deletePortfolioGroupDataSource.next(response);
    }));
  }

  postPortfolioGroupUser(body:any):void {
    this.dataSubscription.push(this.apiService.post(`/v1/portfolioGroupUser`,body).subscribe(response=>{
      this.postPortfolioGroupUserDataSource.next(response);
    }));
  }

  deletePortfolioGroupUser(portfolioGroupUserId:string):void {
    this.dataSubscription.push(this.apiService.delete(`/v1/portfolioGroupUser?portfolioGroupUserId=${portfolioGroupUserId}`).subscribe(response=>{
      this.deletePortfolioGroupUserDataSource.next(response);
    }));
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.dataSubscription.forEach(d=>d.unsubscribe());
  }
}