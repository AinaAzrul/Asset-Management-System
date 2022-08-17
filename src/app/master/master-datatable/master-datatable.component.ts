import { Component, OnInit,ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { DeleteMasterModalComponent } from '../delete-master-modal/delete-master-modal.component';
// import { Router } from '@angular/router';
import {FormBuilder, AbstractControl} from '@angular/forms'
import { array } from '@amcharts/amcharts5';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


@Component({
  selector: 'app-master-datatable',
  templateUrl: './master-datatable.component.html',
  styleUrls: ['./master-datatable.component.scss']
})
export class MasterDatatableComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('NgbdDatepicker') d: NgbDateStruct;
  @Output() sendData = new EventEmitter();
  @Input() rows: any[];
  @Input() assetNo: any[];
  @Input() empName: any[];


  readonly formControl: AbstractControl;

  model: NgbDateStruct;
  editing = {};
  
  // rows = [];
  // assetNo = [];
  // empName = [];
  temp= [];
  masterData = [];
  loadingIndicator = true;
  errorMessage: any;
  timeout: any;
  expanded: any = {};
  newdate: any;
  selectedRow: any;
  disabledEditButton = false;
  selected = [];
  deleteMasterModalRef: any;

  columns = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(formBuilder: FormBuilder, 
    private datePipe: DatePipe, 
    private restService: RestService, 
    private authService: AuthService,
    private modalService: NgbModal) { 
    this.formControl = formBuilder.group({
      entry_id: '',
      asset_no: '',
      asset_desc: '',
      taken_by: '',
      date_taken: '',
      return_by: '',
      date_return: '',
      remarks: '',
      category: '',
    });
  }

  ngOnInit():void {
    // this.getMaster();
    console.log(this.rows);
    console.log(this.empName);
    console.log(this.assetNo);
    this.temp = this.rows;
  }

  // getMaster() {
  //   this.loadingIndicator = true;
   
  //   // Get Assets
  //   this.restService.getPosts("read_master", this.authService.getToken())
  //     .subscribe({
  //       next: data => {
  //         // console.log(data)
  //         if (data["status"] == 200) {
  //           this.rows = data["data"].records;
  //           console.log( this.rows )
  //           this.temp = [...this.rows];
  //           this.loadingIndicator = false;
  //           this.assetNo = [...new Set(this.rows.map(item=>{return item.Asset_no}))];
  //           this.empName = [...new Set(this.rows.map(item=>{return item.Taken_by}))]
  //         }
  //     },
  //     error:err =>{
  //       this.errorMessage = err.error.message;
  //     }}
  //     );
  // }

  updateValue(event, cell, rowIndex) {
    console.log(event);
    console.log(cell);
    console.log(rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    var val = event.target.value;
    if (val instanceof Date){
      console.log(event.target.value);
      this.newdate = new Date(val);
      val = this.datePipe.transform(this.newdate, 'yyyy-MM-dd');
    }
    
    console.log(this.rows);
    
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
              // this.getMaster();
              // this.sendData.emit('some data...');
            }
        }}
        );
  }

   //filter individual column function
   searchMaster(event){
    const val = event.target.value.toLowerCase();
    const keys = Object.keys(this.temp[0]);
    const colsAmt = keys.length;
    let form2 = Object.values(this.formControl.value);
    console.log(val);
    if(val){
    //loop through the input form
    for (let i=0; i<colsAmt; i++){
      //check for index where value exist
      if(form2[i]){
    console.log(form2[i]);

        //call function filter based on the specified column index
          this.searchThrough(colsAmt, keys[i], val)
          break;
      }
  }
}else if (!val){
  this.rows = this.temp;
  }    
}

  searchThrough(colsAmt, colIdx, val){
      // filter our data
      // const temp = this.temp.filter(temp=>temp.firstname.toLowerCase().indexOf(val) !== -1 || !val);
      const temp = this.temp.filter(function(item){
        // iterate through each row's column data
        for (let i=0; i<colsAmt; i++){
          // check for a match
          if (item[colIdx].toString().toLowerCase().indexOf(val) !== -1 || !val){
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
    // this.getMaster();
    this.sendData.emit('some data...');
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
}
}
