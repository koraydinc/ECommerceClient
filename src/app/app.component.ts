import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceClient';
  constructor(private toastrService: CustomToastrService) {
    this.toastrService.message("Merhabaa", "KOKO", {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.TopCenter
    });
  }
}