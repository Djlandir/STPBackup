import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StandardDialogComponent } from './standard-dialog.component';

describe('StandardDialogComponent', () => {
  let component: StandardDialogComponent;
  let fixture: ComponentFixture<StandardDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
