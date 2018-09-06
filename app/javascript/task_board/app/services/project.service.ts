import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Project } from '../models/app-models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private http: HttpClient) { }

  create(project: Project): Observable<Project> {
    return this.http.post('/api/v1/projects', project)
      .pipe(
        map((project) => {
          return project as Project;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  update(project: Project): Observable<Project> {
    return this.http.put('/api/v1/projects', project)
      .pipe(
        map((project) => {
          return project as Project;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  get(projectId: Number): Observable<Project> {
    return this.http.get(`/api/v1/projects/${projectId}`)
      .pipe(
        map((project) => {
          return project as Project;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  all(): Observable<Project[]> {
    return this.http.get('/api/v1/projects')
      .pipe(
        map((response) => {
          return response as Project[];
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}

