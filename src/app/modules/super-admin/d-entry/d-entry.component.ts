import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-d-entry',
  templateUrl: './d-entry.component.html',
  styleUrls: ['./d-entry.component.scss']
})
export class DEntryComponent implements OnInit {
drivers: any;
  constructor(public router: Router, public dataservice: DataService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.dataservice.driversdata.subscribe((data)=>{
      this.drivers= data;
      console.log(data);
    });
    this.dataservice.getDrivers();
  }
  drive(v){
   // console.log(v);
    // this.router.navigateByUrl('/admin/qaupdates', v.driverID);
    this.router.navigateByUrl(`/super/qaupdates/${v.driverID}/${v.driverName}`);

    // this.router.navigate(['id', 33, 'driver', 11], {relativeTo: this.route});

  }
}
