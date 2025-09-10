import { Routes } from '@angular/router';

export const routes: Routes = [
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
  {
    path: 'activity',
    loadComponent: () => import('./pages/activity-page/activity-page.page').then( m => m.ActivityPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-page/dashboard-page.page').then( m => m.DashboardPagePage)
  },
  {
    path: 'Item-list',
    loadComponent: () => import('./pages/Items-list/Item-list.page').then( m => m.ItemListPage)
  },
  {
    path: 'order-details/:poNumber',
    loadComponent: () => import('./pages/order-details/order-details.page').then( m => m.OrderDetailsPage)
  },
  {
    path: 'receive-order',
    loadComponent: () => import('./pages/receive-order/receive-order.page').then( m => m.ReceiveOrderPage)
  },
  {
    path: 'sub-inventory',
    loadComponent: () => import('./pages/sub-inventory/sub-inventory.page').then( m => m.SubInventoryPage)
  },
  {
    path: 'locators',
    loadComponent: () => import('./pages/locators/locators.page').then( m => m.LocatorsPage)
  },
  {
    path: 'transaction-history',
    loadComponent: () => import('./pages/transaction-history/transaction-history.page').then( m => m.TransactionHistoryPage)
  },

];
