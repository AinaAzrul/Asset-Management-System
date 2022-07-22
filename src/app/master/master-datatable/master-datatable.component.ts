import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DeleteMasterModalComponent } from '../delete-master-modal/delete-master-modal.component';
import { Router } from '@angular/router';


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
  timeout: any;
  expanded: any = {};
  newdate: any;
  selectedRow: any;
  disabledEditButton = false;
  selected = [];
  deleteMasterModalRef: any;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(private router: Router, private datePipe: DatePipe, private restService: RestService, private authService: AuthService,private modalService: NgbModal) { }

  ngOnInit(): void {
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
            // console.log( this.rows )
            this.temp = [...this.rows];
            this.loadingIndicator = false;
          }
      },
      error:err =>{
        this.errorMessage = err.error.message;
      }}
        );
  }
  
  // transformDate(date) {
  //   var dateToDBthis.datePipe.transform(date('yyyy-MM-dd')); 
  // };

  updateValue(event, cell, rowIndex) {
    console.log(event.target.value);
    this.editing[rowIndex + '-' + cell] = false;
    var val = event.target.value;
    if (val instanceof Date){
      console.log(event.target.value);
      this.newdate = new Date(val);
      val = this.datePipe.transform(this.newdate, 'yyyy-MM-dd');
    }
    
    console.log(val);
    
    this.rows[rowIndex][cell] = val;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
    console.log(this.rows[rowIndex]);
    let newRow = this.rows[rowIndex];
    
    this.restService.getPosts("update_master", this.authService.getToken(),  {
      Entry_id: newRow.Entry_id, 
      Asset_no: newRow.Asset_no, 
      Asset_desc: newRow.Asset_desc, 
      Taken_by: newRow.Taken_by, 
      Date_taken: newRow.Date_taken, 
      Return_by: newRow.Return_by,
      Date_return: newRow.Date_return,
      Remarks: newRow.Remarks,
      Category: newRow.Category}).subscribe({
          next: data => {
            console.log(data)
            if (data["status"] == 200) {
              this.getMaster();
            }
        }}
       );

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

deleteRow(){
  // console.log(this.selected);
  this.deleteMasterModalRef = this.modalService.open(DeleteMasterModalComponent);
  this.deleteMasterModalRef.componentInstance.row = this.selected;
  this.deleteMasterModalRef.componentInstance.valueChange.subscribe((event) => {
    console.log(event);
    this.getMaster(); 
  });

}

onActivate(event){
  // console.log(event);
    
    if (event.type === "click") {
      this.selectedRow = event.row;
      this.disabledEditButton = true;
    }
    event.type === "click" && event.cellElement.blur();
}

onSelect({ selected }) {
  console.log(selected);
}

test() {
    window.scroll(0,120);
    //or document.body.scrollTop = 0;
    //or document.querySelector('body').scrollTo(0,0)
    
}
//Scrollable table
// onPage(event) {
//   clearTimeout(this.timeout);
//   this.timeout = setTimeout(() => {
//     console.log('paged!', event);
//   }, 100);
// }
// toggleExpandRow(row) {
//   console.log('Toggled Expand Row!', row);
//   this.table.rowDetail.toggleExpandRow(row);
// }

// onDetailToggle(event) {
//   console.log('Detail Toggled', event);
// }

}
