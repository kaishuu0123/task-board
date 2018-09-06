import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import templateString from './login-page.component.html';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  template: templateString
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  invalidCredential: boolean = false;
  flashMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, this.passwordError()])
    })

    this.route.queryParams.subscribe((queryParams) => {
      this.flashMessage = queryParams.message;
      console.log(this.flashMessage);
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
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

  login() {
    const loginUser = this.loginForm.value;
    this.authenticationService.login(loginUser).subscribe(
      () => {
        this.router.navigateByUrl('/');
      },
      error => {
        this.invalidCredential = true;
      }
    );
  }
}
