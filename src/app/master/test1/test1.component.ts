import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component implements OnInit {

  rows = [];
  assetNo = [];
  empName = [];
  temp= [];
  masterData = [];
  loadingIndicator = true;
  errorMessage: any;
  isLoadTab = false;

  constructor(private restService: RestService, 
    private authService: AuthService,) { }

  ngOnInit() {
    this.getMaster();
  }

  getMaster() {
    this.loadingIndicator = true;
   
    // Get Assets
    this.restService.getPosts("read_master", this.authService.getToken())
      .subscribe({
        next: data => {
          // console.log(data)
          if (data["status"] == 200) {
            this.rows = data["data"].records;
            console.log( this.rows )
            this.temp = [...this.rows];
            this.loadingIndicator = false;
            this.assetNo = [...new Set(this.rows.map(item=>{return item.Asset_no}))];
            this.empName = [...new Set(this.rows.map(item=>{return item.Taken_by}))]
           this.isLoadTab = true;
          }
      },
      error:err =>{
        this.errorMessage = err.error.message;
      }}
      );
  }

  getData(){
    return this.rows;
  }



}
