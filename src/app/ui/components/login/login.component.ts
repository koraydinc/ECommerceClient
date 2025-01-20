import { Component } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  constructor(private userService: UserService, spinner : NgxSpinnerService) {
    super(spinner);
   }


  login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallFussion);
    this.userService.login(usernameOrEmail, password)
      .then(() => {
        this.hideSpinner(SpinnerType.BallFussion);
      })
      .catch(() => {
        this.hideSpinner(SpinnerType.BallFussion);
      });
  }
}
