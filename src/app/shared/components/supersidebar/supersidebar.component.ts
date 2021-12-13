import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supersidebar',
  templateUrl: './supersidebar.component.html',
  styleUrls: ['./supersidebar.component.scss']
})
export class SupersidebarComponent implements OnInit {
  public showMenu: string;
  constructor(public router: Router) { }

  ngOnInit() {
    this.showMenu = '';
  }
  org(){
    this.router.navigateByUrl('/super/org');
  }
  qupdates(){
    this.router.navigateByUrl('/super/drivers');
  }
}
