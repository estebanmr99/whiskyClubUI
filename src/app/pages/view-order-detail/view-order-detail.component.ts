import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// This component is used to show the order detail page.
@Component({
  selector: 'app-view-order-detail',
  templateUrl: './view-order-detail.component.html',
  styleUrls: ['./view-order-detail.component.scss']
})
export class ViewOrderDetailComponent implements OnInit {

  idOrder: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  //get idOrder send by url
  ngOnInit(): void {
    this.idOrder = this.activatedRoute.snapshot.params.idOrder;
  }

}
