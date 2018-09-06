import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import templateString from './registration-page.component.html';
import { RegistrationService } from '../../services/registration.service';

@Component({
  template: templateString
})
export class RegistrationPageComponent implements OnInit {
  registrationForm: FormGroup;
  invalidCredential: boolean = false;

  constructor(
    private router: Router,
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, this.passwordError()]),
      'passwordConfirmation': new FormControl('', [Validators.required, this.passwordError()])
    })
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get passwordConfirmation() {
    return this.registrationForm.get('passwordConfirmation');
  }

  emailErrorMsg(): string {
    return this.email.errors['required'] ? 'pleaseInputEmail' :
      this.email.errors['email'] ? 'notValidEmail' : '';
  }

  passwordErrorMsg(): string {
    return this.password.errors['required'] ? 'pleaseInputPassword' :
      this.password.errors['credential'] ? 'incorrectPassword' : null;
  }

  unauthorizedErrorMsg(): string {
    return
  }

  passwordError(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return null;
    }
  }

  registration() {
    const registration = this.registrationForm.value;
    this.registrationService.signup(registration).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['login'], { queryParams: { message: response.message }});
      },
      error => {
        this.invalidCredential = true;
      }
    );
  }
}
