import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material'

import { AngularEditorModule } from "@kolkov/angular-editor";

import { IssueRoutingModule } from './issue-routing.module';

import { MainComponent } from './main/main.component';
import { IssueComponent } from './issue/issue.component';
import { TodoComponent } from './todo/todo.component';

import { IssueDataService } from '.././issue/data.service'


@NgModule({
  declarations: [MainComponent, IssueComponent, TodoComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    MatTableModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AngularEditorModule,
  ],
  exports: [IssueComponent],
  providers: [IssueDataService]
})
export class IssueModule { }
