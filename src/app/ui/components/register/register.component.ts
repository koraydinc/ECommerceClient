import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Create_User } from '../../../contracts/user/create_user';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService) {
  }

  frm: FormGroup;

  ngOnInit() {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      password: ["", [
        Validators.required
      ]],
      confirmPassword: ["", [
        Validators.required
      ]]
    }, { validators: this.checkPassword })
  }

  checkPassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }

  get controls() {
    return this.frm.controls;
  }

  get errors() {
    return this.frm.errors;
  }

  submitted: boolean = false;

  async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid) {
      return;
    }

    let result: Create_User = await this.userService.create(user);

    if (result.succeeded) {
      this.toastrService.message(result.message, "Başarılı!", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    } else {
      this.toastrService.message(result.message, "Hata!", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
    }
  }
}
