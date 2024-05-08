import { Routes, RouterModule } from '@angular/router';
import { FeatureOneComponent } from './featureOne.component';
import { FeatureOneSubComponent } from './featureOneSub/featureOneSub.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureOneComponent,
    children: [
      {
        path: 'featureOneSub',
        component: FeatureOneSubComponent
      }
    ]
  },
];

export const FeatureOneRoutes = RouterModule.forChild(routes);
