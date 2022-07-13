import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit {
 
  model: NgbDateStruct;
  model2: NgbDateStruct;
  @ViewChild('NgbdDatepicker') c: NgbDateStruct;
  @ViewChild('NgbdDatepicker') f: NgbDateStruct;
  constructor() { }

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

  
  public saveCode(e): void {
    let find = this.codeList.find(x => x?.name === e.target.value);
    console.log(find?.id);
  }



}
