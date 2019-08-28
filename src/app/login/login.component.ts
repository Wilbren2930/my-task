import { Component, OnInit } from '@angular/core';
import { BackendService } from './../backend.service'
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _service: BackendService, private router: Router) { }
  
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  email = new FormControl('');
  password = new FormControl('');
  ngOnInit() {
  }

  verificar(): void{
    this._service.onLoginEmail(this.email.value, this.password.value).then((res)=>{
      this._service.currentUser = true;
      this.router.navigate(['home']);
    }).catch(err => console.log('Error ', alert(err.message)));
  }
  
  
  verificar2(): void{
    this._service.onRegister(this.email.value, this.password.value).then((res)=>{
      this.router.navigate(['login']);
     alert("Introduzca sus credenciales.");
    }).catch(err => console.log('Error ', alert(err.message)));
  }

}
