import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { GuardService } from 'src/app/core/guard/guard.service';
import { MeetingComponent } from 'src/app/modules/meeting/home/meeting.component';
import { MainComponent } from 'src/app/modules/meeting/main/main.component';
import { MeetingArchiveComponent } from 'src/app/modules/meeting/meeting-archive/meeting-archive.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'home', component: MeetingComponent },
      { path: 'archive', component: MeetingArchiveComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
