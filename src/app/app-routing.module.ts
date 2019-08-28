import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { AuthSecurityGuard } from './guards/auth-security.guard';

const routes: Routes = [
    { path: '', redirectTo: '/login' , pathMatch: 'full'},
    { path: 'home', component: HomeComponent, canActivate: [AuthSecurityGuard]},
    { path: 'login', component: LoginComponent},
    { path: '**',  component: Error404Component, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
