import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').
    then(m => m.DashboardModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').
      then(m => m.LoginModule),
    //path: 'login',component:LoginComponent
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/form/form.module').
    then(m => m.FormModule),
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
