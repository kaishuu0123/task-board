import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import templateString from "./project-subnav.component.html";
import { ProjectFormModalComponent } from './project-form-modal.component';

@Component({
  selector: 'project-subnav',
  template: templateString
})
export class ProjectSubNav {
  @Input() title: string;
  @Output() projectSaved: EventEmitter<any> = new EventEmitter();

  activeModal: NgbModalRef;
  closeResult: string;

  constructor(
    private modalService: NgbModal
  ) { }

  open(content) {
    this.activeModal = this.modalService.open(ProjectFormModalComponent, { size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    this.activeModal.componentInstance.projectSaved.subscribe((event) => {
      this.projectSaved.emit(null);
    });
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