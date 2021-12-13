import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Router } from "@angular/router";

import { AngularEditorConfig } from "@kolkov/angular-editor";

import { Subscription } from "rxjs";

import { DataServiceService } from "../services/data-service/data-service.service";
import { environment } from 'src/environments/environment';

export interface Food {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-step3",
  templateUrl: "./step3.component.html",
  styleUrls: ["./step3.component.scss"]
})
export class Step3Component implements OnInit {
  leftStyle = "card";
  outcomeStatement = "";
  rfpOptions: any;
  kpilist: any;
  kpiList: any;
  rfpOptions1: any;
  subQuestions: Subscription;
  name = "";
  routeData: any;
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;
  
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter outcome statement here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ]
  };
  matcher = new MyErrorStateMatcher();
  constructor(
    breakpointObserver: BreakpointObserver,
    public dataService: DataServiceService,
    public router: Router
  ) {
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        if (result.matches) {
          this.leftStyle = "step2response";
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
          this.leftStyle = "step2";
        }
      });
  }

  ngOnInit() {
    this.rfpOptions = [];
    this.name = this.dataService.getUserInfo();
    this.subQuestions = this.dataService.userAnsdata.subscribe(data => {
      this.rfpOptions = data;
    });
    this.dataService.getAllUserAns();
    this.dataService.routeUrldata.subscribe(data => {
      this.routeData = data;
    });

    this.dataService.kpilistdata.subscribe(data => {
      if (data) {
        this.kpilist = data.kpis;
        this.timeout();
      }
    });

    this.dataService.outcomeStatmentData.subscribe((data:string) => {
      if (data){
        this.outcomeStatement = data
      }
    });

    this.dataService.getActiveState();
    this.dataService.getAllRfpOptions("cedfa1e9-e7ec-451a-bea4-91ad7b8ff55b");
    this.dataService.getkpislist1("f27f4b24-33b4-4b5e-a41c-16e0537d029a");
    this.startupScript();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subQuestions.unsubscribe();
  }

  startupScript():void{
    this.dataService.getOutcomeStatment();
  }

  timeout():void {
    setTimeout(() => {
      let v = [];
      // this.rfpOptions.
      this.rfpOptions.forEach(element => {
        this.kpilist.forEach(e => {
          if (e.objective === element.answer) {
            v.push(element);
          }
        });
      });
      this.rfpOptions1 = v;
    }, 2000);
  }
  diffArray(arr1, arr2) {
    return [...this.diff(arr1, arr2), ...this.diff(arr2, arr1)];
  }
  diff(a, b) {
    return a.filter(item => b.indexOf(item) === -1);
  }
  registerS() {
    this.dataService.addOutcomeStatement({
      statement: this.outcomeStatement
    });
    this.dataService.updateActiveState({
      pageName: this.routeData[0].nextPage
    }).subscribe(() => {
      this.router.navigateByUrl(this.routeData[0].nextRoute);
    });
  }
}
