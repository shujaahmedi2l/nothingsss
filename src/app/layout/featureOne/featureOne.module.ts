import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureOneComponent } from './featureOne.component';
import { RouterOutlet } from '@angular/router';
import { FeatureOneRoutes } from './featureOne.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterOutlet,
    FeatureOneRoutes
  ],
  declarations: [FeatureOneComponent]
})
export class FeatureOneModule { }
