import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-delete-asset-modal',
  templateUrl: './delete-asset-modal.component.html',
  styleUrls: ['./delete-asset-modal.component.scss']
})
export class DeleteAssetModalComponent implements OnInit {

  @Input() row: any;
  @Output() valueChange = new EventEmitter();

  assetNumber: any;
  assetName: any;

  constructor(private restService: RestService, private authService: AuthService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.row[0].Asset_no);
    this.assetNumber = this.row[0].Asset_no;
    this.assetName = this.row[0].Asset_desc;
  }

  deleteAsset(){
    // Get Assets
    this.restService.getPosts("delete_asset", this.authService.getToken(),  {Asset_no: this.row[0].Asset_no})
      .subscribe({
        next: data => {
          if (data["status"] == 200) {
            this.valueChange.emit("deleteAssetEvent");
          }
      }}
      );
  
}



}
