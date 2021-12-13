import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Driver1Component } from './driver1/driver1.component';
import { Driver2Component } from './driver2/driver2.component';
import { Driver3Component } from './driver3/driver3.component';
import { Driver4Component } from './driver4/driver4.component';
import { Driver5Component } from './driver5/driver5.component';
import { Driver6Component } from './driver6/driver6.component';
import { Driver7Component } from './driver7/driver7.component';
import { DriverdashComponent } from './driverdash/driverdash.component';

import { GuardService } from 'src/app/core/guard/guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'kpijourney', pathMatch: 'full'},
      { path: 'kpijourney' , component: HomeComponent, canActivate: [GuardService] },
      { path: 'kpijourney_step2' , component: Step2Component, canActivate: [GuardService] },
      { path: 'kpijourney_step3' , component: Step3Component, canActivate: [GuardService] },
      { path: 'driver1' , component: Driver1Component, canActivate: [GuardService] },
      { path: 'driver2' , component: Driver2Component, canActivate: [GuardService] },
      { path: 'driver3' , component: Driver3Component, canActivate: [GuardService] },
      { path: 'driver4' , component: Driver4Component, canActivate: [GuardService] },
      { path: 'driver5' , component: Driver5Component, canActivate: [GuardService] },
      { path: 'driver6' , component: Driver6Component, canActivate: [GuardService] },
      { path: 'driver7' , component: Driver7Component, canActivate: [GuardService] },
      { path: 'driverdash' , component: DriverdashComponent}
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
