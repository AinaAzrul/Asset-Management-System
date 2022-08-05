import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCalibModalComponent } from './delete-calib-modal.component';

describe('DeleteCalibModalComponent', () => {
  let component: DeleteCalibModalComponent;
  let fixture: ComponentFixture<DeleteCalibModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCalibModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCalibModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
