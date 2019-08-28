import { Component, OnInit } from '@angular/core';
import { BackendService } from './../backend.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentUser:boolean;
  constructor( _service: BackendService) { 
   this.currentUser = _service.currentUser;
  }

  ngOnInit() {
  }

}
