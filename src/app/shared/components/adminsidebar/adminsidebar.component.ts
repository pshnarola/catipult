import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.scss']
})
export class AdminsidebarComponent implements OnInit {
  public showMenu: string;
  constructor(public router: Router) { }

  ngOnInit() {
    this.showMenu = '';
  }
  addExpandClass(element: any) {
    if (element === this.showMenu) {
        this.showMenu = '0';
    } else {
        this.showMenu = element;
    }
}
qupdates(){
  this.router.navigateByUrl('/admin/drivers');
}
rDept(){
  this.router.navigateByUrl('/admin/department');
}
rUser(){
  this.router.navigateByUrl('/admin/roles');
}
rUsers(){
  this.router.navigateByUrl('/admin/invites');
}
logout(){
  this.router.navigateByUrl('/account');
}
}
