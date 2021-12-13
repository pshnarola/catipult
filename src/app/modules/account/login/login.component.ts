import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

import { ConnectionService } from "ng-connection-service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { HttpServiceService } from "src/app/core/http-service/http-service.service";
import { DataService } from "../services/data.service";
import { AuthServiceService } from "./../../../core/http-service/auth-service.service";
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/shared/services/data.service'

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  @ViewChild('navigation', { static: true }) navigationTemplate: TemplateRef<any>;

  modalRef: BsModalRef;

  loginSubscription:Subscription;

  userDetailsForm: any;
  status = "ONLINE";
  leftStyle = "login-page";
  errorMsg: string;
  returnUrl:string;

  constructor(
    breakpointObserver: BreakpointObserver,
    private connectionService: ConnectionService,
    private fb: FormBuilder,
    private router: Router,
    private apiservice: HttpServiceService,
    private authservice: AuthServiceService,
    private dataservice: DataService,
    private route: ActivatedRoute,
    private dataService: SharedDataService,
    private modalService: BsModalService
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      if (isConnected) {
        this.status = "ONLINE";
      } else {
        this.status = "OFFLINE";
      }
    });
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        if (result.matches) {
          this.leftStyle = "login-response";
        }
      });
    breakpointObserver
      .observe([
        Breakpoints.WebLandscape,
        Breakpoints.Large,
        Breakpoints.Medium
      ])
      .subscribe(result => {
        if (result.matches) {
          this.leftStyle = "login-page";
        }
      });
  }

  ngOnInit() {
    // sessionStorage.removeItem('user');
    this.dataService.removeToken();
    
    this.userDetailsForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnDestroy(){
    this.destroySubscriptions();
  }

  onLogin(customerData) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';

    this.loginSubscription = this.apiservice
      .post("/v1/login", { email: customerData.email,password: customerData.password })
      .subscribe(
        data => {
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              token: data.token,
              role: data.user.Role.roleName,
              name: data.user.name + " " + data.user.lname,
              roleAdmin: data.user.roleAdmin,
              img: data.user.info ? data.user.info.photo : null,
              companyImg: data.user.Role.Department.Organization.logoUrl,
              orgID: data.user.Role.Department.Organization.orgID,
              orgName: data.user.Role.Department.Organization.orgName,
              level: data.user.Role.leval,
              depID: data.user.Role.Department.depID,
              uID: data.user.uID,
              isCoach: data.user.isCoach,
              coachCode: data.user.coachCode,
              dismissNotifications: false,
              isCoached: data.user.coachUserId ? true : false,
              coachName: data.user.Coach ? data.user.Coach.name + ' ' + data.user.Coach.lname : null,
              coachImg: data.user.info ? data.user.info.photo : null,
              email: data.user.email
            })
          );
          this.authservice.setStatus(true, data.user.Role.roleName);

          if (data.user.Role.roleName === "super") {
            this.router.navigateByUrl("/super");
          } else if ( this.returnUrl != 'home'){
            this.router.navigate([this.returnUrl]);
          } else if (data.activeRoute) {
            this.router.navigate([data.activeRoute.PageContent.routers]);
            if(data.activeRoute.PageContent.routers!='/dashboard'){
              this.showNavigationModal();
            }
          } else {
            this.router.navigate(["/journey/kpijourney"]);
            // this.showNavigationModal();
          }
        },
        error => {
          this.errorMsg = this.getErrorMsg(error['code'])
          document.getElementById("openModalButton").click();
        },
        () => {
        }
      );

    this.userDetailsForm.reset();
  }

  destroySubscriptions():void {
    this.loginSubscription ? this.loginSubscription.unsubscribe() : null; 
  }

  getErrorMsg(errorCode){
      switch(errorCode){
        case 0:
          return 'The server is currently inaccessible';
        case 401:
          return 'Invalid username and/or password'
        case 400:
          return 'Invalid username and/or password'
        default:
            return 'An unidentified error has occurred'
      }
  }

  showNavigationModal():void {
    this.showModal(this.navigationTemplate,'modal-md')
  }

  showModal(template: TemplateRef<any>,className:string):void {

    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: className })  
    ); 
  }

  hideModal():void {
    this.modalRef.hide();
  }
}
