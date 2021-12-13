import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuardService } from './core/guard/admin-guard.service';
import { GuardService } from './core/guard/guard.service';

const routes: Routes = [
  // { path:'account', loadChildren:() => import('./modules/account/account.module').then(mod => mod.AccountModule) },
  // { path:'journey', loadChildren:() => import('./modules/onboarding/onboarding.module').then(mod => mod.OnboardingModule), canActivate: [GuardService] }, 
  // { path:'plan', loadChildren:() => import('./modules/quarter12-plan/quarter12-plan.module').then(mod => mod.Quarter12PlanModule), canActivate: [GuardService] },
  // { path:'admin', loadChildren:() => import('./modules/admin/admin.module').then(mod => mod.AdminModule), canActivate: [GuardService] },
  // { path: 'super', loadChildren:() => import('./modules/super-admin/super-admin.module').then(mod => mod.SuperAdminModule), canActivate: [GuardService] },
  // { path: 'dash', loadChildren:() => import('./modules/dashboard/dashboard.module').then(mod => mod.DashboardModule), canActivate: [GuardService] },
  { path: 'meeting', loadChildren:() => import('./modules/meeting/meeting.module').then(mod=> mod.MeetingModule), canActivate: [GuardService] },
  // { path: 'tutorials', loadChildren:() => import('./modules/tutorials/tutorials.module').then(mod => mod.TutorialsModule), canActivate: [GuardService] },
  { path:'', redirectTo: 'meeting', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
