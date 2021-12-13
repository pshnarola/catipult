import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from 'src/app/core/guard/guard.service';

import { AssigntaskComponent } from './assigntask/assigntask.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './home/portfolio/portfolio.component';
import { KpiUpdatesComponent } from './kpi-updates/kpi-updates.component';
import { KpiComponent } from './kpi/kpi.component';
import { MainComponent } from './main/main.component';
import { ManagerComponent } from './manager/manager.component';
import { MilestoneComponent } from './milestone/milestone.component';
import { NotficationComponent } from './notfication/notfication.component';
import { OutstatementComponent } from './outstatement/outstatement.component';
import { ProfileComponent } from './profile/profile.component';
import { QuarterupdateComponent } from './quarterupdate/quarterupdate.component';
import { Step5Component } from './step5/step5.component';



const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard' , component: HomeComponent, canActivate: [GuardService]},
      { path: 'dashboard/:token' , component: HomeComponent, canActivate: [GuardService]},
      { path: 'dashboard/manager/:uID' , component: HomeComponent, canActivate: [GuardService]},
      { path: 'profile' , component: ProfileComponent, canActivate: [GuardService]},
      { path: 'notification' , component: NotficationComponent, canActivate: [GuardService]},
      { path: 'kpi' , component: KpiComponent, canActivate: [GuardService]},
      { path: 'quarterassign' , component: Step5Component, canActivate: [GuardService]},
      { path: 'userassign' , component: AssigntaskComponent, canActivate: [GuardService]},
      { path: 'userassign/:id' , component: AssigntaskComponent, canActivate: [GuardService]},
      { path: 'milestones' , component: MilestoneComponent, canActivate: [GuardService]},
      { path: 'managers' , component: ManagerComponent, canActivate: [GuardService] },
      { path: 'quaupdates' , component: QuarterupdateComponent, canActivate: [GuardService]},
      { path: 'outstatement' , component: OutstatementComponent, canActivate: [GuardService]},
      { path: 'kpiupdates' , component: KpiUpdatesComponent, canActivate: [GuardService]},
      { path: 'kpiupdates/:id' , component: KpiUpdatesComponent, canActivate: [GuardService]},
      { path: 'kpiupdates/:id/:driverID' , component: KpiUpdatesComponent, canActivate: [GuardService]},
      { path: 'portfolio', component: PortfolioComponent, canActivate: [GuardService]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
