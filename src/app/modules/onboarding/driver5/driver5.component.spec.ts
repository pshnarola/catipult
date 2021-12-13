import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Driver5Component } from './driver5.component';

describe('Driver5Component', () => {
  let component: Driver5Component;
  let fixture: ComponentFixture<Driver5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Driver5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Driver5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
