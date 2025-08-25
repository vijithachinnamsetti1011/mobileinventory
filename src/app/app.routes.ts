import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
    {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.page').then( m => m.LoginPagePage)
  },

  {
    path: 'organization/:orgId',
    loadComponent: () => import('./pages/organization-page/organization-page.page').then( m => m.OrganizationPagePage)
  },
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

];
