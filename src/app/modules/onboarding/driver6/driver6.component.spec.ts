import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Driver6Component } from './driver6.component';

describe('Driver6Component', () => {
  let component: Driver6Component;
  let fixture: ComponentFixture<Driver6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Driver6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Driver6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
