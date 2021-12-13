import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from 'src/app/core/guard/guard.service';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { QaupdatesComponent } from './qaupdates/qaupdates.component';
import { DEntryComponent } from './d-entry/d-entry.component';
import { DepartmentComponent } from './department/department.component';
import { RolesComponent } from './roles/roles.component';
import { CompanySetupComponent } from 'src/app/modules/admin/company-setup/company-setup.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'invites', pathMatch: 'full'},
      { path: 'invites' , component: HomeComponent, canActivate: [GuardService] },
      { path: 'drivers' , component: DEntryComponent, canActivate: [GuardService] },
      { path: 'department' , component: DepartmentComponent, canActivate: [GuardService] },
      { path: 'roles' , component: RolesComponent, canActivate: [GuardService] },
      { path: 'companySetup', component: CompanySetupComponent, canActivate: [GuardService] },
      { path: 'qaupdates/:id/:driver' , component: QaupdatesComponent, canActivate: [GuardService] }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
