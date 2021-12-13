import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Driver3Component } from './driver3.component';

describe('Driver3Component', () => {
  let component: Driver3Component;
  let fixture: ComponentFixture<Driver3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Driver3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Driver3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
