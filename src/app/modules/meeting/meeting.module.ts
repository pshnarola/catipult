import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ConnectionServiceModule } from "ng-connection-service";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

import { AngularEditorModule } from "@kolkov/angular-editor";

import { SharedModule } from "src/app/shared/shared.module";
import { SharedDataService } from 'src/app/shared/services/data.service';
import { MeetingDataService } from './data.service';
import { DataServiceService } from 'src/app/modules/dashboard/services/data-service/data-service.service';
import { TeamLevelAllDataService } from 'src/app/modules/dashboard/home/team-level-all/data.service';
import { IssueDataService } from '../issue/data.service';

import { MeetingRoutingModule } from './meeting-routing.module';
import { MeetingComponent } from './home/meeting.component';
import { MeetingEditComponent } from './meeting-edit/meeting-edit.component';
import { MeetingNewComponent } from './meeting-new/meeting-new.component';
import { MeetingArchiveComponent } from './meeting-archive/meeting-archive.component';
import { MainComponent } from './main/main.component';
import { MeetingDetailComponent } from './meeting-archive/meeting-detail/meeting-detail.component';
import { MeetingPreviewComponent } from './meeting-preview/meeting-preview.component';
import { IssueModule } from '../issue/issue.module'
import { MilestonesModule } from '../../shared/components/milestones/milestones.module';

@NgModule({
  declarations: [
    MeetingComponent,
    MeetingEditComponent,
    MeetingNewComponent,
    MeetingArchiveComponent,
    MainComponent,
    MeetingDetailComponent,
    MeetingPreviewComponent
],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConnectionServiceModule,
    FormsModule,
    AngularEditorModule,
    SharedModule,
    MeetingRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    IssueModule,
    MilestonesModule
  ],
  providers: [SharedDataService, MeetingDataService, DataServiceService, TeamLevelAllDataService, IssueDataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MeetingModule {}
