import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { LoginComponent } from './login/login.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';

import { AuthRoutingModule } from './auth-routing';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';

@NgModule({
  declarations: [LoginComponent, PasswordresetComponent, Recoverpwd2Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    AuthRoutingModule,
    CarouselModule
  ]
})
export class AuthModule { }
