import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-asset-test',
  templateUrl: './asset-test.component.html',
  styleUrls: ['./asset-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetTestComponent {

  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;

  temp = [];
  filterkey = "";
  loadingIndicator = true;
  errorMessage = '';
  selected = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(private restService: RestService, private authService: AuthService) {
    
    this.getAsset();
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', `assets/data/100k.json`);

  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };

  //   req.send();
  // }
  getAsset() {
    this.loadingIndicator = true;
    // Get Assets
    this.restService.getPosts("read_asset", this.authService.getToken())
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

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  

}
