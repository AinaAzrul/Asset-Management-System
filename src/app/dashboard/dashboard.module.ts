import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartComponent } from '../chart/chart.component';
import { CardComponent } from './card/card.component';
import { AuditDatatableComponent } from './audit-datatable/audit-datatable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ChartComponent,
    CardComponent,
    AuditDatatableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxDatatableModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
