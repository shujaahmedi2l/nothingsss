import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastService:ToastrService) { }

  showMessage(msg: string, type = 'error'): void {
    switch (type) {
      case 'error':
        this.toastService.show(msg, 'Error');
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
}
