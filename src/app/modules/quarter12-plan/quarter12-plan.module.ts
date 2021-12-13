import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AngularEditorModule } from "@kolkov/angular-editor";

import { SharedModule } from "src/app/shared/shared.module";

import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

import { Quarter12PlanRoutingModule } from "./quarter12-plan-routing.module";

import { AssigntaskComponent } from "./assigntask/assigntask.component";
import { HomeComponent } from "./home/home.component";
import { MainComponent } from "./main/main.component";
import { Step1Component } from "./step1/step1.component";
import { Step2Component } from "./step2/step2.component";
import { Step2ReviewComponent } from "./step2Review/step2Review.component";
import { Step3Component } from "./step3/step3.component";
import { Step4Component } from "./step4/step4.component";
import { Step5Component } from "./step5/step5.component";
import { Step6Component } from "./step6/step6.component";
import { Step7Component } from "./step7/step7.component";
import { ConfirmationDialogComponent } from "./dialog/confirmation-dialog/confirmation-dialog.component";
import { DataServiceService } from "./services/data-service/data-service.service";

@NgModule({
  declarations: [
    HomeComponent,
    AssigntaskComponent,
    MainComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step2ReviewComponent,
    Step5Component,
    ConfirmationDialogComponent,
    Step6Component,
    Step7Component
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Quarter12PlanRoutingModule
  ],
  providers: [DataServiceService],
  entryComponents: [ConfirmationDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Quarter12PlanModule {}
