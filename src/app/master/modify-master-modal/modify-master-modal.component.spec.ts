import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMasterModalComponent } from './modify-master-modal.component';

describe('ModifyMasterModalComponent', () => {
  let component: ModifyMasterModalComponent;
  let fixture: ComponentFixture<ModifyMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyMasterModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
