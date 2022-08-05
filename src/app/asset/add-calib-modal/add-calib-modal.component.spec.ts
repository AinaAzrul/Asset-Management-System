import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalibModalComponent } from './add-calib-modal.component';

describe('AddCalibModalComponent', () => {
  let component: AddCalibModalComponent;
  let fixture: ComponentFixture<AddCalibModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalibModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalibModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
