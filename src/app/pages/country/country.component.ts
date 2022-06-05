import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service'

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  constructor(private localStorage: LocalStorageService) { }

  selectedCountry: string = '';
  countryOptions = [
    'United States',
    'Scotlan',
    'Ireland'
  ];

  choice() {
    switch (this.selectedCountry) {
      case 'United States' :
                            this.localStorage.set('country','United States');
                            break;
      case 'Scotlan' :
                     this.localStorage.set('country','Scotlan');
                     break;
      case 'Ireland' :
                      this.localStorage.set('country','Ireland');
                      break;
    }
    console.log(this.localStorage.get('country'));
  }

  ngOnInit(): void {
  }

}
