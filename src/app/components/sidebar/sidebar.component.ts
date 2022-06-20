import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JWTTokenService } from 'src/app/services/jwttoken.service';

// Interface for every SidebarItem
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

// Items to display if the user is admin.
export const ROUTESADMIN: RouteInfo[] = [
    { path: '/admin/subscription', title: 'Select subscription',  icon: 'ni-fat-add text-purple', class: '' },
    { path: '/admin/create-products', title: 'Create products',  icon: 'ni-settings text-green', class: '' },
    { path: '/admin/inventory', title: 'Inventory',  icon: 'ni-archive-2 text-red', class: '' },
    { path: '/admin/employee', title: 'Employees',  icon: 'ni-settings text-blue', class: '' },
    { path: '/admin/orders', title: 'Orders',  icon: 'ni-archive-2 text-red', class: '' },
    { path: '/admin/reports', title: 'Reports',  icon: 'ni-settings text-blue', class: '' },
    { path: '/admin/wisky-products', title: 'Products',  icon: 'ni-archive-2 text-blue', class: '' },
];

// Items to display if the user is external.
export const ROUTESUSER: RouteInfo[] = [
  { path: '/user/subscription', title: 'Select subscription',  icon: 'ni-fat-add text-purple', class: '' },
  { path: '/user/orders', title: 'Orders',  icon: 'ni-archive-2 text-red', class: '' },
  { path: '/user/wisky-products', title: 'Products',  icon: 'ni-archive-2 text-blue', class: '' },
];

// This component is used to display the sidebar.
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private tokenService: JWTTokenService) { }

  // This function is used to load the sidebar items.
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

  // This function is used to check if the logged in user is external or not.
  isUserLoggedIn() {
    return this.tokenService.getUserType() === 1;
  }

  // This function is used to check if the logged in user is admin or not.
  isAdminLoggedIn() {
    return this.tokenService.getUserType() === 0;
  }
}
