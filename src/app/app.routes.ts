import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/authLayout.module').then(m => m.AuthLayoutModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
