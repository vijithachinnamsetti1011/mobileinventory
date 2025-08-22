import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
    {
    path: 'login-page',
    loadComponent: () => import('./pages/login-page/login-page.page').then( m => m.LoginPagePage)
  },
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full',
  },

];
