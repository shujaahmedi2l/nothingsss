import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseNetworkService } from './base-network.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService extends BaseNetworkService {
  constructor(inject: Injector ) {
    super(inject)
  }

  public requestEntity(
    method: string,
    apiLink: string,
    body: any = {},
    headers?: HttpHeaders, /* need to config as per requirement*/
    showMessage: boolean = true
  ) {
    return this.http.request(
      method,
      apiLink,
      {
        body,
        headers,
        params: method === 'GET' && Object.keys(body || {}).length > 0 ? new HttpParams({ fromObject: body || {} }) : {},
      }
    )
      .pipe(
        map((response: any) => {
          try {
            const isError = (response?.status >= 400 && response?.status <= 500);
            if (response.message && showMessage && response.message?.toLowerCase() !== 'success') {
              this.showMessage(response.message, isError ? 'error' : 'success');
            }
            return response;
          } catch (e) {
            return response;
          }
        }),
        catchError((e: any) => throwError(() => showMessage ? this.handleErrorMessages(e.error) : e.error)),
      );
  }
}
