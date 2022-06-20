import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { ExternalUserLayoutRoutes } from './external-user-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material/material.module';
import { SubscriptionComponent } from '../../pages/subscription/subscription.component';
import { OrdersComponent } from '../../pages/orders/orders.component';
import { ViewOrderDetailComponent } from '../../pages/view-order-detail/view-order-detail.component';
import { WiskyProductsComponent } from '../../pages/wisky-products/wisky-products.component';

// Components used in the user external layout.
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ExternalUserLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    SubscriptionComponent,
    OrdersComponent,
    ViewOrderDetailComponent,
    WiskyProductsComponent
  ]
})

export class ExternalUserLayoutModule {}
