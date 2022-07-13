import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChartComponent } from '../chart/chart.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ChartComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
