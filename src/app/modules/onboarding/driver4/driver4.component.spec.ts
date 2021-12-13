import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Driver4Component } from './driver4.component';

describe('Driver4Component', () => {
  let component: Driver4Component;
  let fixture: ComponentFixture<Driver4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Driver4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Driver4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
