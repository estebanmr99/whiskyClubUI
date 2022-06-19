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
import { ViewOrderDetailComponent } from '../../pages/view-order-detail/view-order-detail.component';
import { WiskyProductsComponent } from 'src/app/pages/wisky-products/wisky-products.component';
import { AdminGuard } from 'src/app/services/admin-guard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'products',           component: ProductComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    { path: 'product-profile/:id',   component: ProductProfileComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    { path: 'create-products',           component: CreateProductsComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    { path: 'subscription',           component: SubscriptionComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    { path: 'employee',           component: EmployeeComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    { path: 'inventory',           component: InventoryComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    { path: 'orders',           component: OrdersComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    { path: 'reports',           component: ReportsComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    { path: 'order-detail/:idOrder',           component: ViewOrderDetailComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    { path: 'wisky-products',           component: WiskyProductsComponent, canActivate: [AuthorizeGuard, AdminGuard] },
];
