import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";

import { AccountRoutingModule } from "./account-routing.module";

import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { RegisterComponent } from "./register/register.component";
import { DataService } from "./services/data.service";
import { TopnavComponent } from "./topnav/topnav.component";
import { ConnectionServiceModule } from "ng-connection-service";

@NgModule({
  declarations: [
    LoginComponent,
    TopnavComponent,
    ChangePasswordComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConnectionServiceModule,
    FormsModule,
    SharedModule,
    AccountRoutingModule
  ],
  providers: [DataService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule {}
