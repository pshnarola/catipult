import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step5Component } from './step5/step5.component';
import { Step4Component } from './step4/step4.component';
import { Step6Component } from './step6/step6.component';
import { Step7Component } from './step7/step7.component';
import { AssigntaskComponent } from './assigntask/assigntask.component';
import { Step2ReviewComponent } from './step2Review/step2Review.component';

import { GuardService } from 'src/app/core/guard/guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full'},
      { path: 'step1' , component: Step1Component, canActivate: [GuardService] },
      { path: 'step2' , component: Step2Component, canActivate: [GuardService] },
      { path: 'step2Review' , component: Step2ReviewComponent, canActivate: [GuardService] },
      { path: 'step3' , component: Step3Component, canActivate: [GuardService] },
      { path: 'step4' , component: Step4Component, canActivate: [GuardService] },
      { path: 'step5' , component: Step5Component, canActivate: [GuardService] },
      { path: 'step6' , component: Step6Component, canActivate: [GuardService] },
      { path: 'step7' , component: Step7Component, canActivate: [GuardService] },
      { path: 'assigntask' , component: AssigntaskComponent, canActivate: [GuardService] },
      { path: 'quarterplan' , component: HomeComponent, canActivate: [GuardService] },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Quarter12PlanRoutingModule { }
