import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLevelCorporateComponent } from './team-level-corporate.component';

describe('TeamLevelCorporateComponent', () => {
  let component: TeamLevelCorporateComponent;
  let fixture: ComponentFixture<TeamLevelCorporateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLevelCorporateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLevelCorporateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
