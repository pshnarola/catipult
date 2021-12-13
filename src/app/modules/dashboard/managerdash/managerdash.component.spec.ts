import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerdashComponent } from './managerdash.component';

describe('ManagerdashComponent', () => {
  let component: ManagerdashComponent;
  let fixture: ComponentFixture<ManagerdashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerdashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
