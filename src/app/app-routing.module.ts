import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Component
import { LoginComponent } from './login/login.component';

// Authentication
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }
