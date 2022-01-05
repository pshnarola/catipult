import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../../services/data-service/data-service.service';

@Component({
  selector: 'app-day-action-item',
  templateUrl: './day-action-item.component.html',
  styleUrls: ['./day-action-item.component.scss']
})
export class DayActionItemComponent implements OnInit {
  notifications: any;
  name = "";
  userRole: any;
  url: any;
  notSub: Subscription;
  constructor(public router: Router, public dataservice: DataServiceService) {}

  ngOnInit() {
    this.url = this.dataservice.getPhoto();
    this.userRole = this.dataservice.getRole();
    this.name = this.dataservice.getUserInfo();
    this.notSub = this.dataservice.notifydata.subscribe(data => {
      this.notifications = data;
      console.log(': ===> this.notifications', this.notifications);
      this.dataservice.updateNotify();
    });
  }
  ngOnDestroy(): void {
    this.notSub.unsubscribe();
  }
 
}
