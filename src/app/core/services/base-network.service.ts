import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { range } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage.service';
import * as CONSTANT_LIST from '../constants/constant-list';

@Injectable({
  providedIn: 'root'
})
export class BaseNetworkService {
  public localService: LocalStorageService;
  public toastService: ToastrService;
  protected router: Router;
  protected http: HttpClient;
  protected constantList = CONSTANT_LIST;
  private _headers: HttpHeaders = new HttpHeaders();
  private _formDataHeaders: HttpHeaders = new HttpHeaders();
  private _multipartFormDataHeaders: any;

  constructor(injector: Injector) {
    this.localService = injector.get(LocalStorageService);
    this.toastService = injector.get(ToastrService);
    this.router = injector.get(Router);
    this.http = injector.get(HttpClient);
    this.initHeaders();
    this.initFormDataHeaders();
    this.initMultiPartFormDataHeaders();
  }

  initHeaders(): void {
    const token = this.localService.getToken();
    this._headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', '*/*');
    if (token) {
      this._headers = this._headers.set('Authorization', `${token}`);
    }
  }

  initFormDataHeaders(): void {
    const token = this.localService.getToken();
    this._formDataHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    if (token) {
      this._formDataHeaders = this._formDataHeaders.set('Authorization', `${token}`);
    }
  }

  initMultiPartFormDataHeaders(): void {
    // HttpHeader class are immutable objects.
    const token = this.localService.getToken();
    this._multipartFormDataHeaders = {
      //'Content-Type': 'undefined',
      'Accept': '*/*',
    };
    if (token) {
      this._multipartFormDataHeaders['Authorization'] = token;
    }
  }

  get headers(): HttpHeaders {
    if (!this._headers) {
      this.initHeaders();
    }
    return this._headers;
  }

  set headers(value: HttpHeaders) {
    this._headers = value;
  }

  get formDataHeaders(): HttpHeaders {
    if (!this._formDataHeaders) {
      this.initFormDataHeaders();
    }
    return this._formDataHeaders;
  }

  set formDataHeaders(value: HttpHeaders) {
    this._formDataHeaders = value;
  }

  get multiPartFormDataHeaders(): any {
    if (!this._multipartFormDataHeaders) {
      this.initMultiPartFormDataHeaders();
    }

    return this._multipartFormDataHeaders;
  }

  parseResponse(json: any): any {
    return json as any;
  }

  /**
   * The following method is used to get the error messages from the response
   * @_param json
   * @_returns {any}
   */
  getErrorMessages(json: any): any {
    const errors = [];
    if (json) {
      if (json.validation_errors) {
        range(0, Object.keys(json.validation_errors).length).subscribe({
          next: index => {
            errors.push(json.validation_errors[Object.keys(json.validation_errors)[index]].error);
          },
          error: err => {
            errors.push(err);
          },
          complete: () => {
            if (!errors.length && json.message) {
              errors.push(json.message);
            }
          }
        });
      }

      // check for access_denied error
      if (json.message === this.constantList.DEFAULT_ACCESS_DENIED_CODE) {
        errors.push(this.constantList.DEFAULT_ACCESS_DENIED_MESSAGE);
      } else if (json.message) {
        errors.push(json.message);
      } else if (errors.length == 0) {
        errors.push(this.constantList.DEFAULT_ERROR_MESSAGE);
      }
    }
    return errors;
  }

  handleErrorMessages(json: any) {
    const errors = this.getErrorMessages(json);
    if (errors.length > 0) {
      this.showMessage(Array.isArray(errors) ? errors[0] : errors);
    }
  }

  showMessage(msg: string, type = 'error'): void {
    switch (type) {
      case 'error':
        this.toastService.error(msg, 'Error');
        break;
      case 'warning':
        this.toastService.warning(msg, 'Warning');
        break;
      case 'info':
        this.toastService.info(msg, 'Info');
        break;
      default:
        this.toastService.success(msg, 'Success');
        break;
    }
  }

  rejectErrorMessages(errorData: any, reject: any) {
    this.getErrorMessages(errorData.error).then((errorsArray: any) => {
      if (errorsArray) {
        reject(errorsArray);
      }
    });
  }

  getHttpClient(): HttpClient {
    return this.http;
  }
}
