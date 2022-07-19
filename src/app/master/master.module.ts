import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { MasterListComponent } from './master-list/master-list.component';
import { MasterTableComponent } from './master-table/master-table.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MasterDatatableComponent } from './master-datatable/master-datatable.component';
import { ModifyMasterModalComponent } from './modify-master-modal/modify-master-modal.component';

@NgModule({
  declarations: [
    MasterComponent,
    MasterListComponent,
    MasterTableComponent,
    MasterDatatableComponent,
    ModifyMasterModalComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    ReactiveFormsModule 
  ]
})
export class MasterModule { }
