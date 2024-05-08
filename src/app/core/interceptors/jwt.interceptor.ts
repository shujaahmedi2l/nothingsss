import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { DEFAULT_INVALID_TOKEN_SERVER_RESPONSE, DEFAULT_INVALID_TOKEN_SIGNATURE_SERVER_RESPONSE } from "@app/core/constants/constant-list";
import { SharedDataService } from '../services/shared-data.service';
import { LocalStorageService } from '../services/local-storage.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private sharedDataService: SharedDataService,
    private localService: LocalStorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'x-locale': '',
      }
    });
    // Checking token only for Auth apis
    const url: string = request.url.toLowerCase();
    const isTokenRequired = url.includes('/logout') || !url.includes('/auth/');
    if (isTokenRequired) {
      const token ={};
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          }
        });
      }
    }

    return next.handle(request)
      .pipe(
        tap({
          next: (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // if any response says, token not provided
              if (event.body.message === DEFAULT_INVALID_TOKEN_SERVER_RESPONSE ||
                event.body.message === DEFAULT_INVALID_TOKEN_SIGNATURE_SERVER_RESPONSE ||
                event.status == 401 || event?.body?.status == 401) {
                this.handleLogout();
              }
            }
          },
          error: (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status == 401) {
                this.handleLogout();
              }
            }
          }
        })
      );
  }

  private handleLogout(): void {
    this.sharedDataService.showLoadingBar(false);
    this.localService.clearDataInLocalStorage();
    setTimeout(() => {
      location.replace('/auth/signin');
    }, 100);
  }
}
