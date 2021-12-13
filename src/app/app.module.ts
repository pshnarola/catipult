import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MAT_RIPPLE_GLOBAL_OPTIONS } from "@angular/material";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ServiceWorkerModule } from "@angular/service-worker";

import { NgxLoadingModule } from "ngx-loading";
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { NgDatepickerModule } from "ng2-datepicker";

import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { AccountModule } from "./modules/account/account.module";
import { AdminModule } from "./modules/admin/admin.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { OnboardingModule } from "./modules/onboarding/onboarding.module";
import { Quarter12PlanModule } from "./modules/quarter12-plan/quarter12-plan.module";
import { SuperAdminModule } from "./modules/super-admin/super-admin.module";

import { GuardService } from 'src/app/core/guard/guard.service';
import { VideoComponent } from './shared/components/video/video.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [AppComponent, VideoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgDatepickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AccountModule,
    DashboardModule,
    OnboardingModule,
    Quarter12PlanModule,
    SuperAdminModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    ModalModule.forRoot(),
    MatProgressBarModule,
    NgxMaskModule.forRoot(),
    MatTooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    GuardService,
    BsModalRef
  ]
})
export class AppModule {}
