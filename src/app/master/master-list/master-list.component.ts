import { Component, OnInit, ViewChild, VERSION } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormControlName,
} from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss'],
})
export class MasterListComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  // model: NgbDateStruct;
  // model2: NgbDateStruct;
  @ViewChild('NgbdDatepicker') d: NgbDateStruct;
  @ViewChild('NgbdDatepicker') s: NgbDateStruct;

  rows: any[] = [];
  temp: any;
  assetRows: any[] = [];
  temp2: any;
  masterData: any[];

  assetNo = [];
  empName = [];

  loadingIndicator = true;
  errorMessage: any;
  isLoadTab = false;
  isEditable = true;
  isError = false;

  constructor(
    private restService: RestService,
    private authService: AuthService
  ) {}

  // Form input (defaults)
  addMasterForm = new FormGroup({
    Asset_no: new FormControl('', Validators.required),
    Asset_desc: new FormControl('', Validators.required),
    Taken_by: new FormControl(''),
    Date_taken: new FormControl(''),
    Return_by: new FormControl(''),
    Date_return: new FormControl(''),
    Remarks: new FormControl(''),
    Category: new FormControl(''),
  });

  ngOnInit() {
    this.getMaster();
    this.getAssetList();
  }

  public codeValue: string;
  public cdodeignatoe: string;
  getMaster() {
    this.loadingIndicator = true;

    // Get Assets
    this.restService
      .getPosts('read_master', this.authService.getToken())
      .subscribe({
        next: (data) => {
          // console.log(data)
          if (data['status'] == 200) {
            this.rows = data['data'].records;
            console.log(this.rows);
            this.temp = [...this.rows];
            this.loadingIndicator = false;

            this.empName = [
              ...new Set(
                this.rows.map((item) => {
                  return item.Taken_by;
                })
              ),
            ];
            this.isLoadTab = true;
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
  }

  getAssetList() {
    this.loadingIndicator = true;

    // Get Assets
    this.restService
      .getPosts('read_asset_list', this.authService.getToken())
      .subscribe({
        next: (data) => {
          // console.log(data)
          if (data['status'] == 200) {
            this.assetRows = data['data'].records;
            console.log(this.assetRows);
            this.assetNo = [
              ...new Set(
                this.assetRows.map((item) => {
                  return item.Asset_no;
                })
              ),
            ];
            this.temp2 = [...this.assetRows];
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
  }

  // Convert date format
  dateToString(date) {
    console.log(date);
    console.log('test');
    if (date === '' || date === null) {
      return '';
    }
    return `${date.year}-${date.month}-${date.day}`;
  }

  addMaster() {
    console.log(this.addMasterForm.value);
    console.log(this.addMasterForm.value?.Date_taken);

    this.addMasterForm.value.Date_taken = this.dateToString(
      this.addMasterForm.value?.Date_taken
    );
    this.addMasterForm.value.Date_return = this.dateToString(
      this.addMasterForm.value?.Date_return
    );
    console.log(this.addMasterForm.value);
    this.restService
      .getPosts(
        'create_master',
        this.authService.getToken(),
        this.addMasterForm.value
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data['status'] == 200) {
            this.getMaster();
            this.addMasterForm.reset();
          }
        },
      });
  }

  //Check for unavailable asset
  SearchData(val) {
    console.log(val);
    let data2 = this.rows.length;
    let statArr: string[] = [];
    //function to check asset num has been return or not

    //if no return_by in asset, insert in array (borrowing)
    for (let i = data2 - 1; i >= 0; i--) {
      if (this.rows[i].Return_by == '' && this.rows[i].Taken_by !== '') {
        //Array of items borrowed
        statArr.push(this.rows[i].Asset_no);
        //to input form, if item_no not listed in the array, can input
      }
    }

    console.log(statArr);
    //search for val in statArr, if not exist,enable input field, else, show alert and disable input
    const search = statArr.find((elem) => elem == val);
    console.log(search);
    this.isError = false;
    let idx = this.assetNo.indexOf(val);
    console.log(idx);

    if (idx == -1) {
      this.addMasterForm.reset({
        Asset_no: this.addMasterForm.get('Asset_no').value,
      });
    } else if (!search) {
      console.log(this.assetRows[idx].Asset_desc);
      this.addMasterForm.patchValue({
        Asset_desc: this.assetRows[idx].Asset_desc,
        Category: this.assetRows[idx].Category,
      });
    } else {
      this.isError = true;
      this.errorMessage = 'Asset number ' + val + ' is borrowed';
      this.addMasterForm.reset({
        Asset_no: this.addMasterForm.get('Asset_no').value,
      });
    }
  }

  test() {
    window.scroll(0, 1000);
  }

  test2() {
    window.scroll(0, 100);
  }
}
