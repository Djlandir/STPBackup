import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BusyIndicatorComponent } from './busy-indicator.component';

describe('BusyIndicatorComponent', () => {
  let component: BusyIndicatorComponent;
  let fixture: ComponentFixture<BusyIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusyIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
