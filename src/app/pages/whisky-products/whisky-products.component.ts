import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { JWTTokenService } from 'src/app/services/jwttoken.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WhiskyProductService } from 'src/app/services/whisky-product.service';

// This component is used to show the products page.
@Component({
  selector: 'app-whisky-products',
  templateUrl: './whisky-products.component.html',
  styleUrls: ['./whisky-products.component.css']
})
export class WhiskyProductsComponent implements OnInit {
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
    private wiskyProductService: WhiskyProductService,
    private localStorage: LocalStorageService,
    private sanitizer: DomSanitizer,
  ) {
    this.getTypes();
    this.getAllProductsInit();
  }

  ngOnInit(): void { }

  // This function is used to clear the dropdown list.
  clearDropdown(sel: MatSelect) {
    if (sel.value === undefined) {
      sel.placeholder = '';
    } else {
      sel.placeholder = '';
    }
  }

  // This function is used to format the slider component.
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  // This function is used to get the product types list.
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

  // This function is used to get the products at the begining list.
  getAllProductsInit() {
    const searchQuery = '';
    const idType = null;
    const distance = null;
    const price = null;
    const order = 'Asc';
    this.getAllProducts(searchQuery, idType, distance, price, order);
  }

  // This function is used to filter the products by type, distance and price.
  filterProducts() {
    const searchQuery = '';
    let idType = null;
    if (this.types.value != null) { // If the type is not null, then get the id of the type.
      idType = this.typesList.find(x => x.name === this.types.value).idType;
    }
    let distance = null;
    if (this.distance.value != null) { // If the distance is not null, then get the distance.
      distance = this.distance.value;
    }
    let price = null;
    if (this.priceRange.value != null) { // If the price range is not null, then get the price range.
      price = this.priceRange.value;
    }
    const order = 'Asc';
    this.getAllProducts(searchQuery, idType, distance, price, order);
  }

  // This function is used to search a product by name.
  findProduct() {
    const searchQuery = this.searchBox.value ? this.searchBox.value : '';
    const idType = null;
    const distance = null;
    const price = null;
    const order = 'Asc';
    this.getAllProducts(searchQuery, idType, distance, price, order);
  }

  // This function is used to show the products in a specific order.
  onOrderChange() {
    if (this.order.value != null) {
      const searchQuery = '';
      const idType = null;
      const distance = null;
      const price = null;
      let order;
      if (this.order.value === 'Ascending') { // If the order is ascending, then get the ascending order.
        order = 'Asc';
      } else if (this.order.value === 'Descending') { // If the order is descending, then get the descending order.
        order = 'Desc';
      } else if (this.order.value === 'Popularity') { // If the order is popularity, then get the popularity order.
        order = 'Popular';
      }
      this.getAllProducts(searchQuery, idType, distance, price, order);
    }
  }

  // This function is used to get all the products from the service.
  getAllProducts(searchQuery: string, idType: number, distance: number, price: number, order: string) {
    // get the user id from the local storage.
    const idUser = +this.tokenService.getId();
    // get the country.
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
