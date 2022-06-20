import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SubscriptionComponent } from '../../pages/subscription/subscription.component';
import { EmployeeComponent } from '../../pages/employee/employee.component';
import { CreateProductsComponent } from '../../pages/create-products/create-products.component';
import { InventoryComponent } from '../../pages/inventory/inventory.component';
import { OrdersComponent } from '../../pages/orders/orders.component';
import { ReportsComponent } from '../../pages/reports/reports.component';
import { ViewOrderDetailComponent } from '../../pages/view-order-detail/view-order-detail.component';
import { WiskyProductsComponent } from '../../pages/wisky-products/wisky-products.component';

// Components used in the admin layout.
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    SubscriptionComponent,
    EmployeeComponent,
    CreateProductsComponent,
    InventoryComponent,
    OrdersComponent,
    ReportsComponent,
    ViewOrderDetailComponent,
    WiskyProductsComponent
  ]
})

export class AdminLayoutModule {}
