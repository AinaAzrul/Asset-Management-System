import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMasterModalComponent } from './delete-master-modal.component';

describe('DeleteMasterModalComponent', () => {
  let component: DeleteMasterModalComponent;
  let fixture: ComponentFixture<DeleteMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMasterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
