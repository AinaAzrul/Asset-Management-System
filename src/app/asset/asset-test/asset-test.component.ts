import { Component, ViewEncapsulation, ViewChild,Output, EventEmitter } from '@angular/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DeleteAssetModalComponent } from '../delete-asset-modal/delete-asset-modal.component';
import { DatePipe } from '@angular/common';
import { AddCalibModalComponent } from '../add-calib-modal/add-calib-modal.component';
import { DeleteCalibModalComponent } from '../delete-calib-modal/delete-calib-modal.component';
import {FormBuilder, AbstractControl} from '@angular/forms'


@Component({
  selector: 'app-asset-test',
  templateUrl: './asset-test.component.html',
  styleUrls: ['./asset-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetTestComponent {

  readonly formControl: AbstractControl;

  @ViewChild('NgbdDatepicker') c: NgbDateStruct;
  @ViewChild('myTable') table: any;
  //@Output() valuePass = new EventEmitter();


  //Date input
  model: NgbDateStruct;
  newdate: any;

  //generate table variables
  rows: any[] = [];
  expanded: any = {};
  editing = {};
  timeout: any;
  selectedRow: any;
  calib: any;
  fil: any;
  deleteAssetModalRef:any;
  addCalibModalRef:any;
  deleteCalibModalRef: any;
  disabledDelButton= false;

  tab = [];
  temp = [];
  filterkey = "";
  loadingIndicator = true;
  errorMessage = '';
  selected = [];

  calibNo = [];
  startD = [];
  endD = [];
  companyName= [];
  
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(formBuilder: FormBuilder,private restService: RestService, private authService: AuthService,private modalService: NgbModal, private datePipe: DatePipe) {

    this.getAsset();

    this.formControl = formBuilder.group({
      Asset_no: '',
      Asset_desc: '',
      Category: '',
      Location: '',
      Start_date: '',
      End_date: '',
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }


  getAsset() {
    this.loadingIndicator = true;
    // Get Assets
    this.restService.getPosts("read_asset", this.authService.getToken())
      .subscribe({
        next: data => {
          console.log(data)
          if (data["status"] == 200) {
           
            this.temp = data["data"].records;
            
            //  = [...this.rows];
            console.log(this.temp);
            this.loadingIndicator = false;
          
          //Mapping array with different propoerties with the same id
          this.tab= [];
          const idfile= [...Array.from(new Set(this.temp.map(i=>i.Asset_no)))];
          // console.log(idfile)
          idfile.forEach((Asset_no) => {
              let res = this.temp.filter((Calib_no) => Calib_no.Asset_no == Asset_no);
              let res2 = this.temp.filter((Start_date) => Start_date.Asset_no == Asset_no);
              let res3 = this.temp.filter((End_date) => End_date.Asset_no == Asset_no);
              let res4 = this.temp.filter((Company_name) => Company_name.Asset_no == Asset_no);
              
          // console.log(res[0])
              
              this.tab.push({Asset_no, Calib_no: res.length > 1 ? res.map(i => i.Calib_no) :(res[0].Calib_no), 
                  Start_date: res2.length > 1 ? res2.map(i => i.Start_date) :(res2[0].Start_date),
                  End_date: res3.length > 1 ? res3.map(i => i.End_date) :(res3[0].End_date), 
                  Company_name: res4.length > 1 ? res4.map(i => i.Company_name) :(res4[0].Company_name), Asset_desc: res.map(i => i.Asset_desc)[0], 
                  Category: res.map(i => i.Category)[0], Location: res.map(i => i.Location)[0]} )
            });
            console.log(this.tab) 
            this.rows = this.tab;
            // this.tab = [...this.temp];
            // this.valuePass.emit(this.rows);
          }
      },
      error:err =>{
        this.errorMessage = err.error.message;
      }}
      );
  }

  toggleExpandRow(row) {
    console.log(row);
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log(event.value);
    console.log('Detail Toggled', event);
  }

  getDetailRows(row){
    // console.log(row)
   let val4 = row.Asset_no; 
   this.fil= this.temp.filter(temp=>temp.Asset_no.toLowerCase().indexOf(val4) !== -1 || !val4);
   this.calib = this.fil[0].Calib_no;
   console.log(this.fil)
   return this.fil;
  }

  onActivate(event){
    // console.log(event);
      if (event.type === "click") {
        this.selectedRow = event.row;
        this.disabledDelButton = true;
      }
      event.type === "click" && event.cellElement.blur();
  }

  deleteRow(){
  console.log(this.selected);
  this.deleteAssetModalRef = this.modalService.open(DeleteAssetModalComponent);
  this.deleteAssetModalRef.componentInstance.row = this.selected;
  this.deleteAssetModalRef.componentInstance.valueChange.subscribe((event) => {
    console.log(event);
    this.getAsset(); 
  });
  }

  deleteCalib(row){
    console.log(row);
    this.deleteCalibModalRef = this.modalService.open(DeleteCalibModalComponent);
    this.deleteCalibModalRef.componentInstance.row = row;
    this.deleteCalibModalRef.componentInstance.valueChange.subscribe((event) => {
      console.log(event);
      this.getAsset(); 
    });
    }

  updateValue(event, cell, rowIndex) {
      console.log(event);
      console.log(cell);
      console.log(rowIndex);
      this.editing[rowIndex + '-' + cell] = false;
      var val = event.target.value;
      
      console.log(val);
      this.rows[rowIndex][cell] = val;
      this.rows = [...this.rows];
      console.log('UPDATED!', this.rows[rowIndex][cell]);
      console.log(this.rows[rowIndex]);
      let newRow = this.rows[rowIndex];

      this.restService.getPosts("update_asset", this.authService.getToken(),  {
      Asset_no: newRow.Asset_no, 
      Asset_desc: newRow.Asset_desc, 
      Category: newRow.Category,
      Location: newRow.Location
      }).subscribe({
            next: data => {
              console.log(data)
              if (data["status"] == 200) {
                this.getAsset();
              }
          }}
         );

    }

    updateCalib(event, cell, rowIndex){
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

      console.log(val);
      this.fil[rowIndex][cell] = val;
      this.fil = [...this.fil];
      console.log('UPDATED!', this.fil[rowIndex][cell]);
      console.log(this.fil[rowIndex]);
      let newRow = this.fil[rowIndex];

      this.restService.getPosts("update_calib", this.authService.getToken(),  {
        id: newRow.id, 
        Calib_no: newRow.Calib_no, 
        Start_date: newRow.Start_date,
        End_date: newRow.End_date,
        Company_name: newRow.Company_name,
        }).subscribe({
              next: data => {
                console.log(data)
                if (data["status"] == 200) {
                  this.getAsset();
              }
            }}
           );
    }

  test(){
    window.scroll(0,120);
  }
 

  Addcalib(row){
   console.log(row)
   let calibRow = row;
   this.addCalibModalRef = this.modalService.open(AddCalibModalComponent);
   this.addCalibModalRef.componentInstance.row = calibRow;
   this.addCalibModalRef.componentInstance.valueChange.subscribe((event) => {
    console.log(event);
   this.getAsset(); 
  });
  }

  onSelect({ selected }) {
    console.log(selected);
  }

  //filter function
  searchMaster(event){
    const val = event.target.value.toLowerCase();
    const keys = Object.keys(this.temp[0]);
    const colsAmt = keys.length;
    let form2 = Object.values(this.formControl.value);
    this.rows = [...this.tab];
    
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
  this.rows = [...this.tab];
  }
}    


  searchThrough(colsAmt, colIdx, val){
    // filter our data
    // const temp = this.temp.filter(temp=>temp.firstname.toLowerCase().indexOf(val) !== -1 || !val);
    const temp = this.rows.filter(function(item){
      // iterate through each row's column data
      for (let i=0; i<colsAmt; i++){
        // check for a match
        console.log(item[colIdx]);
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
}