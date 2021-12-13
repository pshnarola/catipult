import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AngularEditorConfig } from "@kolkov/angular-editor";

import * as $ from "jquery";
import 'bootstrap-notify';

import { Subscription } from "rxjs";

import { DataServiceService } from "../services/data-service/data-service.service";

@Component({
  selector: "app-outstatement",
  templateUrl: "./outstatement.component.html",
  styleUrls: ["./outstatement.component.scss"]
})
export class OutstatementComponent implements OnInit {
  notsub: Subscription;
  notificationSubscription:Subscription;
  subQuestions: Subscription;
  statementDataSubscription:Subscription;

  editFlag = false;

  notifications: any;
  rfpOptions: any;
  url: any;
  userRole: any;

  name = "";
  statement = "";
  prtext = "";

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter OS here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
  };

  constructor(private router: Router, public dataService: DataServiceService) {}

  ngOnInit() {

    this.rfpOptions = [];

    this.statementDataSubscription = this.dataService.statementdata.subscribe(data => {
      if (data) {
        this.statement = data.s.statement;
      }
    });

    this.subQuestions = this.dataService.userAnsdata.subscribe(data => {
      this.rfpOptions = data;
    });

    this.dataService.getAllUserAns();
    this.url = this.dataService.getPhoto();
    this.userRole = this.dataService.getRole();
    this.name = this.dataService.getUserInfo();
    this.notsub = this.dataService.notifydata.subscribe(data => {
      this.notifications = data;
    });

    this.dataService.getStatement();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroySubscriptions();
  }

  destroySubscriptions():void {
    this.subQuestions.unsubscribe();
    this.notificationSubscription ? this.notificationSubscription.unsubscribe() : null;
    this.notsub ? this.notsub.unsubscribe() : null;
    this.statementDataSubscription ? this.statementDataSubscription.unsubscribe() : null;
  }
  
  edit() {
    this.editFlag = true;
    this.prtext = this.statement;
  }
  cancel() {
    this.editFlag = false;
    this.statement = this.prtext;
  }
  save() {
    var result = {};

    result = this.dataService.addOutcomeStatement({
      statement: this.statement
    });

    this.notificationSubscription ? this.notificationSubscription.unsubscribe() : null;
    this.notificationSubscription = this.dataService.outcomeStatementData.subscribe(data=>{
      if (data){
        this.getNotification(data['status'],data['msg']);
      }
    });
    this.editFlag = false;
  }

  resetKpi() {
    document.getElementById("openModalButton2").click();
    // this.dataService.resetKpi();
  }

  confirm() {
    this.dataService.resetKpi();
    this.router.navigateByUrl("/journey/kpijourney");
  }

  toggleClicked(event) {
    var target = event.srcElement.id;
    var body = $("body");
    var menu = $("#sidebar-menu");

    // toggle small or large menu
    if (body.hasClass("nav-md")) {
      menu.find("li.active ul").hide();
      menu
        .find("li.active")
        .addClass("active-sm")
        .removeClass("active");
    } else {
      menu.find("li.active-sm ul").show();
      menu
        .find("li.active-sm")
        .addClass("active")
        .removeClass("active-sm");
    }
    body.toggleClass("nav-md nav-sm");
  }

  getNotificationGlyph(title:string):string {

    switch(title.toLowerCase()){
      case 'success':
        return 'glyphicon glyphicon-ok-circle'
        break;
      case 'error':
        return 'glyphicon glyphicon-exclamation-sign'
        break;
    }
  }

  getNotificationClass(title:string):string {

    switch(title.toLowerCase()){
      case 'success':
        return 'success'
        break;
      case 'error':
        return 'danger'
        break;
    }
  }

  getNotification(title:string, msg:string):void {
    $.notify({
      // options
      icon: this.getNotificationGlyph(title),
      title: `${title}`,
      message: `${msg}`,
      url: null,
      target: null
    },{
      // settings
      element: 'body',
      position: null,
      type: this.getNotificationClass(title),
      allow_dismiss: true,
      newest_on_top: true,
      showProgressbar: false,
      placement: {
        from: "top",
        align: "right"
      },
      offset: 20,
      spacing: 10,
      z_index: 1031,
      delay: 5000,
      timer: 1000,
      url_target: '_blank',
      mouse_over: null,
      animate: {
        enter: 'animate__animated animate__fadeInDown',
        exit: 'animate__animated animate__fadeOutUp'
      },
      onShow: null,
      onShown: null,
      onClose: null,
      onClosed: null,
      icon_type: 'class',
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title"><strong>{1}</strong></span> ' + '<br>' + 
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>' 
    });
  }
}
