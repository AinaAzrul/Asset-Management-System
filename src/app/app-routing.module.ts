import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Component
import { LoginComponent } from './login/login.component';
// import { SidenavComponent } from './sidenav/sidenav.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetListComponent } from './asset-list/asset-list.component';

// Authentication
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: '', canActivate: [AuthGuard], component: DashboardComponent },
      { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
      { path: 'master-list', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
      { path: 'asset-list', canActivate: [AuthGuard], component: AssetListComponent },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    ]
  },

 {
    path: 'login',
    component: LoginComponent
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
})
export class AppRoutingModule { }
