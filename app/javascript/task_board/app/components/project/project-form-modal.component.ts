import {Component, Input, Output, OnInit, AfterViewInit, ViewChild, EventEmitter} from '@angular/core';
import {ElementRef} from '@angular/core';
import { Router } from "@angular/router";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import templateString from './project-form-modal.component.html';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProjectService } from "../../services/project.service";
import { Project } from '../../models/app-models';

export class NgbdModalContent {
  @Input() name;

  constructor(
    public activeModal: NgbActiveModal
  ) {}
}

@Component({
  selector: 'project-form-modal',
  template: templateString
})
export class ProjectFormModalComponent implements OnInit,AfterViewInit {
  @ViewChild('nameInput') nameInput: ElementRef;

  @Input() project: Project;
  @Input() isUpdate: Boolean;
  @Output() projectSaved: EventEmitter<any> = new EventEmitter();

  projectForm: FormGroup;
  projectErrorMessage: string = '';

  constructor(
    private router: Router,
    public modal: NgbActiveModal,
    private projectService: ProjectService
  ) { }

  ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }

  ngOnInit() {
    this.projectForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'description': new FormControl('', [])
    });

    if (this.isUpdate) {
      this.projectForm.setValue({
        name: this.project.name,
        description: this.project.description
      });
    }
  }

  get name() {
    return this.projectForm.get('name');
  }

  get description() {
    return this.projectForm.get('description');
  }

  nameErrorMsg(): string {
    return this.name.errors['required'] ? 'Please enter project name.' : '';
  }

  saveProject() {
    const project = this.projectForm.value;
    let observer;

    if (this.isUpdate) {
      observer = this.projectService.update(project);
    } else {
      observer = this.projectService.create(project);
    }

    observer.subscribe(
      () => {
        this.projectForm.reset();
        this.modal.close();
        this.projectSaved.emit(null);
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
        this.projectErrorMessage = error.message;
      }
    )
  }
}