import { Routes } from '@angular/router';

import { ProductComponent } from '../../pages/products/product.component';
import { ProductProfileComponent } from '../../pages/product-profile/product-profile.component';
import { AuthorizeGuard } from '../../services/authorize-guard.service';
import { CreateProductsComponent } from 'src/app/pages/create-products/create-products.component';
import { SubscriptionComponent } from 'src/app/pages/subscription/subscription.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'products',           component: ProductComponent, canActivate: [AuthorizeGuard] },
    { path: 'product-profile/:id',   component: ProductProfileComponent, canActivate: [AuthorizeGuard] },
    { path: 'create-products',           component: CreateProductsComponent, canActivate: [AuthorizeGuard] },
    { path: 'subscription',           component: SubscriptionComponent, canActivate: [AuthorizeGuard] },
];
