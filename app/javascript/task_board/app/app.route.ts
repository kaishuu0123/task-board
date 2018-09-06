import { Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login/login-page.component';
import { ProjectPageComponent } from './pages/project/project-page.component';
import { TaskPageComponent } from './pages/task/task-page.component';
import { RegistrationPageComponent } from './pages/registration/registration-page.component';
import { AuthGuard } from './guard/auth.guard';

export const AppRoutes: Routes = [
  { path: '', component: ProjectPageComponent, canActivate: [AuthGuard] },
  { path: 'projects/:projectId/tasks', component: TaskPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent },
];
