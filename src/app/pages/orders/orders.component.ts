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
    //columns table
    this.displayedColumns = [
      "date",
      "order",
      "total",
      "view",
    ];
    this.getOrders();
  }

  //this function redirect to the page to view order details,
  // with the id of the selected order
  viewOrderDetails(cod: number) {

    var idOrder = this.dataOrders[cod].idSale;
    if (this.isUserLoggedIn()) {
      this.router.navigate(["user/order-detail", idOrder]);
    } else if (this.isAdminLoggedIn()) {
      this.router.navigate(["admin/order-detail", idOrder]);
    }
  }

  //this function gets the orders by user id, 
  //this id is obtained from the token that is store when the user login
  getOrders() {
    
    var idUser = this.tokenService.getId();
    //call api service
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
