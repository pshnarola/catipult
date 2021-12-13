import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
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
  selector: "app-driver2",
  templateUrl: "./driver2.component.html",
  styleUrls: ["./driver2.component.scss"]
})

export class Driver2Component implements OnInit {
  @ViewChild("objective", { static: false }) nameField: ElementRef;
  leftStyle = "card";
  panelOpenState = false;
  headerObj = false;
  name = "";
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
  displayedColumns = ["objective", "qty", "unit", "action"];
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;
  
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
  formControl = new FormControl("", [
    Validators.required
  ]);

  ngOnInit() {
    this.name = this.dataservice.getUserInfo();
    this.sub = this.dataservice.routeUrldata.subscribe(data => {
      this.routeData = data;
      if (this.routeData) {
        this.dataservice.getkpislist(this.routeData[0].driverID);
        this.dataservice.getAllRfpOptions(this.routeData[0].driverID);
      }
    });
    
    this.subQuestions = this.dataservice.rfpOptionsdata.subscribe(data => {
      this.rfpOptions = data;
      this.timeout1();
    });

    this.dataservice.statementdata.subscribe(data => {
      if (data) {
        this.statement = data.s.statement;
      }
    });

    this.dataservice.kpislistdata.subscribe(data => {
      if (data) {
        this.kpilist = data.kpis;
        this.ELEMENT_DATA1 = data.kpis;
        this.dataSource = [...this.kpilist];
      }
      this.timeout1();
    });
    this.dataservice.getStatement();
    this.dataservice.getActiveState();
  }

  listQuestionBind() {
    let v = [];
    if (this.rfpOptions) {
      this.rfpOptions.forEach(element => {
        this.kpilist.forEach(e => {
          if (e.objective === element.answer) {
            e.dueData = "q";
          }
        });
      });
    }
    this.dataSource = [...this.kpilist];
  }

  timeout1() {
    setTimeout(() => {
      this.listQuestionBind();
    }, 2000);
  }

  popQuestions(e) {
    this.rfpOptions.forEach(element => {
      if (e.objective === element.answer) {
        this.question = element.question;
      }
    });
  }

  loadlist() {
    this.timeoutList();
  }

  ngOnDestroy(): void {
    this.routeData = [];
    this.sub.unsubscribe();
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
        this.timeoutList();
      });
  }

  save() {
    this.element1.qty = this.element1.qty.toString();
    delete this.element1.uID;
    delete this.element1.Driver;
    this.dataservice.updateUserKpi(this.element1);
    this.element1 = new KpiClass();
    this.editFlag = false;
    this.timeoutList();
  }

  edit(element: any) {
    this.element1 = element;
    this.editFlag = true;
    $("#invite_user_modal").modal({
      backdrop: "static"
    });
  }
  delete(element: any) {
    // tslint:disable-next-line:only-arrow-functions
    const dialogRef1 = this.dialog.open(ConfirmationDialogComponent, {
      width: "350px",
      data: "Are you sure you want to delete this KPI & dependent milestone"
    });

    dialogRef1.afterClosed().subscribe(result => {
      if (result === "Yes") {
        this.dataservice.deleteKpi(element.kpiID);
        this.timeoutList();
      }
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
