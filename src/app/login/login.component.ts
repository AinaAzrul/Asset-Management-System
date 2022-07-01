import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { RestService } from '../services/rest.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Alert handler
  alert = {type: null, msg: null};

  constructor(private restService: RestService, private authService: AuthService, private router: Router) { }

   // Form input (defaults)
   loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    ]),
    password: new FormControl('',[
      Validators.required
    ]),
    rememberMe: new FormControl(false)
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  ngOnInit() {
    // Logout on login page load
    this.authService.logout();
  }

  onSubmit() {
    // Attempt to login
    this.isLoginFailed = false;
    this.restService.getPosts("login", null, {email: this.loginForm.value.email, password: this.loginForm.value.password})
    .subscribe({
      next: data => {

      // Successful login
      if (data["status"] == 200) {
        // Reset alert
        this.resetAlert();
        console.log("yess login");
        // Save token to localstorage
        this.authService.setToken(data["jwt"]);
        // // Navigate to home page
          this.router.navigate(['/']);
      } else {
        // Display alert
        console.log("cannot login");
        this.displayAlert("danger", data["data"].msg);
      }
    },
    error:err =>{
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }}
      );
    console.log(this.loginForm.value.email);
    console.log(this.loginForm.value.password)
  }

  resetAlert() {
    this.alert = {type: null, msg: null};
  }

  displayAlert(type, msg) {
    this.alert.type = type;
    this.alert.msg = msg;
  }


}
