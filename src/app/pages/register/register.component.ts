import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service'
declare const google: any;

// This is the component to register a new user.
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  returnUrl: string;
  error: string;

  country: string;
  userDeliveryPosition: { lat: number, lng: number };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    // redirect to home if already logged in
    if (this.userService.userValue && !this.userService.isTokenExpired()) {
      this.router.navigate(['/wisky-products']);
    }

    this.userService.userValue = false;
    this.userDeliveryPosition = { lat: 0, lng: 0 };

    this.country = this.localStorageService.get('country');
    this.loading = false;
    this.submitted = false;
    this.error = '';
  }

  // Init the register form and the google maps.
  ngOnInit(): void {
    // Vlidate the email through the email validator regex.
    const emailRegex = '^^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', Validators.compose([
        Validators.required,
        this.passwordValidator
      ])],
      name: ['', Validators.required],
      lastName: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = '/login';

    // Init the google maps
    var marker;
    var map = document.getElementById('map-canvas');
    let lat = map.getAttribute('data-lat');
    let lng = map.getAttribute('data-lng');
    let stores;

    // Get the center of the map.
    ({lat, lng, stores} = this.centerMap(lat, lng));

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = this.getMaOptions(myLatlng);

    // Create map
    map = new google.maps.Map(map, mapOptions);

    stores.forEach(store => {
      new google.maps.Marker({
        position: { lat: store.lat, lng: store.lng },
        map: map,
        title: store.storeName
      });
    });

    // Create marker if user clicks on the map based on lat and lng.
    google.maps.event.addListener(map, 'click', function (event: { latLng: any; }) {
      this.userDeliveryPosition.lat = event.latLng.lat();
      this.userDeliveryPosition.lng = event.latLng.lng();
      if (marker) {
        marker.setPosition(event.latLng);
      } else {
        marker = new google.maps.Marker({
          position: event.latLng,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
          },
          map: map
        });
      }
    }.bind(this), false);
  }

  // This is the function to center the map.
  centerMap(lat: string, lng: string) {
    let stores
    if (this.country === 'United States') {
      lat = '37.0902';
      lng = '-95.7129';
      stores = [
        { storeName: 'Dallas', lat: 32.73279226789102, lng: -96.69918800417629 },
        { storeName: 'Los Angeles', lat: 34.03742229442408, lng: -118.20257927528068 },
        { storeName: 'Washington', lat: 38.860582807021636, lng: -77.09366705792416 }];
    } else if (this.country === 'Ireland') {
      lat = '53.1424';
      lng = '-7.6921';
      stores = [
        { storeName: 'Dublin', lat: 53.33330031045176, lng: -6.269274948248049 },
        { storeName: 'Galway', lat: 53.275558513354085, lng: -9.050912910850219 },
        { storeName: 'Cork', lat: 51.89545714714142, lng: -8.468307839127354 }
      ];
    } else if (this.country === 'Scotland') {
      lat = '56.4907';
      lng = '-4.2026';
      stores = [
        { storeName: 'Edinburgh', lat: 55.93519013197581, lng: -3.219917253393694 },
        { storeName: 'Glasgow', lat: 55.86803289296835, lng: -4.265528127997926 },
        { storeName: 'Inverness', lat: 57.47412984398131, lng: -4.239453384881591 }
      ];
    }
    return { lat: lat, lng: lng, stores: stores };
  }

  // This is the function to get the map options, like the zoom and preferred map type.
  getMaOptions(myLatlng: any) {
    return {
      zoom: this.country !== 'United States' ? 6 : 3,
      scrollwheel: true,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] },
        { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
        { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
        { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
        { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] },
        { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
        { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] },
        { "featureType": "water", "elementType": "all", "stylers": [{ "color": '#5e72e4' }, { "visibility": "on" }] }]
    }
  }

  // This is the function to validate the password.
  passwordValidator(control: FormControl) {
    let password = control.value;

    // Check if the password complies with the minimum requirements.
    let passwordHasCapitalLetter = password.match(/[A-Z]/);
    let passwordHasNumber = password.match(/[0-9]/);
    let passwordHasSpecialCharacter =  password !== '' && !password.match(/^[\w&.-]+$/);
    let passwordHasLength = password.length >= 5;

    // If the user does not have errors, return null.
    if (passwordHasCapitalLetter && passwordHasNumber && passwordHasSpecialCharacter && passwordHasLength) {
      return null;
    }

    // If the password does not comply with the requirements, return an error.
    return {
      passwordMissingCapital: !passwordHasCapitalLetter,
      passwordMissingLength: !passwordHasLength,
      passwordMissingNumber: !passwordHasNumber,
      passwordMissingSpecialChar: !passwordHasSpecialCharacter,
    };

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // This is the function to check if the user location is valid.
  get isUserLocationInvalid() {
    if (this.userDeliveryPosition.lat === 0 && this.userDeliveryPosition.lng === 0) return true;
    return false;
  }

  // This is the function to create the user.
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid || this.isUserLocationInvalid) {
      return;
    }

    this.loading = true;

    // Create the user.
    this.userService.register(this.registerForm, this.userDeliveryPosition)
      .pipe(first())
      .subscribe(
        _ => {
          this.loading = false;
          this.error = "";
        },
        error => {
          console.log(error);
          this.error = "The has been an error registering the user, please try again later.";
          this.loading = false;
        },
        () => {
          this.router.navigate([this.returnUrl]);
        }
      );
  }

}
