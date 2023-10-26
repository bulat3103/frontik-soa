import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

  pushSuccessNotification(text: string, title: string) {
    this.toastrService.success(text, title);
  }

  pushErrorNotification(text: string, title: string) {
    this.toastrService.error(text, title);
  }

  pushWarningNotification(text: string, title: string) {
    this.toastrService.warning(text, title);
  }
}
