import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
  position: number;
  objective: string;
  qty: number;
  unit: string;
  action: boolean;
}
export class Drivers implements PeriodicElement {
  position: number;
  objective: string;
  qty: number;
  unit: string;
  action: boolean;
}
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {
  @ViewChild('objective', { static: false }) nameField: ElementRef;
  leftStyle = 'card';
  headerObj = false;
  ELEMENT_DATA: PeriodicElement[] = [
  ];
  editFlag = false;
  element: Drivers;
  headerU = false;
  headerM = false;
  displayedColumns = ['position', 'objective', 'qty', 'unit', 'action'];
  dataSource = this.ELEMENT_DATA;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  matcher = new MyErrorStateMatcher();
  constructor(breakpointObserver: BreakpointObserver) {
    this.element = new Drivers();
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
   formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  ngOnInit() {
     }
     add() {
      if (!this.element.position) {
        this.element.position = this.ELEMENT_DATA.length + 1;
      }
      const ele = this.element;
      this.ELEMENT_DATA.push(ele);
      this.dataSource = [...this.ELEMENT_DATA];
      this.element = new Drivers();
      this.nameField.nativeElement.focus();
      console.log(this.element, this.ELEMENT_DATA, this.dataSource);
    }
    save() {
      console.log(this.element);
      const l = this.element;
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(function (value, index, arr) {
        return value.position !== l.position;
      });
      const ele = this.element;
      this.ELEMENT_DATA.push(ele);
      this.dataSource = [...this.ELEMENT_DATA];
      this.element = new Drivers();
      this.editFlag = false;
      this.nameField.nativeElement.focus();
    }
    edit(element: any) {
      console.log(element);
      this.element = element;
      this.editFlag = true;
      //   this.ELEMENT_DATA = this.ELEMENT_DATA.filter(function(value, index, arr) {
      //     return value.position !== element.position;
      // });
      // this.dataSource = [...this.ELEMENT_DATA];

    }
    delete(element: any) {
      // this.ELEMENT_DATA.
      // tslint:disable-next-line:only-arrow-functions
      this.ELEMENT_DATA = this.ELEMENT_DATA.filter(function (value, index, arr) {
        return value.position !== element.position;
      });
      this.dataSource = [...this.ELEMENT_DATA];
    }
    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }
     update(o, u, m) {
      console.log(o, u, m);
      this.headerObj = o;
      this.headerU = u;
      this.headerM = m;
           }
           numberOnly(event): boolean {
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
              return false;
            }
            return true;

          }
}
