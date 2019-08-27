import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private _service: BackendService) { }

  ngOnInit() {
  }

  logout(){
     this._service.logoutUser();
      this._service.currentUser = false;
      this.router.navigate(['/login']);
  }
}
