import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthLayoutModule } from './auth/authLayout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { TimerInterceptor } from './core/interceptors/timer.interceptor';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AuthLayoutModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimerInterceptor,
      multi: true
    }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-boilerplate-basic';
  constructor()
  {

  }
}
