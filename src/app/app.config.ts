import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  config = {
    name: 'Untitled',
    title: 'Untitled',
    apiUrl: {
      cmsUrl: '',
      backendUrl: '',
      frontendUrl: '',
    },
    environment: 'local',
  };

  constructor() {
    if (environment.developemnet) {
      this.config.environment = 'developemnet';
      this.config.apiUrl.backendUrl = '';
      this.config.apiUrl.frontendUrl = '';
    }
    if (environment.uat) {
      this.config.environment = 'uat';
      this.config.apiUrl.backendUrl = '';
      this.config.apiUrl.frontendUrl = '';
    }
    if (environment.production) {
      this.config.environment = 'production';
      this.config.apiUrl.cmsUrl = '';
      this.config.apiUrl.backendUrl = '';
      this.config.apiUrl.frontendUrl = '';
    }
  }

  getConfig(): any {
    return this.config;
  }
}
