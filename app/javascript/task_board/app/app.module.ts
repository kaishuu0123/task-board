import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmoothDnDModule } from 'ngx-smooth-dnd';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import { AppRoutes } from './app.route';

import { AppComponent } from './app.component';
import { NavBar } from './navbar.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { ProjectPageComponent } from './pages/project/project-page.component';
import { ProjectSubNav } from './components/project/project-subnav.component';
import { ProjectFormModalComponent } from './components/project/project-form-modal.component';
import { TaskPageComponent } from './pages/task/task-page.component';
import { TaskFormModalComponent } from './components/task/task-form-modal.component';
import { TaskSubNav } from './components/task/task-subnav.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { AppI18nLoader } from './i18n/app-i18n-loader';
import { RegistrationPageComponent } from './pages/registration/registration-page.component';
import { AuthGuard } from './guard/auth.guard';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavBar,
    ProjectSubNav,
    ProjectPageComponent,
    ProjectFormModalComponent,
    TaskFormModalComponent,
    TaskSubNav,
    TaskPageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    SearchFilterPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSmoothDnDModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        blacklistedRoutes: ['/api/v1/login'],
        skipWhenExpired: true
      }
    }),
    RouterModule.forRoot(
      AppRoutes,
      {
        useHash: true,
        enableTracing: false // for debugging
      }
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: AppI18nLoader
      }
    })
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProjectFormModalComponent,
    TaskFormModalComponent
  ]
})
export class AppModule { }
