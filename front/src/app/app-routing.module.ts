import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';

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
    path: 'thankyou',
    loadChildren: () => import('./pages/thankyou/thankyou.module').
    then(m => m.ThankyouModule),
  },
  {
    path: '**',
    redirectTo: 'login'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
