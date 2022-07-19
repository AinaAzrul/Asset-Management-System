import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-master-datatable',
  templateUrl: './master-datatable.component.html',
  styleUrls: ['./master-datatable.component.scss']
})
export class MasterDatatableComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('NgbdDatepicker') d: NgbDateStruct;

  model: NgbDateStruct;
  editing = {};
  rows = [];
  temp: any;
  loadingIndicator = true;
  errorMessage: any;

  ColumnMode = ColumnMode;

  constructor(private restService: RestService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
    
  }

  getUsers() {
    this.loadingIndicator = true;
    // Get Assets
    this.restService.getPosts("read_master", this.authService.getToken())
      .subscribe({
        next: data => {
          console.log(data)
          if (data["status"] == 200) {
            this.rows = data["data"].records;
            console.log( this.rows )
            this.temp = [...this.rows];
            this.loadingIndicator = false;
          }
      },
      error:err =>{
        this.errorMessage = err.error.message;
      }}
        );
  }

}
