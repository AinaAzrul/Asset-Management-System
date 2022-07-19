import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { ModifyMasterModalComponent } from '../modify-master-modal/modify-master-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selectedRow: any;
  disabledEditButton = false;
  modifyMasterRef: any;


  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(private restService: RestService, private authService: AuthService,  private modalService: NgbModal) { }

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
    if (event.type === "click") {
      this.selectedRow = event.row;
      this.disabledEditButton = true;
    }

    (event.type === 'click') && event.cellElement.blur();
    console.log('Activate Event', event);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  updateRow(){
    console.log("edit")
    this.modifyMasterRef = this.modalService.open(ModifyMasterModalComponent);
    this.modifyMasterRef.componentInstance.row = this.selectedRow;
    this.modifyMasterRef.componentInstance.valueChange.subscribe((event) => {
      console.log(event);
      this.getUsers(); 
    });
  }

  searchMaster(event){
    console.log(event);
    const val = event.target.value.toLowerCase();
    const keys = Object.keys(this.temp[0]);
    const colsAmt = keys.length;

    // filter our data
    // const temp = this.temp.filter(temp=>temp.firstname.toLowerCase().indexOf(val) !== -1 || !val);
   const temp = this.temp.filter(function(item){
    // iterate through each row's column data
    for (let i=0; i<colsAmt; i++){
       // check for a match
       if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
         // found match, return true to add to result set
         return true;
       }
     }
});
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  

}
