import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Driver1Component } from './driver1/driver1.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Driver2Component } from './driver2/driver2.component';
import { Driver3Component } from './driver3/driver3.component';
import { Driver4Component } from './driver4/driver4.component';
import { Driver5Component } from './driver5/driver5.component';
import { Driver6Component } from './driver6/driver6.component';
import { Driver7Component } from './driver7/driver7.component';
import { DriverdashComponent } from './driverdash/driverdash.component';
import {PlatformModule} from '@angular/cdk/platform';
import { DataService } from './services/data.service';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [MainComponent, HomeComponent,
    ConfirmationDialogComponent,
    // tslint:disable-next-line:max-line-length
    Step2Component, Step3Component, Driver1Component, Driver2Component, Driver3Component, Driver4Component, Driver5Component, Driver6Component, Driver7Component, DriverdashComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    PlatformModule,
    FormsModule,
    SharedModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    OnboardingRoutingModule
  ],
  providers: [
    DataService,
  ],
  entryComponents: [ConfirmationDialogComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class OnboardingModule { }
