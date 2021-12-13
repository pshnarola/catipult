import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLevelTwoComponent } from './team-level-two.component';

describe('TeamLevelTwoComponent', () => {
  let component: TeamLevelTwoComponent;
  let fixture: ComponentFixture<TeamLevelTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLevelTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLevelTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
