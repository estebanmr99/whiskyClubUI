import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JWTTokenService } from 'src/app/services/jwttoken.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTESADMIN: RouteInfo[] = [
    { path: '/admin/products', title: 'Productos',  icon: 'ni-archive-2 text-blue', class: '' },
    { path: '/admin/subscription', title: 'Select subscription',  icon: 'ni-fat-add text-purple', class: '' },
    { path: '/admin/create-products', title: 'Create products',  icon: 'ni-settings text-green', class: '' },
    { path: '/admin/inventory', title: 'Inventory',  icon: 'ni-archive-2 text-red', class: '' },
    { path: '/admin/employee', title: 'Employees',  icon: 'ni-settings text-blue', class: '' },
    { path: '/admin/orders', title: 'Orders',  icon: 'ni-archive-2 text-red', class: '' },
    { path: '/admin/reports', title: 'Reports',  icon: 'ni-settings text-blue', class: '' },
    { path: '/admin/wisky-products', title: 'Products',  icon: 'ni-archive-2 text-blue', class: '' },
];

export const ROUTESUSER: RouteInfo[] = [
  { path: '/user/subscription', title: 'Select subscription',  icon: 'ni-fat-add text-purple', class: '' },
  { path: '/user/orders', title: 'Orders',  icon: 'ni-archive-2 text-red', class: '' },
  { path: '/user/wisky-products', title: 'Products',  icon: 'ni-archive-2 text-blue', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private tokenService: JWTTokenService) { }

  ngOnInit() {
    if (this.isUserLoggedIn()) {
      this.menuItems = ROUTESUSER.filter(menuItem => menuItem);
    } else if (this.isAdminLoggedIn()) {
      this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  isUserLoggedIn() {
    return this.tokenService.getUserType() === 1;
  }

  isAdminLoggedIn() {
    return this.tokenService.getUserType() === 0;
  }
}
