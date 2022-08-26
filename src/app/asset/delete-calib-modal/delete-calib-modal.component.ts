import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-delete-calib-modal',
  templateUrl: './delete-calib-modal.component.html',
  styleUrls: ['./delete-calib-modal.component.scss'],
})
export class DeleteCalibModalComponent implements OnInit {
  @Input() row: any;
  @Output() valueChange = new EventEmitter();

  assetNumber: any;
  assetName: any;
  calibNumber: any;

  constructor(
    private restService: RestService,
    private authService: AuthService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    console.log(this.row);
    this.assetNumber = this.row.Asset_no;
    this.assetName = this.row.Asset_desc;
    this.calibNumber = this.row.Calib_no;
  }

  deleteCalib() {
    // Get Assets
    this.restService
      .getPosts('delete_calib', this.authService.getToken(), {
        id: this.row.id,
        asset_no: this.assetNumber,
        Calib_no: this.calibNumber,
      })
      .subscribe({
        next: (data) => {
          if (data['status'] == 200) {
            this.valueChange.emit('deleteCalibEvent');
          }
        },
      });
  }
}
