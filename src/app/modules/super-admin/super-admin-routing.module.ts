import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from 'src/app/core/guard/guard.service';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { QaupdatesComponent } from './qaupdates/qaupdates.component';
import { DEntryComponent } from './d-entry/d-entry.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'org', pathMatch: 'full'},
      { path: 'org' , component: HomeComponent, canActivate: [GuardService] },
      { path: 'drivers' , component: DEntryComponent, canActivate: [GuardService] },
      { path: 'qaupdates/:id/:driver' , component: QaupdatesComponent, canActivate: [GuardService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
