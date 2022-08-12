import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {
  @Input() data: any;
  @Input() empname: any;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
    console.log(this.empname);
  }
  
}
