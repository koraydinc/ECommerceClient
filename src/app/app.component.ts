import { Component } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrPosition, ToastrMessageType } from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECommerceClient';

  constructor(public authService: AuthService, private toastrService: CustomToastrService) {
    this.authService.identityCheck();
  }

  logout() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.toastrService.message("Logout successful", "Success", { messageType: ToastrMessageType.Warning, position: ToastrPosition.TopRight });
  }
}