import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DEntryComponent } from './d-entry.component';

describe('DEntryComponent', () => {
  let component: DEntryComponent;
  let fixture: ComponentFixture<DEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
