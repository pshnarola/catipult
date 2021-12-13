import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstatementComponent } from './outstatement.component';

describe('OutstatementComponent', () => {
  let component: OutstatementComponent;
  let fixture: ComponentFixture<OutstatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutstatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
