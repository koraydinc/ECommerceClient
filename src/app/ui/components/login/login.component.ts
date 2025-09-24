import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { UserService } from '../../../services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  constructor(private userService: UserService, spinner : NgxSpinnerService) {
    super(spinner);
   }
   showPasswordWarning = false;
   showUsernameWarning = false;

  login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallFussion);
    this.showPasswordWarning = !password;
    this.showUsernameWarning = !usernameOrEmail;
    if (this.showPasswordWarning || this.showUsernameWarning) {
      this.hideSpinner(SpinnerType.BallFussion);
      return;
    }
    this.userService.login(usernameOrEmail, password)
      .then(() => {
        this.hideSpinner(SpinnerType.BallFussion);
      })
      .catch(() => {
        this.hideSpinner(SpinnerType.BallFussion);
      });
  }
}
