import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ModifyUserModalComponent } from './modify-user-modal/modify-user-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeleteUserModalComponent } from './delete-user-modal/delete-user-modal.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    ModifyUserModalComponent,
    DeleteUserModalComponent,
    AddUserModalComponent,
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
})
export class UserModule {}
