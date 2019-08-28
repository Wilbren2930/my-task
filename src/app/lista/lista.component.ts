import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { BackendService } from './../backend.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
})
export class ListaComponent implements OnInit {
  
  public task = [];

  currentUser:boolean;
  constructor( private _service: BackendService) { 
    this.currentUser = _service.currentUser;
  }

  ngOnInit() {
    this._service.getAllTask().subscribe(task => {
      this.task = task;
    })
  }

  deleteTask(id:string){
    this._service.deleteOneTask(id);
  }

}
