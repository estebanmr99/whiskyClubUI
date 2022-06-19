import { Routes } from '@angular/router';
import { AuthorizeGuard } from '../../services/authorize-guard.service';
import { SubscriptionComponent } from 'src/app/pages/subscription/subscription.component';
import { OrdersComponent } from 'src/app/pages/orders/orders.component';
import { ViewOrderDetailComponent } from '../../pages/view-order-detail/view-order-detail.component';
import { WiskyProductsComponent } from 'src/app/pages/wisky-products/wisky-products.component';
import { UserGuard } from 'src/app/services/user-guard.service';

export const ExternalUserLayoutRoutes: Routes = [
    { path: 'subscription',           component: SubscriptionComponent, canActivate: [AuthorizeGuard, UserGuard] },
    { path: 'orders',           component: OrdersComponent, canActivate: [AuthorizeGuard, UserGuard] },
    { path: 'order-detail/:idOrder',           component: ViewOrderDetailComponent, canActivate: [AuthorizeGuard, UserGuard] },
    { path: 'wisky-products',           component: WiskyProductsComponent, canActivate: [AuthorizeGuard, UserGuard] },
];
