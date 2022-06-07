import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryComponent } from '../../pages/country/country.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { MaterialModule } from '../../material/material.module';

import { LoginComponent } from '../../pages/login/login.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    CountryComponent
  ]
})
export class AuthLayoutModule { }
