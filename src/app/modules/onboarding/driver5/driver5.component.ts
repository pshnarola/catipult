import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";

import { Subscription } from "rxjs";

import { DataService } from "../services/data.service";
import { ConfirmationDialogComponent } from "../dialog/confirmation-dialog/confirmation-dialog.component";
import { environment } from 'src/environments/environment';

declare var $: any;
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
export interface PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  unit: string;
  action: boolean;
}
export class Drivers implements PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  unit: string;
  action: boolean;
}

export interface KpiList {
  kpiID: string;
  objective: string;
  qty: string;
  unit: string;
  action: boolean;
}
export class KpiClass implements KpiList {
  kpiID: string;
  objective: string;
  qty: string;
  unit: string;
  action: boolean;
}

@Component({
  selector: "app-driver5",
  templateUrl: "./driver5.component.html",
  styleUrls: ["./driver5.component.scss"]
})
export class Driver5Component implements OnInit {
  @ViewChild("objective", { static: false }) nameField: ElementRef;
  leftStyle = "card";
  name = "";
  panelOpenState = false;
  headerObj = false;
  ELEMENT_DATA: PeriodicElement[] = [];
  ELEMENT_DATA1: KpiList[] = [];
  editFlag = false;
  element: any;
  element1: any;
  statement = "";
  rfpOptions: any;
  kpilist: any;
  question = "";
  subQuestions: Subscription;
  headerU = false;
  headerM = false;
  sub: Subscription;
  routeData: any;
  // displayedColumns = ['position', 'objective', 'qty', 'unit', 'action'];
  displayedColumns = ["objective", "qty", "unit", "action"];
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;
  
  // dataSource = this.ELEMENT_DATA;
  dataSource = this.ELEMENT_DATA1;
  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];

  matcher = new MyErrorStateMatcher();
  constructor(
    breakpointObserver: BreakpointObserver,
    public dataservice: DataService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.element = new KpiClass();
    this.element1 = new KpiClass();
    breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        if (result.matches) {
          this.leftStyle = "step2response";
          // console.log("handset mode");
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
          // console.log("handset mode");
        }
      });
  }
  formControl = new FormControl("", [
    Validators.required
    // Validators.email,
  ]);
  ngOnInit() {
    this.name = this.dataservice.getUserInfo();
    this.sub = this.dataservice.routeUrldata.subscribe(data => {
      this.routeData = data;
      if (this.routeData) {
        this.dataservice.getkpislist(this.routeData[0].driverID);
        this.dataservice.getAllRfpOptions(this.routeData[0].driverID);
      }
      // console.log(this.routeData);
    });
    this.subQuestions = this.dataservice.rfpOptionsdata.subscribe(data => {
      this.rfpOptions = data;
      this.timeout1();
      // console.log(this.rfpOptions);
    });
    this.dataservice.statementdata.subscribe(data => {
      if (data) {
        this.statement = data.s.statement;
      }
      // console.log(this.statement);
    });
    this.dataservice.kpislistdata.subscribe(data => {
      if (data) {
        this.kpilist = data.kpis;
        this.ELEMENT_DATA1 = data.kpis;
        // console.log(this.ELEMENT_DATA1);
        this.dataSource = [...this.kpilist];
      }
      this.timeout1();
      // console.log(this.kpilist);
    });
    this.dataservice.getStatement();
    this.dataservice.getActiveState();
  }
  listQuestionBind() {
    let v = [];
    // this.rfpOptions.
    if (this.rfpOptions) {
      this.rfpOptions.forEach(element => {
        this.kpilist.forEach(e => {
          if (e.objective === element.answer) {
            e.dueData = "q";
            //     v.push(element);
          }
        });
      });
    }
    //  this.rfpOptions1= v;
    this.dataSource = [...this.kpilist];
    // console.log(this.dataSource);
  }
  timeout1() {
    setTimeout(() => {
      this.listQuestionBind();
    }, 2000);
  }
  popQuestions(e) {
    this.rfpOptions.forEach(element => {
      if (e.objective === element.answer) {
        // console.log(element.question);
        this.question = element.question;
      }
    });
    // console.log(e);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.routeData = [];
    this.sub.unsubscribe();
    this.subQuestions.unsubscribe();
  }
  next() {
    this.dataservice
      .updateActiveState({
        pageName: this.routeData[0].nextPage
      })
      .subscribe(data => {
        this.router.navigateByUrl(this.routeData[0].nextRoute);
      });
  }
  timeoutList() {
    setTimeout(() => {
      this.dataservice.getkpislist(this.routeData[0].driverID);
    }, 1000);
  }
  add() {
    this.dataservice
      .addUserKpi({
        objective: this.element.objective,
        qty: this.element.qty.toString(),
        unit: this.element.unit,
        driverID: this.routeData[0].driverID
      })
      .subscribe(data => {
        this.element = new Drivers();
        // this.nameField.nativeElement.focus();
        this.timeoutList();
      });

    // if (!this.element.position) {
    //   this.element.position = this.ELEMENT_DATA.length + 1;
    // }
    // const ele = this.element;
    // this.ELEMENT_DATA.push(ele);
    // this.dataSource = [...this.ELEMENT_DATA1];
    // this.element = new Drivers();
    // this.nameField.nativeElement.focus();
    // console.log(this.element, this.ELEMENT_DATA, this.dataSource);
  }
  loadlist() {
    // console.log("load");
    this.timeoutList();
  }
  save() {
    this.element1.qty = this.element1.qty.toString();
    delete this.element1.uID;
    delete this.element1.Driver;
    this.dataservice.updateUserKpi(this.element1);
    this.element1 = new KpiClass();
    this.editFlag = false;
    // this.nameField.nativeElement.focus();
    this.timeoutList();
  }
  edit(element: any) {
    // console.log(element);
    this.element1 = element;
    this.editFlag = true;
    $("#invite_user_modal").modal({
      backdrop: "static"
    });
    //   this.ELEMENT_DATA = this.ELEMENT_DATA.filter(function(value, index, arr) {
    //     return value.position !== element.position;
    // });
    // this.dataSource = [...this.ELEMENT_DATA];
  }
  delete(element: any) {
    // this.ELEMENT_DATA.
    // tslint:disable-next-line:only-arrow-functions
    const dialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Are you sure you want to delete this KPI & dependent milestone"
    });

    dialogRef1.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      if (result === "Yes") {
        this.dataservice.deleteKpi(element.kpiID);
        this.timeoutList();
      }
      //  this.dataService.getAllItems();
      // this.animal = result;
    });
    dialogRef1.disableClose = false;
  }
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  update(o, u, m) {
    // console.log(o, u, m);
    this.headerObj = o;
    this.headerU = u;
    this.headerM = m;
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
