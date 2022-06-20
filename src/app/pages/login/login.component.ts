import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service'
import { JWTTokenService } from 'src/app/services/jwttoken.service';

// This component is used to login to the application.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private tokenService: JWTTokenService
  ) {
    // redirect to home if already logged in
    if (this.userService.userValue && !this.userService.isTokenExpired()) {
      this.router.navigate(['/whisky-products']);
    }
    // Get return url from route parameters or default to '/'
    var country = this.localStorageService.get('country');
    if (country === null) {
      this.router.navigate(['/country']);
    }
    this.userService.userValue = false;
  }

  // This function is used to init the form validation.
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/whisky-products';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // This function is used to redirect to the register page.
  gotoRegister() {
    this.router.navigate(["/register"]);
  }

  // This function is used to login to the application.
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    // login user service
    this.userService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.localStorageService.set('token', data.token);
          this.userService.userValue = true;
          this.loading = false;
          this.error = "";
        },
        error => {
          // if error is 401, then user is not logged in
          this.error = "The email and password you entered don't match.";
          console.log(error);
          this.loading = false;
        },
        () => {
          if (this.tokenService.getToken() == null){
            this.tokenService.setToken(this.localStorageService.get('token'));
          }
          // redirect based on user type
          if (this.isUserLoggedIn()) {
            this.router.navigate(['user' + this.returnUrl]);
          } else if (this.isAdminLoggedIn()) {
            this.router.navigate(['admin' + this.returnUrl]);
          }
        }
      );
  }

  ngOnDestroy() {
  }

  // This function is used to check if the user is logged in.
  isUserLoggedIn() {
    return this.tokenService.getUserType() === 1;
  }

  // This function is used to check if the admin is logged in.
  isAdminLoggedIn() {
    return this.tokenService.getUserType() === 0;
  }

}
