import { Component, OnInit,ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';
import { ModifyUserModalComponent } from '../modify-user-modal/modify-user-modal.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;

  rows = [];
  temp = [];
  row = [];
  filterkey = "";
  loadingIndicator = true;
  errorMessage = '';
  selected = [];
  userInfo: any;
  session: any;
  

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  private modifyUserModalRef;
  
  constructor(private restService: RestService, private authService: AuthService, private modalService: NgbModal ) { }

  ngOnInit(){

    this.session = this.authService.val_token();
    this.userInfo = this.authService.getRole();
    console.log(this.userInfo);
     if(this.userInfo!=null){
      this.getUsers();
    } ;
    
  }

  getUsers() {
    this.loadingIndicator = true;
    // Get Assets
    this.restService.getPosts("get_user", this.authService.getToken())
      .subscribe({
        next: data => {
    
          if (data["status"] == 200) {
            
            this.rows = data["data"].records;
            this.temp = [...this.rows];
            this.loadingIndicator = false;
            
          }console.log(this.rows);

          this.rows;
      },
      error:err =>{
        this.errorMessage = err.error.message;
      }}
        );

  }

  onActivate(event) {

    if (event.type === "click") {
      this.selected= event.row;
    }
    (event.type === 'click') && event.cellElement.blur();
    console.log('Activate Event', event);
  }

  // onSelect({ selected }) {
  //   console.log('Select Event', selected.row, this.selected);

  // }

  //14/7/2022
  modifyUserRow(row){
    console.log('row')
    this.modifyUserModalRef = this.modalService.open(ModifyUserModalComponent);
    this.modifyUserModalRef.componentInstance.row = row;
    this.modifyUserModalRef.componentInstance.valueChange.subscribe((event) => {
      console.log(event);
      this.getUsers(); //this function won't work  (15/7)
    });
    // this.modifyUserModalRef.result.then(this.getUsers();
    //   (data: any) => {
    //     console.log(data);
        
    //   },
    //   (reason: any) => { }
    // );
  }

  deleteUserRow(){
    console.log("delete");
  }

}
