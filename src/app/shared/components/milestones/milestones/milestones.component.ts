import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})

export class MilestonesComponent implements OnInit,OnChanges {

  @Input() data:any;
  @Input() userData:any;
  @Input() scope:string;
  @Input() modify:boolean = true;
  
  constructor() { }

  milestoneData:any = []
  milestoneColumns:any = ['KPI','Rock','DueDate','Status','User'];

  ngOnChanges():void {
    let data:any = [];

    for (const m in this.data){
      data.push({
        KPI:this.data[m].Kpi ? this.data[m].Kpi.objective : null,
        Rock:this.data[m].achieveText,
        DueDate:this.data[m].dueDate,
        Status:this.data[m].charpStatus,
        User:this.data[m].User ? this.data[m].User.name + ' ' + this.data[m].User.lname : null
      })  
    }
    this.milestoneData = data;
  }

  ngOnInit() {
  }

}
