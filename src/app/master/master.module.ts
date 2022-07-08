import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { MasterListComponent } from './master-list/master-list.component';
import { MasterTableComponent } from './master-table/master-table.component';


@NgModule({
  declarations: [
    MasterComponent,
    MasterListComponent,
    MasterTableComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
  ]
})
export class MasterModule { }
