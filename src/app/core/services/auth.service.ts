import { Injectable, Injector } from '@angular/core';
import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { map, shareReplay, tap, catchError, takeUntil } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpService } from "@app/core/services/http.service";
import { SIGNIN, LOGOUT } from '@app/core/constants/apis-list';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {
  private errors = [];
  public loggedIn = false;
  public userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(injector: Injector) {
    super(injector);

  }

  login(body: { email: any, password: any }) {
    return this.requestEntity(
      'POST',
      SIGNIN,
      body,
    )
      .pipe(
        map((response: any) => {
          if ((response.status as any) === this.constantList.SUCCESS_STATUS) {
            if (!response.body) {
              this.showMessage(`User doesn't exists!`, 'warning');
            }
          }
          this.clearErrors();
          return null;
        }),
        tap(authResult => {
          if (authResult) {
            this.loggedIn = true;
            return authResult;
          }
          this.loggedIn = false;
          return null;
        }),
        shareReplay(1),
        catchError(err => throwError(() => this.handleErrorMessages(err)))
      );
  }

  public logout() {
    this.requestEntity(
      'DELETE',
      LOGOUT,
      null,
      this.formDataHeaders,
      false,
    ).pipe(
     takeUntilDestroyed(),
    ).subscribe({
      complete: () => {
        this.localService.clearDataInLocalStorage();
        window.location.replace('/auth/login');
      }
    });
  }

  public isLoggedIn(): boolean {
    // return this.localService.getToken();
    return true
  }

  public clearErrors() {
    this.errors = [];
  }
}
