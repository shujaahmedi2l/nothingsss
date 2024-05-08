import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './sideBar/sideBar.component';
import { HeaderComponent } from './header/header.component';
import { DashboardRoutes } from './dashboard.routing';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes,
    RouterOutlet,
    SideBarComponent,
    HeaderComponent,
    NgbAlertModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.local,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
