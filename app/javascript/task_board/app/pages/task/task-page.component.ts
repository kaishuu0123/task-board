import { Component, OnInit, AfterViewInit } from "@angular/core";
import templateString from './task-page.component.html';
import { ActivatedRoute } from "@angular/router";
import { Project, Task } from "../../models/app-models";
import { ProjectService } from "../../services/project.service";
import { TaskService } from "../../services/task.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { TaskFormModalComponent } from "../../components/task/task-form-modal.component";
import { ContainerComponent, DraggableComponent, IDropResult } from 'ngx-smooth-dnd';
import { from } from "rxjs";
import { groupBy, reduce, mergeMap, map } from "rxjs/operators";

@Component({
  template: templateString
})
export class TaskPageComponent implements OnInit, AfterViewInit {
  project: Project;
  tasks: { [key: string]: Task[]; };
  statuses: string[] = ['open', 'in_progress', 'done'];

  activeModal: NgbModalRef;
  closeResult: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private projectService: ProjectService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getTaskPayload = this.getTaskPayload.bind(this);
  }

  ngAfterViewInit() {
    this.activatedRoute.params.subscribe(params => {
      const projectId = params.projectId;
      this.projectService.get(projectId).subscribe((project: Project) => {
        this.project = project;

        this.reloadTasks();
      });
    })
  }

  onDrop(status, dropResult: IDropResult) {
    if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
      this.tasks[status] = this.applyDrag(this.tasks[status], dropResult);
      this.taskService.updateOrder(dropResult.payload, dropResult.addedIndex).subscribe((task: Task) => {
        this.reloadTasks();
      });
    } else if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      if (dropResult.addedIndex !== null) {
        this.tasks[status] = this.applyDrag(this.tasks[status], dropResult);
        this.taskService.updateStatus(dropResult.payload, status, dropResult.addedIndex).subscribe((task: Task) => {
            this.reloadTasks();
        });
      } else {
        this.tasks[status] = this.applyDrag(this.tasks[status], dropResult);
      }
    }
  }

  onTaskView(task) {
    this.activeModal = this.modalService.open(TaskFormModalComponent, { size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    this.activeModal.componentInstance.isUpdate = true;
    this.activeModal.componentInstance.project = this.project;
    this.activeModal.componentInstance.task = task;
    this.activeModal.componentInstance.isEdit = false;

    this.activeModal.componentInstance.taskSaved.subscribe((event) => {
      this.reloadTasks();
    });
  }

  onTaskEdit(task) {
    this.activeModal = this.modalService.open(TaskFormModalComponent, { size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    this.activeModal.componentInstance.isUpdate = true;
    this.activeModal.componentInstance.project = this.project;
    this.activeModal.componentInstance.task = task;
    this.activeModal.componentInstance.isEdit = true;

    this.activeModal.componentInstance.taskSaved.subscribe((event) => {
      this.reloadTasks();
    });
  }

  onTaskSaved(event) {
    this.reloadTasks();
  }

  getTaskPayload(status) {
    return ((index) => this.tasks[status][index]);
  }

  applyDrag(arr, dragResult) {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
  }

  reloadTasks() {
    this.taskService.all(this.project.id).subscribe((tasks: Task[]) => {
      this.tasks = {};
      this.statuses.forEach((status) => {
        this.tasks[status] = [];
      });

      from(tasks).pipe(
        groupBy(x => x.status, x => x),
        mergeMap( (group$) => group$.pipe(reduce((acc, cur) => [...acc, cur], ["" + group$.key]))),
        map<Task[], { status: string, values: Task[]}>((arr: any[]) => {
          return {status: arr[0], values: arr.slice(1)};
        }),
      ).subscribe((obj) => {
        this.tasks[obj.status] = obj.values.sort(this.sortByRowOrder) as Task[];
      });
    });
  }

  private sortByRowOrder(a, b) {
    if (a.row_order < b.row_order)
      return -1;
    if (a.row_order > b.row_order)
      return 1;
    return 0;
  }
}