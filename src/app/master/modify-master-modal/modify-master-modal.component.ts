import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-master-modal',
  templateUrl: './modify-master-modal.component.html',
  styleUrls: ['./modify-master-modal.component.scss']
})
export class ModifyMasterModalComponent implements OnInit {

  @Input() row: any;
  @Output() valueChange = new EventEmitter();
  constructor(private restService: RestService, private authService: AuthService, public activeModal: NgbActiveModal) { }

  // Form input (defaults)
  modifyMasterForm = new FormGroup({
    Entry_id: new FormControl({disabled:true}),
    Asset_no: new FormControl('',Validators.required), 
    Asset_desc: new FormControl('',Validators.required),
    Taken_by: new FormControl('', Validators.email),
    Date_taken: new FormControl('', Validators.required),
    Return_by: new FormControl('', Validators.required),
    Date_return: new FormControl('', Validators.required),
    Remarks: new FormControl('', Validators.required),
    Category: new FormControl('user'),
  });

  ngOnInit(): void {
    console.log(this.row);
  }

  updateMaster(){
    console.log("update")
  }

}
