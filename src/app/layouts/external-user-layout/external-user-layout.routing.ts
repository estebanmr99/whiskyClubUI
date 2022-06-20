import { Routes } from '@angular/router';
import { AuthorizeGuard } from '../../services/authorize-guard.service';
import { SubscriptionComponent } from 'src/app/pages/subscription/subscription.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { ViewOrderDetailComponent } from '../../pages/view-order-detail/view-order-detail.component';
import { WhiskyProductsComponent } from 'src/app/pages/whisky-products/whisky-products.component';
import { UserGuard } from 'src/app/services/user-guard.service';

// Routes available to the user external.
export const ExternalUserLayoutRoutes: Routes = [
    { path: 'subscription',           component: SubscriptionComponent, canActivate: [AuthorizeGuard, UserGuard] },
    { path: 'orders',           component: OrdersComponent, canActivate: [AuthorizeGuard, UserGuard] },
    { path: 'order-detail/:idOrder',           component: ViewOrderDetailComponent, canActivate: [AuthorizeGuard, UserGuard] },
    { path: 'whisky-products',           component: WhiskyProductsComponent, canActivate: [AuthorizeGuard, UserGuard] },
];
