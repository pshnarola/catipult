import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneDashboardComponent } from './milestone.component';

describe('MilestoneComponent', () => {
  let component: MilestoneDashboardComponent;
  let fixture: ComponentFixture<MilestoneDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
