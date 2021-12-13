import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "src/app/shared/shared.module";

import { TutorialsComponent } from './tutorials.component';
import { TutorialsRoutingModule } from './tutorials-routing.module';

@NgModule({
  declarations: [TutorialsComponent],
  imports: [
    CommonModule,
    SharedModule,
    TutorialsRoutingModule,
  ],
})
export class TutorialsModule { }
