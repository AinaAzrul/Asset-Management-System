import { Component, OnInit,ViewChild} from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, AbstractControl} from '@angular/forms'

@Component({
  selector: 'app-audit-datatable',
  templateUrl: './audit-datatable.component.html',
  styleUrls: ['./audit-datatable.component.scss']
})
export class AuditDatatableComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  readonly formControl: AbstractControl;


    ColumnMode = ColumnMode;
    rows = [];
    temp = [];
    columns = [];
    loadingIndicator = true;
    reorderable = true;
    errorMessage = "";

  constructor(formBuilder: FormBuilder,private restService: RestService, private authService: AuthService) {
    this.formControl = formBuilder.group({
      user_id: '',
      firstname: '',
      action: '',
      details: '',
      datetime: '',
    });
   }
  

  ngOnInit() {
    this.getAudit();
  }

  getAudit() {
    this.loadingIndicator = true;
  //  console.log("addLog");
    this.restService.getPosts("get_log", this.authService.getToken())
      .subscribe({
        next: data => {
          // console.log(data)
          if (data["status"] == 200) {
            this.rows = data["data"].records;
            console.log( this.rows )
            this.temp = [...this.rows];
            this.loadingIndicator = false;
          }
      },
      error:err =>{
        this.errorMessage = err.error.message;
      }}); 
  }

   //filter individual column function
   searchMaster(event){
    const val = event.target.value.toLowerCase();
    const keys = Object.keys(this.temp[0]);
    const colsAmt = keys.length;
    let form2 = Object.values(this.formControl.value);
    if(val){
    //loop through the input form
    for (let i=0; i<colsAmt; i++){
      //check for index where value exist
    if(form2[i]){

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

}
