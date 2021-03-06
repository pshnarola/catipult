import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material'

import { AngularEditorModule } from "@kolkov/angular-editor";

import { MilestonesComponent } from './milestones/milestones.component';

@NgModule({
  declarations: [MilestonesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AngularEditorModule,
  ],
  exports: [MilestonesComponent],
  providers: []
})
export class MilestonesModule { }
