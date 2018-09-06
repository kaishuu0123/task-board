import { Component, OnInit } from '@angular/core';
import templateString from './project-page.component.html';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/app-models';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProjectFormModalComponent } from '../../components/project/project-form-modal.component';

@Component({
  template: templateString
})
export class ProjectPageComponent implements OnInit {
  projects: Project[];
  activeModal: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.projectService.all().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  onProjectSaved(event) {
    this.reloadProject();
  }

  onProjectEdit(project) {
    this.activeModal = this.modalService.open(ProjectFormModalComponent, { size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    this.activeModal.componentInstance.isUpdate = true;
    this.activeModal.componentInstance.project = project;

    this.activeModal.componentInstance.projectSaved.subscribe((event) => {
      this.reloadProject();
    });
  }

  reloadProject() {
    this.projectService.all().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }
}
