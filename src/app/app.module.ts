import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ExternalUserLayoutComponent } from './layouts/external-user-layout/external-user-layout.component';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExpansionComponent } from './dashboard/expansion/expansion.component';
import { MaterialModule } from './material/material.module';

import { UserService } from './services/user.service';
import { EmployeesService } from './services/employees.service';
import { OrdersService } from './services/orders.service';
import { CreateProductService } from './services/create-product.service';
import { InventoryService } from './services/inventory.service';
import { WhiskyProductService } from './services/whisky-product.service';

import { AuthorizeGuard } from './services/authorize-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { UserGuard } from './services/user-guard.service';
import { JWTTokenService } from './services/jwttoken.service';
import { LocalStorageService } from './services/local-storage.service';
import { UniversalAppInterceptor } from './services/universal-app-interceptor.service';

// Where all the components and services are imported.
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ExternalUserLayoutComponent,
    ExpansionComponent
  ],
  providers: [
    NgbActiveModal,
    UserService,
    EmployeesService,
    OrdersService,
    CreateProductService,
    AuthorizeGuard,
    AdminGuard,
    UserGuard,
    JWTTokenService,
    LocalStorageService,
    InventoryService,
    WhiskyProductService,
    { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

