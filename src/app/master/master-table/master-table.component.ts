import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-master-table',
  templateUrl: './master-table.component.html',
  styleUrls: ['./master-table.component.scss']
})
export class MasterTableComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  rows = [];
  temp = [];
  filterkey = "";
  loadingIndicator = true;
  errorMessage = '';
  selected = [];
  

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(private restService: RestService, private authService: AuthService) { }

  ngOnInit(){
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
            this.temp = [...this.rows];
            this.loadingIndicator = false;
          }
      },
      error:err =>{
        this.errorMessage = err.error.message;
      }}
        );
  }

  onActivate(event) {
    (event.type === 'click') && event.cellElement.blur();
    console.log('Activate Event', event);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }
}
