import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { AuthService } from '../../../services/common/auth.service';
import { UserService } from '../../../services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  constructor(private userService: UserService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
    super(spinner);
  }
  showPasswordWarning = false;
  showUsernameWarning = false;

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallFussion);
    this.showPasswordWarning = !password;
    this.showUsernameWarning = !usernameOrEmail;
    if (this.showPasswordWarning || this.showUsernameWarning) {
      this.hideSpinner(SpinnerType.BallFussion);
      return;
    }
    this.userService.login(usernameOrEmail, password)
      .then(() => {
        this.authService.identityCheck();
        this.activatedRoute.queryParams.subscribe((params) => {
          const returnUrl = params['returnUrl'];
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          }
        });
        this.hideSpinner(SpinnerType.BallFussion);
      })
      .catch(() => {
        this.hideSpinner(SpinnerType.BallFussion);
      });
  }
}
