import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayActionItemComponent } from './day-action-item.component';

describe('DayActionItemComponent', () => {
  let component: DayActionItemComponent;
  let fixture: ComponentFixture<DayActionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayActionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
