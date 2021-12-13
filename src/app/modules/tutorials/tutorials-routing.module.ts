import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorialsComponent } from 'src/app/modules/tutorials/tutorials.component';

const routes: Routes = [
  {
    path: '',
    component: TutorialsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorialsRoutingModule { }
