import { Component, OnInit,Input,Output,EventEmitter,ViewChild} from '@angular/core';
import { FormGroup, FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-calib-modal',
  templateUrl: './add-calib-modal.component.html',
  styleUrls: ['./add-calib-modal.component.scss']
})
export class AddCalibModalComponent implements OnInit {

  @Input() row: any;
  @Output() valueChange = new EventEmitter();
  @ViewChild('NgbdDatepicker') d: NgbDateStruct;
  @ViewChild('NgbdDatepicker') s: NgbDateStruct;

  // Form input (defaults)
  addCalibForm = new FormGroup({
    Asset_no: new FormControl({disabled:true}),
    Asset_desc: new FormControl({disabled:true}),
    Calib_no: new FormControl(''),
    Start_date: new FormControl(''),
    End_date: new FormControl(''),
    Company_name: new FormControl(''),
  });

  constructor(private restService: RestService, private authService: AuthService, public activeModal: NgbActiveModal) { }

  ngOnInit(){
    console.log(this.row);
    this.addCalibForm.patchValue({
  	  Asset_no: this.row.Asset_no,
  	  Asset_desc: this.row.Asset_desc
  	});
  }

  private dateToString = (date) => `${date.year}-${date.month}-${date.day}`;

  createCalib(){
   
    this.addCalibForm.value.Start_date = this.dateToString(this.addCalibForm.value.Start_date);
    this.addCalibForm.value.End_date = this.dateToString(this.addCalibForm.value.End_date); 
    console.log(this.addCalibForm.value);

    this.restService.getPosts("create_calib", this.authService.getToken(),  {
      Asset_no: this.addCalibForm.value.Asset_no,
      Calib_no: this.addCalibForm.value.Calib_no, 
      Start_date: this.addCalibForm.value.Start_date,
      End_date: this.addCalibForm.value.End_date,
      Company_name: this.addCalibForm.value.Company_name,
      }).subscribe({
            next: data => {
              console.log(data)
              if (data["status"] == 200) {
                this.addCalibForm.reset(); 
                this.valueChange.emit(this.addCalibForm.value);
            }
          }}
         );
         
        
  }

}
