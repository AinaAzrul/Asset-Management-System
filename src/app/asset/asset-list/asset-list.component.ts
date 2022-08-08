import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,Validators, ReactiveFormsModule, FormControlName } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { AssetTestComponent } from '../asset-test/asset-test.component';


@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
 
  // model: NgbDateStruct;
  // model2: NgbDateStruct;
  @ViewChild('NgbdDatepicker') c: NgbDateStruct;
  @ViewChild('NgbdDatepicker') f: NgbDateStruct;
  @ViewChild(AssetTestComponent) private child!:AssetTestComponent;
  calibData: any;
  

  constructor(private restService: RestService, private authService: AuthService) { 
    
  }

  // Form input (defaults)
  addCalibForm = new FormGroup({
    Asset_no: new FormControl('',Validators.required), 
    Asset_desc: new FormControl('',Validators.required),
    Category: new FormControl(''),
    Location: new FormControl(''),
    Calib_no: new FormControl(''),
    Company_name: new FormControl(''),
    Start_date: new FormControl(''),
    End_date: new FormControl(''),
  });

  ngOnInit(): void {
  }

  public codeValue: string;

  public codeList = [
    { id: 1, name: '2013/002' },
    { id: 2, name: '2015/071' },
    { id: 3, name: '2013/004' },
    { id: 4, name: '2015/092' },
    { id: 5, name: '2015/089' },
    { id: 6, name: '2013/027' },
    { id: 7, name: '2015/067' },
    { id: 8, name: '2019/101' },
    { id: 9, name: '2020/103' },
  ];
  private dateToString = (date) => `${date.year}-${date.month}-${date.day}`; 


  addCalib(){
    console.log(this.addCalibForm.value.Company_name);
    console.log(typeof(this.addCalibForm.value.Company_name));
    let expRow = this.addCalibForm.value.Company_name;
    //check calibration number
    if(expRow !== '' || null){
      console.log("calib");
    //adding the first calib
    this.addCalibForm.value.Calib_no="1"; 
    this.addCalibForm.value.Start_date = this.dateToString(this.addCalibForm.value.Start_date);
    this.addCalibForm.value.End_date = this.dateToString(this.addCalibForm.value.End_date);
    // console.log(this.addCalibForm.value.End_date);
    // console.log(typeof(this.addCalibForm.value.End_date));

  }
    this.restService.getPosts("create_asset", this.authService.getToken(),  this.addCalibForm.value)
        .subscribe({
          next: data => {
            console.log(data)
            if (data["status"] == 200) { 
              this.child.getAsset();
              this.addCalibForm.reset();
              this.test();
            }
        }}
          );
   
  }
  test() {
    window.scroll(0,1000);
}

  test2() {
    window.scroll(0,100);
  }

  // calibAdd(event){
  //   console.log(event);
  // }
}
