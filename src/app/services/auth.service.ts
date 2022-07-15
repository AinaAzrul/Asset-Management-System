import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { nextSortDir } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { RestService } from '../services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  errorMessage = '';

  constructor(private router: Router, private restService: RestService) { }

  public getToken() {
    return localStorage.getItem("token")
  }

  public getRole() {
    let a = sessionStorage.getItem("role");
    let b = sessionStorage.getItem("access");
    return [a,b];
  }


  public setToken(token: string) {
  	// Save token to localstorage
    localStorage.setItem("token", token);
  }

  public logout() {
  	localStorage.clear();
    sessionStorage.clear();
  }

  public isLoggedIn() {
  	var token = localStorage.getItem("token");
  	if (token == null || token == "") {
  		return false;
  	} else {
  		return true;
  	}
  }

  public val_token(){
    let userInfo="";
    let token = this.getToken();
    this.restService.getPosts("validate_token", token, null)
    .subscribe({
      next: data => {
      // Successful login
      userInfo = data["data"].role;
      let usersesh = data["message"];
      console.log(userInfo);
      sessionStorage.setItem("role", userInfo);
      sessionStorage.setItem("access", usersesh);
    },
    error:err =>{
      this.errorMessage = err.error.message;
    }}
    ); 
  }

}