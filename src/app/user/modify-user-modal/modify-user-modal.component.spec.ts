import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyUserModalComponent } from './modify-user-modal.component';

describe('ModifyUserModalComponent', () => {
  let component: ModifyUserModalComponent;
  let fixture: ComponentFixture<ModifyUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
