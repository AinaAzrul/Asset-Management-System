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
        console.log("yess login");
        // Save token to localstorage
        this.authService.setToken(data["jwt"]);
        // // Navigate to home page
        this.router.navigate(['/']);
        //set login true
        this.isLoggedIn = true;
      
    },
    error:err =>{
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }}
      );
  }

}
