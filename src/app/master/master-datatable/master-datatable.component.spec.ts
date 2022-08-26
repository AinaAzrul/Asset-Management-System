import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDatatableComponent } from './master-datatable.component';

describe('MasterDatatableComponent', () => {
  let component: MasterDatatableComponent;
  let fixture: ComponentFixture<MasterDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterDatatableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
