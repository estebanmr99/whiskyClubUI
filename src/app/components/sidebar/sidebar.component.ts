import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/products', title: 'Productos',  icon: 'ni-archive-2 text-blue', class: '' },
    { path: '/subscription', title: 'Select subscription',  icon: 'ni-fat-add text-purple', class: '' },
    { path: '/create-products', title: 'Create products',  icon: 'ni-settings text-green', class: '' },
    { path: '/inventory', title: 'Inventory',  icon: 'ni-archive-2 text-red', class: '' },
    { path: '/employee', title: 'Employees',  icon: 'ni-settings text-blue', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
