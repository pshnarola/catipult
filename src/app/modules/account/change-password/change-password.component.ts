import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { HttpServiceService } from 'src/app/core/http-service/http-service.service';
import { FormBuilder, Validators } from '@angular/forms';

import * as notification from 'src/app/shared/libraries/exports.library';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
code: any;
email: any;
password: any;
cpassword: any;
userDetailsForm: any;

  constructor(   private fb: FormBuilder,private apiservice: HttpServiceService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(){
  //   this.userDetail = this.fb.group({
  //     email: ['', Validators.required ],
  //     password: ['', Validators.required],
  //     cpassword: ['', Validators.required],
  //  });
  this.code = this.route.snapshot.paramMap.get('id');
  this.email = this.route.snapshot.paramMap.get('email');
  this.userDetailsForm = this.fb.group({
    email: ['', Validators.required ],
    password: ['', Validators.required ],
    cpassword: ['', Validators.required],
  });
  }
  changePassword(){
  }
  cPass(da){

    this.apiservice.post('/v1/changePassword',{ email: da.value.email,password: da.value.password,code: this.code}).subscribe((data)=>{
      if(data.status ==='Success'){
        notification.notification(data.status,data.msg,5000)
        this.router.navigateByUrl('/account');
      }
    },(error) =>{
      console.log(error);
    })
  }

}
