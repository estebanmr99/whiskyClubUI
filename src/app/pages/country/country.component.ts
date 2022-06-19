import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  selectedCountry: string;
  countryOptions: string[];
  submitted: boolean;

  constructor(
      private localStorage: LocalStorageService,
      private router: Router,
    ) {
      this.countryOptions = [
        'United States',
        'Scotland',
        'Ireland'
      ];
      this.selectedCountry = '';
      this.submitted = false;
    }

  choice() {
    this.submitted = true;
    switch (this.selectedCountry) {
      case 'United States':
        this.localStorage.set('country', this.selectedCountry);
        break;
      case 'Scotland':
        this.localStorage.set('country', this.selectedCountry);
        break;
      case 'Ireland':
        this.localStorage.set('country', this.selectedCountry);
        break;
      default:
        this.selectedCountry = '';
        return;
    }

    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
