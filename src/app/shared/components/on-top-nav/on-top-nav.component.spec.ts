import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnTopNavComponent } from './on-top-nav.component';

describe('OnTopNavComponent', () => {
  let component: OnTopNavComponent;
  let fixture: ComponentFixture<OnTopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnTopNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
