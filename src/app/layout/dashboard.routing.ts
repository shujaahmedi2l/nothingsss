import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./featureOne/featureOne.module').then(m => m.FeatureOneModule)
      },
      {
        path: 'feature2',
        loadChildren: () => import('./featureTwo/featureTwo.module').then(m => m.FeatureTwoModule)
      }
    ]
  },
];

export const DashboardRoutes = RouterModule.forChild(routes);
