import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { SuperAdminRoutingModule } from './super-admin-routing.module';

import { DEntryComponent } from './d-entry/d-entry.component';
import { DriversComponent } from './drivers/drivers.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { QaupdatesComponent } from './qaupdates/qaupdates.component';
import { DataService } from './services/data.service';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { InviteComponent } from './dialog/invite/invite.component';
import { MessageComponent } from './dialog/message/message.component';
import { QuestionListComponent } from './dialog/question-list/question-list.component';
import { LeftsidebarComponent } from './shared/leftsidebar/leftsidebar.component';
import { TopbarComponent } from './shared/topbar/topbar.component';



@NgModule({
  declarations: [MainComponent, HomeComponent, ConfirmationDialogComponent,
    LeftsidebarComponent,
    TopbarComponent,
    InviteComponent, QaupdatesComponent, DriversComponent, DEntryComponent, QuestionListComponent, MessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule ,
    FormsModule,
    SharedModule,
    SuperAdminRoutingModule
  ],
  exports:[DriversComponent, DEntryComponent],
  providers:[ DataService],
  entryComponents: [InviteComponent, ConfirmationDialogComponent, QuestionListComponent, MessageComponent]
})
export class SuperAdminModule { }
