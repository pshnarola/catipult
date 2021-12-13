import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

import { Subscription } from 'rxjs';

import * as $ from 'jquery';

import * as notifications from 'src/app/shared/libraries/exports.library';
import { environment } from 'src/environments/environment';

import { DataServiceService } from '../services/data-service/data-service.service';
import { SharedDataService } from 'src/app/shared/services/data.service'
import { ProfileDataService } from 'src/app/modules/dashboard/profile/data.service';
import { notification } from 'src/app/shared/libraries/exports.library';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  constructor(public router: Router, private swPush: SwPush, private formBuilder: FormBuilder, public dataservice: DataServiceService, handler: HttpBackend, private dataService: SharedDataService, public profileDataService: ProfileDataService) {
      this.httpClient = new HttpClient(handler);
  }

  private httpClient: HttpClient;

  userSubscription:Subscription;
  mbtiDataSubscription:Subscription;
  enneagramDataSubscription:Subscription;
  discDataSubscription:Subscription;
  profileDataSubscription:Subscription;

  isCoach:boolean = true;

  VAPID_PUBLIC_KEY:string  = 'BAPxLCaL28DrFRSS1zU31orSjtG7Al2bAC9VmzuK8ieYYaVPoSpeoGZ54RgVy3_SK5YOT_mur4jsuNIzqMX94qo';

  user: any;
  file: any;

  uID:string = JSON.parse(this.dataService.getToken()).uID;

  uploadData = new FormData();

  discProfile:string;
  discData:Profile[];

  mbtiProfile:string;
  mbtiData:Profile[];

  enneagramProfile:string; 
  enneagramData:Profile[];

  ngOnInit() {
    this.startupScript();
    this.setSubscriptions();
    this.dataservice.getUser();
  }

  startupScript():void {
  }

  setSubscriptions():void {
    this.userSubscription = this.dataservice.userdata.subscribe((data) => {
      if (data) {
        this.user = data;
        if(!this.user.info){
          this.user.info = {comName: '', companyAddress: '', dob: '', gender: '', photo: ''};
        }
      }
    });
    
    this.mbtiDataSubscription = this.profileDataService.getPersonalityProfileData.subscribe((data:any)=>{
      if(data[0].profileName=='Myers-Briggs'){
        this.mbtiData = data && data.length > 0 ? data.sort((a,b)=>a.seqNo-b.seqNo) : data;
      }
    })

    this.profileDataService.getPersonalityProfile('Myers-Briggs');

    this.enneagramDataSubscription = this.profileDataService.getPersonalityProfileData.subscribe((data:any)=>{
      if(data[0].profileName=='Enneagram'){
        this.enneagramData = data && data.length > 0 ? data.sort((a,b)=>a.seqNo-b.seqNo) : data;
      }
    })

    this.profileDataService.getPersonalityProfile('Enneagram');

    this.discDataSubscription = this.profileDataService.getPersonalityProfileData.subscribe((data:any)=>{
      if(data[0].profileName=='DiSC'){
        this.discData = data && data.length > 0 ? data.sort((a,b)=>a.seqNo-b.seqNo) : data;
      }
    })

    this.profileDataService.getPersonalityProfile('DiSC');
    
    this.profileDataSubscription = this.profileDataService.getUserPersonalityProfileData.subscribe((data:any)=>{
      for (const i in data){
        if(data[i].profileName=='Myers-Briggs'){
          this.mbtiProfile = data[i].personalityProfileId
        } else if (data[i].profileName=='DiSC'){
          this.discProfile = data[i].personalityProfileId
        } else if (data[i].profileName=='Enneagram'){
          this.enneagramProfile = data[i].personalityProfileId
        }
      }
    });

    this.profileDataService.getUserPersonalityProfile(this.uID)
  }

  ngOnDestroy(){
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.userSubscription ? this.userSubscription.unsubscribe() : null;
    this.mbtiDataSubscription ? this.mbtiDataSubscription.unsubscribe() : null;
    this.enneagramDataSubscription ? this.enneagramDataSubscription.unsubscribe() : null;
    this.discDataSubscription ? this.discDataSubscription.unsubscribe() : null;
    this.profileDataSubscription ? this.profileDataSubscription.unsubscribe() : null;
  }

  toggleClass() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-sm');
    body.classList.add('nav-md');
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    $('.right_col .navbar-right').click(function(e)
    {
      let body = $('body');
      if(body.hasClass('nav-md')){
        $('body').removeClass('nav-md');
        $('body').addClass('nav-sm');

      }else  if(body.hasClass('nav-sm')){
        $('body').removeClass('nav-sm');
        $('body').addClass('nav-md');
      }

    });
  }

  submit() {
    var body: any;
    const uploadData = new FormData();
    if(this.file){
      uploadData.append('image', this.file, this.file.name);
    }

    uploadData.append('info', JSON.stringify(this.user.info).toString());
    uploadData.append('uID', this.user.uID.toString());
    uploadData.append('name', this.user.name.toString());
    uploadData.append('lname', this.user.lname.toString());
    if(!this.user.phoneNumber || this.user.phoneNumber.length<10){
      notifications.notification('Error','Please enter a valid phone number before proceeding.',5000);
      return;
    }
    uploadData.append('phoneNumber',this.user.phoneNumber.toString());

    this.httpClient.put(`${environment.apiUrl}/v1/updateUser`,uploadData).subscribe((response:any) =>{
      const token =  this.dataService.getToken();
      const v = JSON.parse(token);

      sessionStorage.setItem('user', JSON.stringify({ token: v.token,
          role: v.role,
          name: this.user.name.toString() + ' ' + this.user.lname.toString(),
          roleAdmin: v.roleAdmin,
          img: response.bgImage ? response.bgImage : v.img,
          level: v.level,
          orgName: v.orgName,
          orgID: v.orgID,
          depID: v.depID,
          isCoach: this.user.isCoach,
          coachImg: v.coachImg,
          coachName: v.coachName,
          dismissNotifications: v.dismissNotifications,
          email: v.email,
          isCoached: v.isCoached,
          uID: v.uID }));
      this.dataservice.setCoachStatus();
      notifications.notification(response.status,response.msg,5000);
      this.dataservice.getUserInfo();
    },(error) =>{
      })

    if (this.mbtiProfile){
      body = { uID: this.uID, personalityProfileId: this.mbtiProfile }
      this.profileDataService.putUserPersonalityProfile(body);
    }

    if (this.enneagramProfile){
      body = { uID: this.uID, personalityProfileId: this.enneagramProfile }
      this.profileDataService.putUserPersonalityProfile(body);
    }

    if (this.discProfile){
      body = { uID: this.uID, personalityProfileId: this.discProfile }
      this.profileDataService.putUserPersonalityProfile(body);
    }
  }

  onSubscribe() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
  })
  .then(sub => {
    // const p256dh = sub.getKey('p256dh');
    // const auth = sub.getKey('auth');
    const keys = sub.toJSON().keys;
    this.dataservice.registerDevice(sub);
    console.log(keys,sub);
  })
  .catch(err => notifications.notification('Error','Could not subscribe to notifications', 5000));
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }

}

export interface Profile {
  personalityProfileId: string;
  profileName: string;
  typeDescription: string;
  seqNo: number;
}