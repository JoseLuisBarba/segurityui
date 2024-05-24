import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class InformationToasterService {

  private toastrService = inject(ToastrService);
  constructor() {}

  success(message: string, title?: string) {
    this.toastrService.success(message, title);
  }

  error(message: string, title?: string) {
    this.toastrService.error(message, title);
  }

  warning(message: string, title?: string) {
    this.toastrService.warning(message, title);
  }

  info(message: string, title?: string) {
    this.toastrService.info(message, title);
  }

}
