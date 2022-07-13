import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';

import { AssetRoutingModule } from './asset-routing.module';
import { AssetComponent } from './asset.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { AssetTableComponent } from './asset-table/asset-table.component';
import { AssetTestComponent } from './asset-test/asset-test.component';


@NgModule({
  declarations: [
    AssetComponent,
    AssetListComponent,
    AssetTableComponent,
    AssetTestComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
    NgbModule,
    NgxDatatableModule,
    FormsModule 
  ]
})
export class AssetModule { }
