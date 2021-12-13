import { HttpClient } from "@angular/common/http";

import { Subject, BehaviorSubject, Subscription } from "rxjs";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { SharedDataService } from 'src/app/shared/services/data.service'

export class ProfileDataService {

  constructor (private http: HttpClient, private apiService: HttpServiceService, private dataService: SharedDataService) {}

  postPersonalityProfileSubscription:Subscription;
  putPersonalityProfileSubscription:Subscription;
  getPersonalityProfileSubscription:Subscription;
  getUserPersonalityProfileSubscription:Subscription;
  putUserPersonalityProfileSubscription:Subscription;

  private postPersonalityProfileDataSource = new Subject();
  public postPersonalityProfileData = this.postPersonalityProfileDataSource.asObservable();

  private putPersonalityProfileDataSource = new Subject();
  public putPersonalityProfileData = this.putPersonalityProfileDataSource.asObservable();

  private getPersonalityProfileDataSource = new Subject();
  public getPersonalityProfileData = this.getPersonalityProfileDataSource.asObservable();

  private putUserPersonalityProfileDataSource = new Subject();
  public putUserPersonalityProfileData = this.putUserPersonalityProfileDataSource.asObservable();

  private getUserPersonalityProfileDataSource = new Subject();
  public getUserPersonalityProfileData = this.getUserPersonalityProfileDataSource.asObservable();

  postPersonalityProfile(body:any): any {
    this.postPersonalityProfileSubscription = this.apiService.post("/v1/personalityProfile", body).subscribe(response => {
      this.postPersonalityProfileDataSource.next(response);
    });
  }

  putPersonalityProfile(body:any): any {
    this.putPersonalityProfileSubscription = this.apiService.put("/v1/personalityProfile", body).subscribe(response => {
      this.putPersonalityProfileDataSource.next(response);
    });
  }

  getPersonalityProfile(profileName:string): any {
    var data:any = [];
    this.getPersonalityProfileSubscription = this.apiService.get(`/v1/personalityProfile?profileName=${profileName}`).subscribe(response => {
        for (const d in response.payload){
        data.push({
          personalityProfileId: response.payload[d].personalityProfileId,
          profileName: response.payload[d].profileName,
          typeDescription: response.payload[d].typeDescription,
          seqNo: response.payload[d].seqNo
        })
      }
      this.getPersonalityProfileDataSource.next(data);
    });
  }

  getUserPersonalityProfile(uID:string): any {
    var data:any = [];
    this.getUserPersonalityProfileSubscription = this.apiService.get(`/v1/userPersonalityProfile?uID=${uID}`).subscribe(response => {
        for (const d in response.payload){
          data.push({
          personalityProfileId: response.payload[d].PersonalityProfile.personalityProfileId,
          profileName: response.payload[d].PersonalityProfile.profileName,
          typeDescription: response.payload[d].PersonalityProfile.typeDescription,
          seqNo: response.payload[d].PersonalityProfile.seqNo
        })
      }
      this.getUserPersonalityProfileDataSource.next(data);
    });
  }

  putUserPersonalityProfile(body:any): any {
    this.putUserPersonalityProfileSubscription = this.apiService.put("/v1/userPersonalityProfile", body).subscribe(response => {
      this.putUserPersonalityProfileDataSource.next(response);
    });
  }

  ngOnDestroy():void {
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.postPersonalityProfileSubscription ? this.postPersonalityProfileSubscription.unsubscribe() : null;
    this.putPersonalityProfileSubscription ? this.putPersonalityProfileSubscription.unsubscribe() : null;
    this.getPersonalityProfileSubscription ? this.getPersonalityProfileSubscription.unsubscribe() : null;
    this.getUserPersonalityProfileSubscription ? this.getUserPersonalityProfileSubscription.unsubscribe() : null;
    this.putUserPersonalityProfileSubscription ? this.putUserPersonalityProfileSubscription.unsubscribe() : null;
  }
}