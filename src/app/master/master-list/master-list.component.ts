import { Component, OnInit,ViewChild,VERSION} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,Validators, ReactiveFormsModule, FormControlName } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss']
})
export class MasterListComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  // model: NgbDateStruct;
  // model2: NgbDateStruct;
  @ViewChild('NgbdDatepicker') d: NgbDateStruct;
  @ViewChild('NgbdDatepicker') s: NgbDateStruct;
    
    rows: any[]=[]; 
    temp: any;
    assetRows: any[]=[];
    temp2: any;
    masterData: any[];

    assetNo = [];
    empName = [];
   
    loadingIndicator = true;
    errorMessage: any;
    isLoadTab = false;
    isEditable = true;

  constructor(private restService: RestService, 
              private authService: AuthService) { }

  // Form input (defaults)
  addMasterForm = new FormGroup({
    Asset_no: new FormControl('',Validators.required), 
    Asset_desc: new FormControl('',Validators.required),
    Taken_by: new FormControl(''),
    Date_taken: new FormControl(''),
    Return_by: new FormControl(''),
    Date_return: new FormControl(''),
    Remarks: new FormControl(''),
    Category: new FormControl(''),
  });
  

  ngOnInit(){
     this.getMaster();
     this.getAssetList();

  }

  public codeValue: string;

  //Based on the available asset_no.
  public codeList = [
    { id: '2013/002', name: '2013/002' },
    { id: '2015/071', name: '2015/071' },
    { id: '2013/004', name: '2013/004' },
    { id: '2015/092', name: '2015/092' },
    { id: '2015/089', name: '2015/089' },
    { id: '2013/027', name: '2013/027' },
    { id: '2015/067', name: '2015/067' },
    { id: '2019/101', name: '2019/101' },
    { id: '2020/103', name: '2020/103' },
  ];

  public nameList = [
    { id: 'Aiman', name: 'Aiman' },
    { id: 'Ehwan', name: 'Ehwan' },
    { id: 'Shah', name: 'Shah' },
    { id: 'Nik', name: 'Nik' },
    { id: 'Muhsin', name: 'Muhsin' },
    { id: 'Mazrul', name: 'Mazrul' },
    { id: 'Adli', name: 'Adli' },
    { id: 'Alan', name: 'Alan' },
    { id: 'Azman', name: 'Azman' },
    { id: 'Hafiz', name: 'Hafiz' },
    { id: 'Amirul2', name: 'Amirul2' },
  ];

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

    getAssetList() {
      this.loadingIndicator = true;
     
      // Get Assets
      this.restService.getPosts("read_asset_list", this.authService.getToken())
        .subscribe({
          next: data => {
            // console.log(data)
            if (data["status"] == 200) {
              this.assetRows = data["data"].records;
              console.log( this.assetRows )
              this.temp2 = [...this.assetRows];
            }
        },
        error:err =>{
          this.errorMessage = err.error.message;
        }}
        );
    }

  private dateToString = (date) => `${date.year}-${date.month}-${date.day}`; 
  
  addMaster(){
    console.log( this.addMasterForm.value);
    this.addMasterForm.value.Date_taken = this.dateToString(this.addMasterForm.value.Date_taken);
    this.addMasterForm.value.Date_return = this.dateToString(this.addMasterForm.value.Date_return);
    console.log( this.addMasterForm.value);
    this.restService.getPosts("create_master", this.authService.getToken(),  this.addMasterForm.value)
        .subscribe({
          next: data => {
            console.log(data)
            if (data["status"] == 200) { 
              this.getMaster();
              this.addMasterForm.reset();
              this.test();
            }
          }});
  }

  SearchData(val){
    console.log(val);
    let data2 = this.rows.length;
    let statArr: string[]=[];
//function to check asset no has been return or not
for(let i=data2-1; i>=0 ;i--){
    if(this.rows[i].Return_by !== ''){
    //Array of items borrowed
    statArr.push(this.rows[i].Asset_no)
    //to input form, if item_no not listed in the array, can input
}
};

console.log(statArr)
//search for val in statArr, if exist, call patchValue, else, show error 
const search = statArr.find(elem => elem == val);
console.log(search);
if (search){

  this.addMasterForm.patchValue({
  	  Asset_desc: 'test'//this.assetrows[x].Asset_desc
  	});
}
    
  }

  test() {
    window.scroll(0,1000);
}

  test2() {
    window.scroll(0,100);
  }

}
