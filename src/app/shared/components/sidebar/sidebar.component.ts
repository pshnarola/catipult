import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    constructor(public router: Router) {}

    ngOnInit() {
        this.showMenu = '';
    }
    qupdates(){
      this.router.navigateByUrl('/dash/quaupdates');
    }
    dash(){
      this.router.navigateByUrl('/dashboard');
    }
    cupdates(){
      this.router.navigateByUrl('/dash/kpiupdates');
    }
    rvQuestion(){
      this.router.navigateByUrl('/step2Review');
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
