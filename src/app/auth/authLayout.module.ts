import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './authLayout.component';
import { AuthRoutes } from './auth.routing';
import { SigninComponent } from "./signin/signin.component";
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    SigninComponent,
    AuthRoutes,
  ]
})
export class AuthLayoutModule { }
