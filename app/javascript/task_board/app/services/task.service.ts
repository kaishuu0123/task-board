import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Task } from '../models/app-models';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) { }

  create(projectId: Number, task: Task): Observable<Task> {
    return this.http.post('/api/v1/tasks', Object.assign(task, {project_id: projectId}))
      .pipe(
        map((task) => {
          return task as Task;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  update(projectId: Number, task: Task): Observable<Task> {
    return this.http.put(`/api/v1/tasks/${task.id}`, Object.assign(task, {project_id: projectId}))
      .pipe(
        map((task) => {
          return task as Task;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  updateStatus(task: Task, status: string, index: number) {
    const params = Object.assign(task, {
      status: status,
      row_order: index
    })
    return this.http.put(`/api/v1/tasks/${task.id}`, params)
      .pipe(
        map((task) => {
          return task as Task;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  updateOrder(task: Task, index: number) {
    task.row_order = index
    return this.http.put(`/api/v1/tasks/${task.id}`, task)
      .pipe(
        map((task: Task) => {
          return task as Task;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  destroy(task: Task): Observable<any> {
    return this.http.delete(`/api/v1/tasks/${task.id}`)
      .pipe(
        map(() => {
          // nothing
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  all(projectId: Number): Observable<Task[]> {
    const params = new HttpParams().set("project_id", String(projectId))
    return this.http.get('/api/v1/tasks', { params: params})
      .pipe(
        map((response) => {
          return response as Task[];
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}

