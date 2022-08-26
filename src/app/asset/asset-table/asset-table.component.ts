import {
  Component,
  ViewEncapsulation,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  DatatableComponent,
  ColumnMode,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteAssetModalComponent } from '../delete-asset-modal/delete-asset-modal.component';

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AssetTestComponent {
  @ViewChild('myTable') table: any;
  // @Output() valuePass = new EventEmitter();

  // rows: any[] = [];
  // expanded: any = {};
  // timeout: any;
  // selectedRow: any;
  // deleteAssetModalRef:any;
  // disabledDelButton= false;

  // tab = [];
  // temp = [];
  // filterkey = "";
  // loadingIndicator = true;
  // errorMessage = '';
  // selected = [];

  // calibNo = [];
  // startD = [];
  // endD = [];
  // companyName= [];

  // ColumnMode = ColumnMode;
  // SelectionType = SelectionType;

  constructor(
    private restService: RestService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    //   this.getAsset();
  }

  // onPage(event) {
  //   clearTimeout(this.timeout);
  //   this.timeout = setTimeout(() => {
  //     console.log('paged!', event);
  //   }, 100);
  // }

  // // fetch(cb) {
  // //   const req = new XMLHttpRequest();
  // //   req.open('GET', `assets/data/100k.json`);

  // //   req.onload = () => {
  // //     cb(JSON.parse(req.response));
  // //   };

  // //   req.send();
  // // }
  // getAsset() {
  //   this.loadingIndicator = true;
  //   // Get Assets
  //   this.restService.getPosts("read_asset", this.authService.getToken())
  //     .subscribe({
  //       next: data => {
  //         console.log(data)
  //         if (data["status"] == 200) {

  //           this.temp = data["data"].records;

  //           //  = [...this.rows];
  //           console.log(this.temp);
  //           this.loadingIndicator = false;

  //         //Mapping array with different propoerties with the same id
  //         this.tab= [];
  //         const idfile= [...Array.from(new Set(this.temp.map(i=>i.Asset_no)))];
  //         // console.log(idfile)
  //         idfile.forEach((Asset_no) => {
  //             let res = this.temp.filter((Calib_no) => Calib_no.Asset_no == Asset_no);
  //             let res2 = this.temp.filter((Start_date) => Start_date.Asset_no == Asset_no);
  //             let res3 = this.temp.filter((End_date) => End_date.Asset_no == Asset_no);
  //             let res4 = this.temp.filter((Company_name) => Company_name.Asset_no == Asset_no);

  //         // console.log(res[0])

  //             this.tab.push({Asset_no, Calib_no: res.length > 1 ? res.map(i => i.Calib_no) :(res[0].Calib_no),
  //                 Start_date: res2.length > 1 ? res2.map(i => i.Start_date) :(res2[0].Start_date),
  //                 End_date: res3.length > 1 ? res3.map(i => i.End_date) :(res3[0].End_date),
  //                 Company_name: res4.length > 1 ? res4.map(i => i.Company_name) :(res4[0].Company_name), Asset_desc: res.map(i => i.Asset_desc)[0],
  //                 Category: res.map(i => i.Category)[0], Location: res.map(i => i.Location)[0]} )
  //           });
  //           console.log(this.tab)
  //           this.rows = this.tab;
  //           // this.valuePass.emit(this.rows);
  //         }
  //     },
  //     error:err =>{
  //       this.errorMessage = err.error.message;
  //     }}
  //     );
  // }

  // toggleExpandRow(row) {
  //   console.log('Toggled Expand Row!', row);
  //   console.log(row.Calib_no);
  //   let calibArr = row.Calib_no;
  //   // console.log(calibArr)
  //   this.table.rowDetail.toggleExpandRow(row);
  // }

  // onDetailToggle(event) {
  //   console.log(event.value);
  //   console.log('Detail Toggled', event);
  // }

  // getDetailRows(row){
  //   // console.log(row)
  //   let val4 = row.Asset_no;
  //   const fil= this.temp.filter(temp=>temp.Asset_no.toLowerCase().indexOf(val4) !== -1 || !val4);
  //   // console.log(fil)
  //   return fil;
  // }

  // onActivate(event){
  //   // console.log(event);
  //     if (event.type === "click") {
  //       this.selectedRow = event.row;
  //       this.disabledDelButton = true;
  //     }
  //     event.type === "click" && event.cellElement.blur();
  // }

  // deleteRow(){
  // console.log(this.selected);
  // this.deleteAssetModalRef = this.modalService.open(DeleteAssetModalComponent);
  // this.deleteAssetModalRef.componentInstance.row = this.selected;
  // this.deleteAssetModalRef.componentInstance.valueChange.subscribe((event) => {
  //   console.log(event);
  //   this.getAsset();
  // });

  // }
}
