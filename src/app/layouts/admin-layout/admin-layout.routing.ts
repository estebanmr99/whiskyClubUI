import { Routes } from '@angular/router';

import { ProductComponent } from '../../pages/products/product.component';
import { ProductProfileComponent } from '../../pages/product-profile/product-profile.component';
import { AuthorizeGuard } from '../../services/authorize-guard.service';
import { CreateProductsComponent } from 'src/app/pages/create-products/create-products.component';
import { SubscriptionComponent } from 'src/app/pages/subscription/subscription.component';
import { EmployeeComponent } from 'src/app/pages/employee/employee.component';
import { InventoryComponent } from 'src/app/pages/inventory/inventory.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { ReportsComponent } from 'src/app/pages/reports/reports.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'products',           component: ProductComponent, canActivate: [AuthorizeGuard] },
    { path: 'product-profile/:id',   component: ProductProfileComponent, canActivate: [AuthorizeGuard] },
    { path: 'create-products',           component: CreateProductsComponent, canActivate: [AuthorizeGuard] },
    { path: 'subscription',           component: SubscriptionComponent, canActivate: [AuthorizeGuard] },
    { path: 'employee',           component: EmployeeComponent, canActivate: [AuthorizeGuard] },
    { path: 'inventory',           component: InventoryComponent, canActivate: [AuthorizeGuard] },
    { path: 'orders',           component: OrdersComponent, canActivate: [AuthorizeGuard] },
    { path: 'reports',           component: ReportsComponent, canActivate: [AuthorizeGuard] },
];
