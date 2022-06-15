import { Component, OnInit  } from '@angular/core';
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
  dataOrders: any[] = [{idSale:1,createDate:"12-2-20202",totalSale:20},
                  {idSale:2,createDate:"12-2-20202",totalSale:200}];


  constructor(private tokenService: JWTTokenService,
    private orderService: OrdersService,
    private router: Router) { 

    this.displayedColumns= [
      "date",
      "order",
      "total",
      "view",
    ];
    this.getOrders();
  }

  viewOrderDetails(cod: number) {
    
    //console.log(this.dataOrders[cod].totalSale);
    //console.log(this.tokenService.getId());
    var idOrder = this.dataOrders[cod].idSale;
    this.router.navigate(['/order-detail',idOrder]);
  

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

}
