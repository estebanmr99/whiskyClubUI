import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { AttributesService } from 'src/app/services/attributes.service';

@Component({
  selector: 'app-wisky-products',
  templateUrl: './wisky-products.component.html',
  styleUrls: ['./wisky-products.component.css']
})
export class WiskyProductsComponent implements OnInit {
  panelOpenState = false;

  categoriesList: Array<any> = [];
  categoriesFilter = new FormControl();
  categoriesFilterList: Array<any> = [];

  test: any[] = [{
    name: 'Product #1',
    description: 'Product #1 description',
    localPrice: '100',
    globalPrice: '100',
    nearestStore: 'Dallas'
  },
  {
    name: 'Product #2',
    description: 'Product #2 description',
    localPrice: '200',
    globalPrice: '200',
    nearestStore: 'Corwall'
  },
  {
    name: 'Product #3',
    description: 'Product #3 description',
    localPrice: '300',
    globalPrice: '300',
    nearestStore: 'Washington'
  },
  ];

  constructor(
    private attributesService: AttributesService,
  ) {
    this.getAllAttributes();

  }

  ngOnInit(): void { }

  getAllAttributes() {
    this.attributesService.getCategories().subscribe(
      (data) => {
        this.categoriesList = data;
        this.categoriesFilterList = data;
      },
      (error) => console.log("Error: ", error)
    );
  }

  s1(sel: MatSelect) {
    sel.placeholder = '';
  }

  s2(sel: MatSelect) {
    if (sel.value === undefined) {
      sel.placeholder = '';
    }
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
