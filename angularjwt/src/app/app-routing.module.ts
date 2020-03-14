import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './modules/shared/components/register/register.component';
import { HomeComponent } from './modules/shared/components/home/home.component';
import { LoginComponent } from './modules/shared/components/login/login.component';
import { BoardAdminComponent } from './modules/shared/components/board-admin/board-admin.component';
import { AdminGuard } from './modules/shared/_helpers/admin-guard';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: BoardAdminComponent ,canActivate:[AdminGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
