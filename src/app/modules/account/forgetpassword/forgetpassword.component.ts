import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { DataService } from '../services/data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  leftStyle = 'forget-page';
  userDetailsForm: any;
  constructor(breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
              private router: Router, private dataservice: DataService) {
      breakpointObserver.observe([
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait
      ]).subscribe(result => {
        if (result.matches) {
          this.leftStyle = 'forget-response';
          console.log('handset mode');
        }
      });
      breakpointObserver.observe([
        Breakpoints.WebLandscape,
        Breakpoints.Large,
        Breakpoints.Medium
      ]).subscribe(result => {
        if (result.matches) {
          this.leftStyle = 'forget-page';
          console.log('handset mode');
        }
      });
     }

  ngOnInit() {
    this.userDetailsForm = this.fb.group({
      email: ['', Validators.required ],
   });
  }
  onLogin() {
    this.dataservice.login({email: 'bharat@gmail.com', password: 'bharat'});
    // localStorage.setItem('isLoggedin', 'true');
    // this.router.navigate(['/dashboard']);
}
ok(){
  this.router.navigate(['/account/login']);
}
onSend(customerData) {
  // console.log(customerData);
  this.dataservice.resetPassword(customerData.email);
  document.getElementById('openModalButton').click();

}

}
