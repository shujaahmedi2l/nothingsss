import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable, interval} from 'rxjs';
import {tap, takeWhile} from 'rxjs/operators';
import {SharedDataService} from '../services';


@Injectable()
export class TimerInterceptor implements HttpInterceptor {
  /**
   * to keep the track of no. of requests triggered
   * @type {number}
   */
  protected requestCount = 0;

  constructor(
    public router: Router,
    private sharedDataService: SharedDataService
    ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestCount++;
    // the following will emit every 3 seconds until all requests have returned
    interval(3000)
      .pipe(
        takeWhile((value: any) => this.requestCount > 0),

      )
      .subscribe((val: any) => {
        // to make sure the snack bar is not already opened
      });

    return next.handle(request)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.requestCount--;
              // once the request count has exhausted i.e. all requests have returned then simple dismiss the rendered snack bar
              if (this.requestCount === 0) {
                this.handleRequest();
              }
            } else if (this.requestCount > 0 && !this.sharedDataService.loadingBarSource.getValue()) {
              this.handleRequest(true);
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              this.requestCount--;
              if (err.message) {
                //this.toastrService.error('Error: ' + err.message);
              }
              if (this.requestCount < 1 && this.sharedDataService.loadingBarSource.getValue()) {
                this.handleRequest();
              }
            }
          }, () => {
            if (this.requestCount < 1 && this.sharedDataService.loadingBarSource.getValue()) {
              this.handleRequest();
            }
          }
        )
      );
  }

  private handleRequest(bool: boolean = false) {
    this.sharedDataService.showLoadingBar(bool);
    this.sharedDataService.changeFormSubmitStatus(bool);
  }
}
