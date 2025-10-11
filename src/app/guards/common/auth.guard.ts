import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const toastrService: CustomToastrService = inject(CustomToastrService);
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);
  
  spinner.show(SpinnerType.BallFussion);

  if (!_isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    toastrService.message("Login required!", "Unauthorized", { messageType: ToastrMessageType.Warning, position: ToastrPosition.TopRight });
  }

  spinner.hide(SpinnerType.BallFussion);

  return true;
};
