import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingArchiveComponent } from './meeting-archive.component';

describe('MeetingArchiveComponent', () => {
  let component: MeetingArchiveComponent;
  let fixture: ComponentFixture<MeetingArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
