import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLevelThreeComponent } from './team-level-three.component';

describe('TeamLevelThreeComponent', () => {
  let component: TeamLevelThreeComponent;
  let fixture: ComponentFixture<TeamLevelThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLevelThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLevelThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
