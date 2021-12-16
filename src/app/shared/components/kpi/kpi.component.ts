import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {
  KPIData:any = []
  KPIColumns:any = ['KPI','Target','ReportFrequency'];

  constructor() { }

  ngOnInit() {
  }

}
