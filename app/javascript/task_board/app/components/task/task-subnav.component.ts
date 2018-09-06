import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import templateString from "./task-subnav.component.html";
import { TaskFormModalComponent } from './task-form-modal.component';
import { Project } from "../../models/app-models";

@Component({
  selector: 'task-subnav',
  template: templateString
})
export class TaskSubNav {
  @Input() title: string;
  @Input() project: Project;
  @Output() taskSaved: EventEmitter<any> = new EventEmitter();

  activeModal: NgbModalRef;
  closeResult: string;

  constructor(
    private modalService: NgbModal
  ) { }

  open(content) {
    this.activeModal = this.modalService.open(TaskFormModalComponent, { size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    this.activeModal.componentInstance.taskSaved.subscribe((event) => {
      this.taskSaved.emit(null);
    });
    this.activeModal.componentInstance.project = this.project;
    this.activeModal.componentInstance.isEdit = true;
    this.activeModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any) {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}