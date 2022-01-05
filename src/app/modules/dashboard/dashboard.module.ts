import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxMaskModule, IConfig } from "ngx-mask";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { AngularEditorModule } from "@kolkov/angular-editor";

import { SharedModule } from "src/app/shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AssigntaskComponent } from "./assigntask/assigntask.component";
import { HomeComponent } from "./home/home.component";
import { KpiUpdatesComponent } from "./kpi-updates/kpi-updates.component";
import { KpiComponent } from "./kpi/kpi.component";
import { MainComponent } from "./main/main.component";
import { ManagerComponent } from "./manager/manager.component";
import { ManagerdashComponent } from "./managerdash/managerdash.component";
import { MilestoneComponent } from "./milestone/milestone.component";
import { NotficationComponent } from "./notfication/notfication.component";
import { OutstatementComponent } from "./outstatement/outstatement.component";
import { ProfileComponent } from "./profile/profile.component";
import { QuarterupdateComponent } from "./quarterupdate/quarterupdate.component";
import { Step5Component } from "./step5/step5.component";
import { DataServiceService } from "./services/data-service/data-service.service";
import { DataService } from "src/app/modules/admin/services/data.service";
import { GaugesComponent } from "./home/gauges/gauges.component";
import { KpiDashboardComponent } from "src/app/modules/dashboard/home/kpi/kpi.component";
import { CharpComponent } from "./home/charp/charp.component";
import { MilestoneDashboardComponent } from "src/app/modules/dashboard/home/milestone/milestone.component";
import { TeamLevelTwoComponent } from "./home/team-level-two/team-level-two.component";
import { TeamLevelThreeComponent } from "./home/team-level-three/team-level-three.component";
import { TeamLevelZeroComponent } from "./home/team-level-zero/team-level-zero.component";
import { PortfolioComponent } from "./home/portfolio/portfolio.component";
import { PortfolioKpiComponent } from "./home/portfolio/kpi/kpi.component";
import { PortfolioMilestoneComponent } from "./home/portfolio/milestone/milestone.component";
import { PortfolioTeamLevelZeroComponent } from "./home/portfolio/team-level-zero/team-level-zero.component";
import { PortfolioTeamLevelTwoComponent } from "./home/portfolio/team-level-two/team-level-two.component";
import { PortfolioTeamLevelThreeComponent } from "./home/portfolio/team-level-three/team-level-three.component";
import { PortfolioTeamLevelCorporateComponent } from "./home/portfolio/team-level-corporate/team-level-corporate.component";
import { BulletChartComponent } from "./home/bullet-chart/bullet-chart-component";
import { MixedChartComponent } from "./home/mixed-chart/mixed-chart-component";
import { CoachComponent } from "./home/coach/coach.component";
import { TeamLevelCorporateComponent } from "./home/team-level-corporate/team-level-corporate.component";
import { TeamLevelAllComponent } from "./home/team-level-all/team-level-all.component";
import { TeamLevelAllDataService } from "src/app/modules/dashboard/home/team-level-all/data.service";
import { ProfileDataService } from "src/app/modules/dashboard/profile/data.service";
import { PortfolioDataService } from "src/app/modules/dashboard/home/portfolio/data.service";
import { IssueModule } from '../issue/issue.module'
import { IssueDataService } from '../issue/data.service';
import { DayActionItemComponent } from './home/day-action-item/day-action-item.component';
import { IssueListComponent } from './home/issue-list/issue-list.component';

@NgModule({
  declarations: [
    MainComponent,
    NotficationComponent,
    KpiComponent,
    ProfileComponent,
    MilestoneComponent,
    Step5Component,
    AssigntaskComponent,
    HomeComponent,
    QuarterupdateComponent,
    KpiUpdatesComponent,
    OutstatementComponent,
    ManagerComponent,
    ManagerdashComponent,
    GaugesComponent,
    KpiDashboardComponent,
    CharpComponent,
    BulletChartComponent,
    MixedChartComponent,
    MilestoneDashboardComponent,
    TeamLevelTwoComponent,
    TeamLevelThreeComponent,
    TeamLevelZeroComponent,
    PortfolioComponent,
    PortfolioKpiComponent,
    PortfolioMilestoneComponent,
    PortfolioTeamLevelZeroComponent,
    PortfolioTeamLevelTwoComponent,
    PortfolioTeamLevelThreeComponent,
    PortfolioTeamLevelCorporateComponent,
    CoachComponent,
    TeamLevelCorporateComponent,
    TeamLevelAllComponent,
    DayActionItemComponent,
    IssueListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
    DashboardRoutingModule,
    IssueModule,
    NgxMaskModule.forChild()
  ],
  exports: [NgxMaskModule],
  providers: [
    DataServiceService,
    DataService,
    TeamLevelAllDataService,
    ProfileDataService,
    PortfolioDataService,
    IssueDataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
