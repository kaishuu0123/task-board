import {Component, Input, Output, OnInit, AfterViewInit, ViewChild, EventEmitter} from '@angular/core';
import {ElementRef} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import templateString from './task-form-modal.component.html';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TaskService } from "../../services/task.service";
import { Project, Task } from '../../models/app-models';

export class NgbdModalContent {
  @Input() name;

  constructor(
    public activeModal: NgbActiveModal
  ) {}
}

@Component({
  selector: 'task-form-modal',
  template: templateString
})
export class TaskFormModalComponent implements OnInit,AfterViewInit {
  @ViewChild('titleInput') titleInput: ElementRef;
  @Input() project: Project;
  @Input() isUpdate: Boolean;
  @Input() task: Task;
  @Input() isEdit: Boolean;

  @Output() taskSaved: EventEmitter<any> = new EventEmitter();

  taskForm: FormGroup;
  taskErrorMessage: string = '';
  projectId: Number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public modal: NgbActiveModal,
    private taskService: TaskService
  ) { }

  ngAfterViewInit() {
    if (this.isEdit) {
      this.titleInput.nativeElement.focus();
    }
  }

  ngOnInit() {
    this.taskForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'description': new FormControl('', [])
    });

    if (this.isUpdate) {
      this.taskForm.setValue({
        title: this.task.title,
        description: this.task.description
      });
    }
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  titleErrorMsg(): string {
    return this.title.errors['required'] ? 'Please enter task title.' : '';
  }

  changeToEdit() {
    this.isEdit = true;
  }

  saveTask() {
    let task = this.taskForm.value;
    let observer;
    if (this.isUpdate) {
      task.id = this.task.id;
      observer = this.taskService.update(this.project.id, task);
    } else {
      observer = this.taskService.create(this.project.id, task);
    }

    observer.subscribe(
      (task) => {
        this.task = task;
        this.taskSaved.emit(null);
        this.isEdit = false;
      },
      error => {
        console.log(error);
        this.taskErrorMessage = error.message;
      }
    )
  }

  saveTaskAndModalClose() {
    let task = this.taskForm.value;
    let observer;
    if (this.isUpdate) {
      task.id = this.task.id;
      observer = this.taskService.update(this.project.id, task);
    } else {
      observer = this.taskService.create(this.project.id, task);
    }

    observer.subscribe(
      () => {
        this.taskForm.reset();
        this.modal.close();
        this.taskSaved.emit(null);
        this.router.navigateByUrl(`/projects/${this.project.id}/tasks`);
      },
      error => {
        console.log(error);
        this.taskErrorMessage = error.message;
      }
    )
  }

  deleteTask() {
    const observer = this.taskService.destroy(this.task);

    observer.subscribe(
      () => {
        this.taskForm.reset();
        this.modal.close();
        this.taskSaved.emit(null);
        this.router.navigateByUrl(`/projects/${this.project.id}/tasks`);
      },
      error => {
        console.log(error);
        this.taskErrorMessage = error.message;
      }
    )
  }
}