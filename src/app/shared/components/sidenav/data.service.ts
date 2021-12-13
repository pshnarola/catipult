import { Injectable } from "@angular/core";

import { Subject, Subscription } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";

export interface Question {
  queID?: string;
  question?: string;
  Options?: any;
  QuestionType?: any;
  answer?: boolean;
  desc?: string;
}
export class QBank implements Question {
  constructor(
    public queID?: string,
    public question?: string,
    public Options?: any,
    public QuestionType?: any,
    public answer?: boolean,
    public desc?: string
  ) {}
}
@Injectable()
export class SideNavDataService {

  getOrganizationDataSubscription:Subscription;  
  
  private organizationDataSource = new Subject();
  public organizationData = this.organizationDataSource.asObservable();

  constructor(private apiService: HttpServiceService) {}

  getOrganizationData(orgID:string):void {
    this.getOrganizationDataSubscription = this.apiService.get(`/v1/orgnization?orgID=${orgID}`).subscribe(response=>{
      this.organizationDataSource.next(response.org);
    })
  }
  
  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
  }
}
