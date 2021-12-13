import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiUpdatesComponent } from './kpi-updates.component';

describe('KpiUpdatesComponent', () => {
  let component: KpiUpdatesComponent;
  let fixture: ComponentFixture<KpiUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
