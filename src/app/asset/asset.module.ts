import { NgModule } from '@angular/core';
import { CommonModule, DatePipe  } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AssetRoutingModule } from './asset-routing.module';
import { AssetComponent } from './asset.component';
import { AssetListComponent } from './asset-list/asset-list.component';
// import { AssetTableComponent } from './asset-table/asset-table.component';
import { AssetTestComponent } from './asset-test/asset-test.component';
import { DeleteAssetModalComponent } from './delete-asset-modal/delete-asset-modal.component';


@NgModule({
  declarations: [
    AssetComponent,
    AssetListComponent,
    // AssetTableComponent,
    AssetTestComponent,
    DeleteAssetModalComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
    NgbModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
})
export class AssetModule { }
