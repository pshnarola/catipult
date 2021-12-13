import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Driver1Component } from './driver1.component';

describe('Driver1Component', () => {
  let component: Driver1Component;
  let fixture: ComponentFixture<Driver1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Driver1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Driver1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
