import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private restService: RestService
  ) {}

  ngOnInit(): void {}

  isActive(url) {
    return this.router.isActive(url, true);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  //To validate token in every page reload
  //   getUserInfo() {
  //     // Get Assets
  //    this.restService.getPosts("authToken", this.authService.getToken())
  //      .subscribe(data => {
  //        // Success
  //        if (data["status"] == 200) {
  //         console.log("success");
  //         //  this.username = data["data"].username;
  //        } else {
  //          // Token failed, redirect to login
  //          this.router.navigate(["/login"]);
  //        }
  //    });
  //  }
}
