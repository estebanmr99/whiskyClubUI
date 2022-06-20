import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ExternalUserLayoutComponent } from './layouts/external-user-layout/external-user-layout.component';

// Routes paths and their way to be identified by the router if the are authenticated or not or if they are external users or admins.
const routes: Routes =[
  // Default route for the application.
  {
    path: '',
    redirectTo: 'country',
    pathMatch: 'full',
  }, { // Route to authenticate the user.
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }, { // Route for the user layout.
    path: 'user',
    component: ExternalUserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/external-user-layout/external-user-layout.module#ExternalUserLayoutModule'
      }
    ]
  }, { // Route for the admin layout.
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, { // Route for the country page.
    path: '**',
    redirectTo: 'whisky-products'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})

export class AppRoutingModule { }
