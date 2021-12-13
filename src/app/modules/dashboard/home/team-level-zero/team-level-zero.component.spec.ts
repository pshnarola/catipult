import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLevelZeroComponent } from './team-level-zero.component';

describe('TeamLevelZeroComponent', () => {
  let component: TeamLevelZeroComponent;
  let fixture: ComponentFixture<TeamLevelZeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLevelZeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLevelZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
