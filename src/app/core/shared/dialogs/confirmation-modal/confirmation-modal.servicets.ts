import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { IConfirmation } from '../../interfaces/config.model';

@Injectable({ providedIn: 'root' })
export class ConfirmationDialogService {

  constructor(
    private modalService: NgbModal
  ) { }

  public confirm(
    data: IConfirmation
  ): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: data?.dialogSize });
    modalRef.componentInstance.title = data?.title;
    modalRef.componentInstance.message = data?.message;
    modalRef.componentInstance.btnOkText = data?.btnOkText;
    modalRef.componentInstance.btnCancelText = data?.btnCancelText;
    modalRef.componentInstance.extraIcon = data?.extraIcon;
    modalRef.componentInstance.iconClass = data?.iconClass;
    return modalRef.result;
  }
}
