import {  Injectable, Injector} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as ROUTE_LIST from '../constants/routes';
import * as ENDPOINTS from '../constants/apis-list';
import * as CONSTANT_LIST from '../constants/constant-list';
import { LocalStorageService, SharedDataService, HttpService } from '../services';
import { ToastService } from '../services/toast.service';
import { ConfirmationDialogService } from '../shared/dialogs/confirmation-modal/confirmation-modal.servicets';




@Injectable()
export abstract class BaseComponent  {
  public apiList = ENDPOINTS;
  public routeList = ROUTE_LIST;
  public constantList = CONSTANT_LIST;
  public activatedRoute: ActivatedRoute;
  public toast: ToastService
  public httpService: HttpService;
  public sharedDataService: SharedDataService;
  public localStorageService: LocalStorageService;
  public modalService: NgbModal;
  public router: Router;
  public confirmationdialogservice: ConfirmationDialogService

  /**
   * the following is used to keep the page id based on for edit/detail/view screen
   */
  public pageIdParam: any = 'id';


  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.modalService = injector.get(NgbModal);
    this.toast = injector.get(ToastService);
    this.httpService = injector.get(HttpService);
    this.sharedDataService = injector.get(SharedDataService);
    this.localStorageService = injector.get(LocalStorageService);
    this.confirmationdialogservice= injector.get(ConfirmationDialogService)
  }


  goToRoute(link: string): void {
    this.router.navigateByUrl(link);
  }

  isLogged() {
    return !!this.localStorageService.getToken();
  }

  logout(): any {
    this.localStorageService.removeDataInLocalStorage(`${this.constantList.TOKEN}`);
    this.localStorageService.removeDataInLocalStorage('untitled');
    this.goToRoute('/');
  }

  /**
   * The following check if its edit mode
   * @returns {string | null}
   */
  isEditMode(param: string = this.pageIdParam): string | null {
    return this.activatedRoute.snapshot.paramMap.get(param);
  }

}

