import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserRegister } from '../../../entities/user-register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder) {
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

  get errors(){
    return this.frm.errors;
  }

  submitted: boolean = false;

  onSubmit(data: UserRegister) {
    this.submitted = true;

    if (this.frm.invalid) {
      return;
    }
  }
}
