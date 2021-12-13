import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

import { DEntryComponent } from './d-entry/d-entry.component';
import { DepartmentComponent } from './department/department.component';
import { DriversComponent } from './drivers/drivers.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { PagecontentComponent } from './pagecontent/pagecontent.component';
import { QaupdatesComponent } from './qaupdates/qaupdates.component';
import { RolesComponent } from './roles/roles.component';
import { DataService } from './services/data.service';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { InviteComponent } from './dialog/invite/invite.component';
import { MessageComponent } from './dialog/message/message.component';
import { LeftsidebarComponent } from './shared/leftsidebar/leftsidebar.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { CompanySetupComponent } from './company-setup/company-setup.component';
import { CompanyDataService } from './company-setup/data.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';

@NgModule({
  declarations: [MainComponent, HomeComponent,
    ConfirmationDialogComponent,
    MessageComponent,
    LeftsidebarComponent,
    TopbarComponent,
    DepartmentComponent,
    RolesComponent,
    InviteComponent, QaupdatesComponent, DriversComponent, DEntryComponent, PagecontentComponent, CompanySetupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
    NgxMaskModule.forChild()
  ],
  exports:[DriversComponent, DEntryComponent, NgxMaskModule],
  providers:[ DataService, CompanyDataService],
  entryComponents: [MessageComponent, InviteComponent, ConfirmationDialogComponent]
})
export class AdminModule { }
