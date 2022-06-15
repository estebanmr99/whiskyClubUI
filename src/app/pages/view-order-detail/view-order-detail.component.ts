import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-order-detail',
  templateUrl: './view-order-detail.component.html',
  styleUrls: ['./view-order-detail.component.scss']
})
export class ViewOrderDetailComponent implements OnInit {

  idOrder: string;

  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {

    this.idOrder= this.rutaActiva.snapshot.params.idOrder;
    
  }

}
