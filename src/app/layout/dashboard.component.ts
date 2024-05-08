import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  NewVersionNotficationflag: boolean = false;

  constructor(private updateService: SwUpdate) { }

   ngOnInit() {
    if (!this.updateService.isEnabled) {
      console.error(`Service Worker is not enabled at env ${environment.environment} `);
      return;
    }
    console.log('Service Worker is enabled');
    this.#handleUpdates();
  }

  async #handleUpdates() {
    this.updateService.versionUpdates.subscribe((event: VersionEvent) => {
      console.log(event);
      if (event.type === 'VERSION_READY') {
        this.NewVersionNotficationflag = true;
      }
    });
  }

  ReloadPage() {
    window.location.reload();
  }

  close() {
    this.NewVersionNotficationflag = false;
  }
}
