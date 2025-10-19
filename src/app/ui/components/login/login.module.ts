import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { GoogleSigninButtonDirective } from "@abacritt/angularx-social-login";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
            path: '', component: LoginComponent
        }]),
    GoogleSigninButtonDirective
]
})
export class LoginModule { }
