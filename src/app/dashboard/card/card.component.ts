import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  masterData = [];
  assetData = [];
  tab = [];
  temp1 = [];
  temp2 = [];
  missing: any;
  filterkey = "";
  loadingIndicator = true;
  errorMessage = '';

  constructor(private restService: RestService, private authService: AuthService) { }

  ngOnInit() {
    this.getMaster();
    this.getAsset();
  }

  getMaster() {
    this.loadingIndicator = true;
    // Get Assets
    this.restService.getPosts("read_master", this.authService.getToken())
      .subscribe({
        next: data => {
          console.log(data)
          if (data["status"] == 200) {
            this.masterData = data["data"].records;
            this.temp1 = [...this.masterData];
            this.loadingIndicator = false;
            this.filterData();
          }console.log(this.masterData);
      },
      error:err =>{
        this.errorMessage = err.error.message;
      }}
        );

        
  }

  getAsset() {
    this.loadingIndicator = true;
    // Get Assets
    this.restService.getPosts("read_asset", this.authService.getToken())
      .subscribe({
        next: data => {
          console.log(data)
          if (data["status"] == 200) {
           
            this.temp2 = data["data"].records;
            
            //  = [...this.rows];
            console.log(this.temp2);
            this.loadingIndicator = false;
          
          //Mapping array with different propoerties with the same id
          this.tab= [];
          const idfile= [...Array.from(new Set(this.temp2.map(i=>i.Asset_no)))];
          // console.log(idfile)
          idfile.forEach((Asset_no) => {
              let res = this.temp2.filter((Calib_no) => Calib_no.Asset_no == Asset_no);
              let res2 = this.temp2.filter((Start_date) => Start_date.Asset_no == Asset_no);
              let res3 = this.temp2.filter((End_date) => End_date.Asset_no == Asset_no);
              let res4 = this.temp2.filter((Company_name) => Company_name.Asset_no == Asset_no);
              
          // console.log(res[0])
              
              this.tab.push({Asset_no, Calib_no: res.length > 1 ? res.map(i => i.Calib_no) :(res[0].Calib_no), 
                  Start_date: res2.length > 1 ? res2.map(i => i.Start_date) :(res2[0].Start_date),
                  End_date: res3.length > 1 ? res3.map(i => i.End_date) :(res3[0].End_date), 
                  Company_name: res4.length > 1 ? res4.map(i => i.Company_name) :(res4[0].Company_name), Asset_desc: res.map(i => i.Asset_desc)[0], 
                  Category: res.map(i => i.Category)[0], Location: res.map(i => i.Location)[0]} )
            });
            console.log(this.tab) 
            this.assetData = this.tab;
            // this.valuePass.emit(this.rows);
          }
      },
      error:err =>{
        this.errorMessage = err.error.message;
      }}
      );

      console.log(this.assetData);
      
  }

  filterData(){
    let val = 'missing';
    let temp = this.masterData.filter(temp=>temp.Remarks.toLowerCase().indexOf(val) !== -1 || !val);
    this.missing = temp.length;
  }

}
