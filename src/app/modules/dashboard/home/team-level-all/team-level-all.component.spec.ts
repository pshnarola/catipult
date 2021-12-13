import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLevelAllComponent } from './team-level-all.component';

describe('TeamLevelAllComponent', () => {
  let component: TeamLevelAllComponent;
  let fixture: ComponentFixture<TeamLevelAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLevelAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLevelAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
