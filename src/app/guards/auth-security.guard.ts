import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { BackendService } from './../backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSecurityGuard implements CanActivate {
  
  constructor(private afsAuth: AngularFireAuth, private router: Router, private _service: BackendService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.afsAuth.authState
    .pipe(take(1))
    .pipe(map(authState => !!authState))
    .pipe(tap(auth => {
        if(!auth){
            this.router.navigate(['login']);
        }
        if(auth){
          this._service.currentUser = true;
        }
    }));
  }
  
}
