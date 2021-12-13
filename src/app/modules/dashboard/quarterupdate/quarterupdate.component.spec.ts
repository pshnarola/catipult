import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterupdateComponent } from './quarterupdate.component';

describe('QuarterupdateComponent', () => {
  let component: QuarterupdateComponent;
  let fixture: ComponentFixture<QuarterupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
