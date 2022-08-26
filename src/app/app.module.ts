import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import {
  MDBBootstrapModule,
  IconsModule,
  CardsModule,
} from 'angular-bootstrap-md';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//component
import { LoginComponent } from './login/login.component';
import { LayoutModule } from './layout/layout.module';
// import { HomeComponent } from './home/home.component';
import { SidenavModule } from './sidenav/sidenav.module';
// import { MasterListComponent } from './master-list/master-list.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    // DashboardComponent
    // MasterListComponent,
    // HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    TooltipModule,
    NgbModule,
    HttpClientModule,
    LayoutModule,
    CardsModule,
    IconsModule,
    NgSelectModule,
    NgBootstrapFormValidationModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    SidenavModule,
    NgxDatatableModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
