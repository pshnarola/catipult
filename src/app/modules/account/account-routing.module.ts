import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from 'src/app/core/guard/guard.service';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TopnavComponent } from './topnav/topnav.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'changePassword/:id/:email', component: ChangePasswordComponent },
      { path: 'register/:id/:email', component: RegisterComponent },
      { path: 'forgotpassword', component: ForgetpasswordComponent },
      { path: 'topnav', component: TopnavComponent, canActivate: [GuardService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
