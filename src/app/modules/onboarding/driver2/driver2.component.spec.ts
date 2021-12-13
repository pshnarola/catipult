import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Driver2Component } from './driver2.component';

describe('Driver2Component', () => {
  let component: Driver2Component;
  let fixture: ComponentFixture<Driver2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Driver2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Driver2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
