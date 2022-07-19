import { Component, OnInit,Input,Output,ViewChild,EventEmitter } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss']
})
export class MasterListComponent implements OnInit {

  @Input() row: any;
  @Output() valueChange = new EventEmitter();
  model: NgbDateStruct;
  model2: NgbDateStruct;
  @ViewChild('NgbdDatepicker') d: NgbDateStruct;
  @ViewChild('NgbdDatepicker') s: NgbDateStruct;

  constructor() { }

  ngOnInit(): void {
    console.log(this.row);
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

  public nameList = [
    { id: 1, name: 'Aiman' },
    { id: 2, name: 'Ehwan' },
    { id: 3, name: 'Shah' },
    { id: 4, name: 'Nik' },
    { id: 5, name: 'Muhsin' },
    { id: 6, name: 'Mazrul' },
    { id: 7, name: 'Adli' },
    { id: 8, name: 'Alan' },
    { id: 9, name: 'Azman' },
    { id: 10, name: 'Hafiz' },
    { id: 11, name: 'Amirul2' },
  ];

  public saveCode(e): void {
    let find = this.codeList.find(x => x?.name === e.target.value);
    console.log(find?.id);
  }

  public nameCode(e): void {
    let find = this.nameList.find(x => x?.name === e.target.value);
    console.log(find?.id);
  }

}
