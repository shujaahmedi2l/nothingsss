import {Injectable, Output, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { HttpService } from './http.service';
import { AppSettingConfig } from '../shared/interfaces/app-types';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  public loadingBarSource = new BehaviorSubject(false);
  private formSubmitButtonSource = new BehaviorSubject(false);
  public loadingBarSourceReset = new BehaviorSubject(false);
  public appConfigSource: BehaviorSubject<AppSettingConfig> = new BehaviorSubject<AppSettingConfig>(this.getDefaultAppConfig());
  appConfig$ = this.appConfigSource.asObservable();


  public appInstanceId$: BehaviorSubject<null | string> = new BehaviorSubject<null | string>(null);

  @Output() toggleShowWidget: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  constructor(
    public httpService: HttpService,
  ) {

    this.appConfigSource.next(
      this.getDefaultAppConfig()
    );

  }

  /**
   * the following method is used to emit for loading bar
   * @param status
   */
  showLoadingBar(status: boolean) {
    setTimeout(() => {
      this.loadingBarSource.next(status);
    }, 150);
  }

  /**
   * the following method is used to emit for loading bar
   * @param submit
   */
  changeFormSubmitStatus(submit: boolean) {
    setTimeout(() => {
      this.formSubmitButtonSource.next(submit);
    }, 150);
  }

  /**
   * the following method is used to set the app theme mode
   * @param config
   */
  setAppConfig(config: AppSettingConfig = this.getDefaultAppConfig()): void {
    if (JSON.stringify(this.appConfigSource.value) !== JSON.stringify(config)) {
      this.appConfigSource.next(config)
    }
  }


  getDefaultAppConfig(): any {
    return <AppSettingConfig>{
      theme: 'dark',
      isSideBarCollapse: false
    };
  }
}
