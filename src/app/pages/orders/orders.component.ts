import { Component, OnInit } from '@angular/core';
import { JWTTokenService } from '../../services/jwttoken.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[];
  dataOrders: any[];

  constructor(private tokenService: JWTTokenService,
    private orderService: OrdersService,
    private router: Router) {

    this.displayedColumns = [
      "date",
      "order",
      "total",
      "view",
    ];
    this.getOrders();
  }

  viewOrderDetails(cod: number) {
    var idOrder = this.dataOrders[cod].idSale;
    if (this.isUserLoggedIn()) {
      this.router.navigate(["user/order-detail", idOrder]);
    } else if (this.isAdminLoggedIn()) {
      this.router.navigate(["admin/order-detail", idOrder]);
    }
  }

  getOrders() {
    var idUser = this.tokenService.getId();
    this.orderService.getOrdersById(idUser).subscribe(
      (data) => {
        this.dataOrders = data;
      },
      (error) => console.log("Error: ", error)
    );
  }

  ngOnInit(): void {
  }

  isUserLoggedIn() {
    return this.tokenService.getUserType() === 1;
  }

  isAdminLoggedIn() {
    return this.tokenService.getUserType() === 0;
  }

}
