import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Driver7Component } from './driver7.component';

describe('Driver7Component', () => {
  let component: Driver7Component;
  let fixture: ComponentFixture<Driver7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Driver7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Driver7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
