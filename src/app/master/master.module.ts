import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { MasterListComponent } from './master-list/master-list.component';
import { MasterTableComponent } from './master-table/master-table.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    MasterComponent,
    MasterListComponent,
    MasterTableComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule
  ]
})
export class MasterModule { }
