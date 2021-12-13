import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaupdatesComponent } from './qaupdates.component';

describe('QaupdatesComponent', () => {
  let component: QaupdatesComponent;
  let fixture: ComponentFixture<QaupdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaupdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaupdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
