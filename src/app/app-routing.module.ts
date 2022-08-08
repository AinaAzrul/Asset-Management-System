import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Component
import { LoginComponent } from './login/login.component';
// import { SidenavComponent } from './sidenav/sidenav.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { MasterTableComponent } from './master/master-table/master-table.component';

// Authentication
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always',
    children: [
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'master-list', loadChildren: () => import('./master/master.module').then(m => m.MasterModule) },
      { path: 'asset-list', loadChildren: () => import('./asset/asset.module').then(m => m.AssetModule) },
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
