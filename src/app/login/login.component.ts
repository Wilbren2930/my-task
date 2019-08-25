import { Component, OnInit } from '@angular/core';
import { BackendService } from './../backend.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service: BackendService) { }

  ngOnInit() {
  }

  verificar(){
    this._service.currentUser = true;
   // routerLink="/home";
  }

}
