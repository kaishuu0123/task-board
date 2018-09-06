import {Component} from '@angular/core';
import templateString from './navbar.component.html';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: templateString
})
export class NavBar {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  get email() {
    return this.authenticationService.email;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/');
  }
}
