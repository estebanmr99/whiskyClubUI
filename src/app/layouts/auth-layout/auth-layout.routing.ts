import { Routes } from '@angular/router';
import { CountryComponent } from 'src/app/pages/country/country.component';
import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

// Routes available to the external user.
export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',          component: RegisterComponent },
    { path: 'country',          component: CountryComponent },
];
