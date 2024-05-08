import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SharedDataService} from '@app/core/services';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  standalone:true,
  selector: 'app-confirmation-modal',
  imports: [
    CommonModule,
    LazyLoadImageModule,
  ],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string;
  @Input() btnOkText!: string;
  @Input() btnCancelText!: string;
  @Input() extraIcon!: string;
  @Input() iconClass!: any;

  constructor(
    private activeModal: NgbActiveModal,
    public sharedDataService: SharedDataService
  ) {
  }

  ngOnInit() {
  }

  public decline() {
    this.closeModal(false);
  }

  public accept() {
    this.closeModal(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  private closeModal(value: boolean): void {
    this.activeModal.close(value);
  }
}
