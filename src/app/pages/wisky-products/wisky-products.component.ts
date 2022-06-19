import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { JWTTokenService } from 'src/app/services/jwttoken.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WiskyProductService } from 'src/app/services/wisky-product.service';

@Component({
  selector: 'app-wisky-products',
  templateUrl: './wisky-products.component.html',
  styleUrls: ['./wisky-products.component.css']
})
export class WiskyProductsComponent implements OnInit {
  categoriesList: Array<any> = [];
  categoriesFilter = new FormControl();
  categoriesFilterList: Array<any> = [];

  searchBox = new FormControl();
  distance = new FormControl();
  priceRange = new FormControl();

  types = new FormControl();
  typesList: Array<any> = [];

  order = new FormControl();
  allProducts: any[] = [];

  constructor(private tokenService: JWTTokenService,
    private wiskyProductService: WiskyProductService,
    private localStorage: LocalStorageService,
    private sanitizer: DomSanitizer,
  ) {
    this.getTypes();
    this.getAllProductsInit();
  }

  ngOnInit(): void { }

  clearDropdown(sel: MatSelect) {
    if (sel.value === undefined) {
      sel.placeholder = '';
    } else {
      sel.placeholder = '';
    }
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  getTypes() {
    this.wiskyProductService.getProductTypes()
      .pipe(first())
      .subscribe(
        data => {
          this.typesList = data;
        },
        error => {
          window.alert(error);
          console.log(error);
        },
        () => {
        }
      );
  }

  getAllProductsInit() {
    const searchQuery = '';
    const idType = null;
    const distance = null;
    const price = null;
    const order = 'Asc';
    this.getAllProducts(searchQuery, idType, distance, price, order);
  }

  filterProducts() {
    const searchQuery = '';
    let idType = null;
    if (this.types.value != null) {
      idType = this.typesList.find(x => x.name === this.types.value).idType;
    }
    let distance = null;
    if (this.distance.value != null) {
      distance = this.distance.value;
    }
    let price = null;
    if (this.priceRange.value != null) {
      price = this.priceRange.value;
    }
    const order = 'Asc';
    this.getAllProducts(searchQuery, idType, distance, price, order);
  }


  findProduct() {
    const searchQuery = this.searchBox.value ? this.searchBox.value : '';
    const idType = null;
    const distance = null;
    const price = null;
    const order = 'Asc';
    this.getAllProducts(searchQuery, idType, distance, price, order);
  }

  onOrderChange() {
    if (this.order.value != null) {
      const searchQuery = '';
      const idType = null;
      const distance = null;
      const price = null;
      let order;
      if (this.order.value === 'Ascending') {
        order = 'Asc';
      } else if (this.order.value === 'Descending') {
        order = 'Desc';
      } else if (this.order.value === 'Popularity') {
        order = 'Popular';
      }
      this.getAllProducts(searchQuery, idType, distance, price, order);
    }
  }

  getAllProducts(searchQuery: string, idType: number, distance: number, price: number, order: string) {
    const idUser = +this.tokenService.getId();
    const country = this.localStorage.get('country');
    this.wiskyProductService.getAllProducts(searchQuery, idUser, idType, distance, price, order, country)
      .pipe(first())
      .subscribe(
        data => {
          this.allProducts = data;
          this.allProducts.forEach((product, index) => {
            if (this.allProducts[index].image) {
              this.allProducts[index].image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + (this.allProducts[index].image));
            }
          });
          console.log(data);
        },
        error => {
          window.alert(error);
          console.log(error);
        },
        () => {
        }
      );
  }
}
