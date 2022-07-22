import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-delete-master-modal',
  templateUrl: './delete-master-modal.component.html',
  styleUrls: ['./delete-master-modal.component.scss']
})
export class DeleteMasterModalComponent implements OnInit {
 
  @Input() row: any;
  @Output() valueChange = new EventEmitter();

  assetNumber: any;
  assetName: any;

  constructor(private restService: RestService, private authService: AuthService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.row[0]);
    this.assetNumber = this.row[0].Asset_no;
    this.assetName = this.row[0].Asset_desc;
  }

  deleteMaster(){
      // Get Assets
      this.restService.getPosts("delete_master", this.authService.getToken(),  {Entry_id: this.row[0].Entry_id})
        .subscribe({
          next: data => {
            console.log(data)
            if (data["status"] == 200) {
              this.valueChange.emit("deleteMasterEvent");
            }
        }}
          );
    
  }

}
