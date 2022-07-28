import { Component, OnInit,ViewChild } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,Validators, ReactiveFormsModule, FormControlName } from '@angular/forms';
import { MasterDatatableComponent } from '../master-datatable/master-datatable.component';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss']
})
export class MasterListComponent implements OnInit {

  // model: NgbDateStruct;
  // model2: NgbDateStruct;
  @ViewChild('NgbdDatepicker') d: NgbDateStruct;
  @ViewChild('NgbdDatepicker') s: NgbDateStruct;
  @ViewChild(MasterDatatableComponent) private tableComponent!: MasterDatatableComponent;

  constructor(private restService: RestService, private authService: AuthService) { }

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


  ngOnInit(): void {
  }

  public codeValue: string;

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

  // public saveCode(e): void {
  //   let find = this.codeList.find(x => x?.name === e.target.value);
  //   // console.log(find?.id);
  // }

  // public nameCode(e): void {
  //   let find = this.nameList.find(x => x?.name === e.target.value);
  //   // console.log(find?.id);
  // }
  
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
            if (data["status"] == 201) { 
              this.tableComponent.getMaster();
              this.addMasterForm.reset();
              this.test();
            }
          }});
  }

  test() {
    window.scroll(0,1000);
}

}
