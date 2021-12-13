import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModule} from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from "@angular/forms";

import { GaugeChartModule } from 'angular-gauge-chart';

import { ChartsModule } from 'ng2-charts';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';


import {GaugesModule} from 'ng-canvas-gauges';

import { NgxLoadingModule } from 'ngx-loading';

import { MaterialModule } from './material.module';
import { SharedPipesModule } from '../shared/pipes/pipe.module';

import { SharedDataService } from './services/data.service';
import { AdminsidebarComponent } from './components/adminsidebar/adminsidebar.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OnTopNavComponent } from './components/on-top-nav/on-top-nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SupersidebarComponent } from './components/supersidebar/supersidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { StatModule } from './modules/stat/stat.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SideNavDataService } from './components/sidenav/data.service';

@NgModule({
  declarations: [TopnavComponent, LoaderComponent,
    OnTopNavComponent, SidebarComponent, SupersidebarComponent, AdminsidebarComponent, ErrorDialogComponent, SidenavComponent],
  imports: [
    CommonModule,
    LayoutModule,
    OverlayModule,
    MaterialModule,
    FormsModule,
    ChartsModule,
    GaugesModule,
    GaugeChartModule,
    StatModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxLoadingModule.forRoot({})
  ],
  exports:[TopnavComponent, OnTopNavComponent, LoaderComponent, SidenavComponent,
    LayoutModule, OverlayModule, SupersidebarComponent, AdminsidebarComponent,SidebarComponent, MaterialModule,
    ChartsModule,GaugesModule, GaugeChartModule, StatModule, ErrorDialogComponent,SharedPipesModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,],
    providers: [SharedDataService,SideNavDataService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
