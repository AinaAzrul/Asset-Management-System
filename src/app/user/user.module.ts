import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ModifyUserModalComponent } from './modify-user-modal/modify-user-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    ModifyUserModalComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class UserModule { }
