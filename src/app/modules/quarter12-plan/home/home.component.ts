import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../services/data-service/data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  routeData: any;
  routeSub: Subscription;

  constructor(public dataService: DataServiceService,
    public router: Router) { }

  ngOnInit() {
    let flag= true;
    this.routeSub= this.dataService.routeUrldata.subscribe((data) =>{
      this.routeData = data;
      if(this.routeData){
        if(this.routeData.length === 0){
          this.dataService.addActiveState({
            pageName: 'driver112',
          });
          this.timeout();
          this.routeData = ['hell'];
          flag=false;
        }

      }

      console.log(this.routeData);
    });
  }
  journeyQA(){
    this.router.navigateByUrl('/journey/kpijourney_step2');
  }
  journey(){
    this.dataService.getActiveState();
    console.log('12 quarter journey');
  }
  timeout(){
    setTimeout(()=> {
      this.router.navigateByUrl('/journey/driver1');
    }, 2000);
  }

}
