import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {
  leftStyle = 'card';
  favoriteSeason: string;
  seasons: string[] = ['Upto 10', 'between 10 to 30', '30 to 50', 'more than 50'];
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step3response';
        console.log('handset mode');
      }
    });
    breakpointObserver.observe([
      Breakpoints.WebLandscape,
      Breakpoints.Large,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step3';
        console.log('handset mode');
      }
    });
   }


  ngOnInit() {
  }

}
