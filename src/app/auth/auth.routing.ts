import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './authLayout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        loadComponent: () => import('./signin/signin.component').then((x) => x.SigninComponent),
      },
      {
        path: 'signup',
        loadComponent: () => import('./signup/signup.component').then((x) => x.SignupComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./forgot-password/forgot-password.component').then((x) => x.ForgotPasswordComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./reset-password/reset-password.component').then((x) => x.ResetPasswordComponent),
      },
      {
        path: '**',
        redirectTo: 'signin',
        pathMatch: 'full'
      }
    ]
  },
];

export const AuthRoutes = RouterModule.forChild(routes);
