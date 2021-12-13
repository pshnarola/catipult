import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";

import { HttpServiceService } from "src/app/core/http-service/http-service.service";

import { DataService } from "../services/data.service";
import { AuthServiceService } from "./../../../core/http-service/auth-service.service";

import { environment } from 'src/environments/environment';

import * as notification from 'src/app/shared/libraries/exports.library';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  code: any;
  pass = "";
  email: any;
  info = "";
  userDetailsForm: any;
  agree = false;
  videoUrl:string = environment.videoUrl;
  imageUrl:string = environment.imageUrl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiservice: HttpServiceService,
    private authservice: AuthServiceService,
    private dataservice: DataService
  ) {}

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get("id");
    this.email = this.route.snapshot.paramMap.get("email");
    this.userDetailsForm = this.fb.group({
      name: [""],
      lname: [""],
      password: ["", Validators.required],
      password2: ["", Validators.required],
      check: [false, Validators.required]
    });
  }

  agreeTerm(ev) {
    this.agree = ev;
  }

  confirm() {
    if (this.info === "Successfully Registered") {
      this.onLogin(this.email, this.pass);
    }
  }

  onLogin(email, password) {
    this.apiservice.post("/v1/login", { email, password }).subscribe(
      data => {
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            token: data.token,
            role: data.user.Role.roleName,
            name: data.user.name + " " + data.user.lname,
            roleAdmin: data.user.roleAdmin,
            img: data.user.info ? data.user.info.photo : null,
            orgID: data.user.Role.Department.Organization.orgID,
            orgName: data.user.Role.Department.Organization.orgName,
            depID: data.user.Role.Department.depID
          })
        );

        this.authservice.setStatus(true, data.user.Role.roleName);

        if (data.user.Role.roleName === "super") {
          this.router.navigateByUrl("/super");
        } else {
          this.router.navigate(["/journey/kpijourney"]);
        }
      },
      error => {},
      () => {
      }
    );

    this.userDetailsForm.reset();
  }

  onRegister(customerData) {
    this.pass = customerData.password;
    this.apiservice
      .post("/v1/user", {
        email: this.email,
        code: this.code,
        password: customerData.password,
        password2: customerData.password2,
        name: customerData.name,
        lname: customerData.lname
      })
      .subscribe(
        data => {
          this.info = "Successfully Registered";
          notification.notification(data.status,data.msg,10000)
          this.router.navigateByUrl('/account/login');
        },
        error => {
          notification.notification(error.msg.status,error.msg.msg,10000)
          this.info = error.msg ? error.msg.msg : "";
          document.getElementById("openModalButton").click();
        },
        () => {
        }
      );

    this.userDetailsForm.reset();
  }
}
