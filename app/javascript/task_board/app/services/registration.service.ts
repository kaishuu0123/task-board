import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { RegistrationInfo } from "../models/app-models";
import { tap, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  signup(registrationInfo: RegistrationInfo) {
    const registrationParameter = {
      email: registrationInfo.email,
      password: registrationInfo.password,
      passwordConfirmation: registrationInfo.passwordConfirmation
    }
    return this.http.post<any>('/api/v1/sign_up', registrationParameter)
      .pipe(
        tap(response => {
          // nothing done
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error);
        })
      )

  }
}