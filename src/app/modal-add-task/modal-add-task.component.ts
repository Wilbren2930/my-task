import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons , NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { BackendService } from './../backend.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal-add-task',
  templateUrl: './modal-add-task.component.html',
  styleUrls: ['./modal-add-task.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(-500)' })),
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
})
export class ModalAddTaskComponent implements OnInit {

  closeResult: string;
  constructor(private modalService: NgbModal, private _service: BackendService) { }

  ngOnInit() {
  }

  taskN = new FormControl('');

  add(){
    this._service.task.push(this.taskN.value);
    this.taskN.setValue(''); 
    this.modalService.dismissAll();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
