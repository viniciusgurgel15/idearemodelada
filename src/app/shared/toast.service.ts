import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title: string = null) {
    this.toastr.success(message, title || 'Sucesso!', {
      progressBar: true
    });
  }

  error(message: string, title: string = null) {
    this.toastr.error(message, title || 'Falha!', {
      timeOut: 6000,
      progressBar: true
    });
  }
}
