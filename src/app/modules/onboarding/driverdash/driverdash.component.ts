import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface Food {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
  notes: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Kg Lost', weight: 1.0079, symbol: 'H', status:'C', notes:'notes'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',status:'C', notes:'notes'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',status:'C', notes:'notes'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',status:'C', notes:'notes'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',status:'C', notes:'notes'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',status:'C', notes:'notes'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',status:'C', notes:'notes'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',status:'C', notes:'notes'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',status:'C', notes:'notes'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',status:'C', notes:'notes'},
];
@Component({
  selector: 'app-driverdash',
  templateUrl: './driverdash.component.html',
  styleUrls: ['./driverdash.component.scss']
})
export class DriverdashComponent implements OnInit {
  leftStyle = 'card';
  // config: SwiperOptions = {
  //   pagination: { el: '.swiper-pagination', dynamicBullets: true },
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev'
  //   },
  //   spaceBetween: 30
  // };


  displayedColumns = ['position', 'name', 'weight', 'symbol', 'status', 'notes'];
  dataSource = ELEMENT_DATA;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  matcher = new MyErrorStateMatcher();
  constructor(breakpointObserver: BreakpointObserver) {

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step2response';
        console.log('handset mode');
      }
    });
    breakpointObserver.observe([
      Breakpoints.WebLandscape,
      Breakpoints.Large,
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.leftStyle = 'step2';
        console.log('handset mode');
      }
    });
   }

  ngOnInit() {
     }

}
