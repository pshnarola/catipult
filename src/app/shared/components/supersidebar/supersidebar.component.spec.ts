import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupersidebarComponent } from './supersidebar.component';

describe('SupersidebarComponent', () => {
  let component: SupersidebarComponent;
  let fixture: ComponentFixture<SupersidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupersidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupersidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
