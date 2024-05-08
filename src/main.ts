import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig, enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { routes } from '@app/app.routes';
import { provideRouter } from '@angular/router';


if (environment.production) {
  enableProdMode();
}

const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
