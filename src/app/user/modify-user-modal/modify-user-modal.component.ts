import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { FormGroup, FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modify-user-modal',
  templateUrl: './modify-user-modal.component.html',
  styleUrls: ['./modify-user-modal.component.scss']
})
export class ModifyUserModalComponent implements OnInit {
  
  @Input() row: any;
  @Output() valueChange = new EventEmitter();
  role: any;
  // ng-select
  public role_selectOptions = [
    { id: 'Administrator', name: 'Administrator' },
    { id: 'Technician', name: 'Technician' }
  ];

  // Form input (defaults)
  modifyUserForm = new FormGroup({
    id: new FormControl({disabled:true}),
    firstname: new FormControl('',Validators.required), 
    lastname: new FormControl('',Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
    role: new FormControl('user'),
  });

  constructor(private restService: RestService, private authService: AuthService, public activeModal: NgbActiveModal) { }

  
  ngOnInit(): void {
    console.log(this.row);
    this.modifyUserForm.patchValue({
  	  id: this.row.id,
  	  firstname: this.row.firstname,
      lastname: this.row.lastname,
      email: this.row.email,
      role: this.row.role,
  	});
  }

  updateUser(){
    console.log("yess");
      // Get Assets
      this.restService.getPosts("update_user", this.authService.getToken(),  {id: this.modifyUserForm.value.id, firstname: this.modifyUserForm.value.firstname, lastname: this.modifyUserForm.value.lastname, email: this.modifyUserForm.value.email, password: this.modifyUserForm.value.password, role: this.role})
        .subscribe({
          next: data => {
            console.log(data)
            if (data["status"] == 200) {
              this.modifyUserForm.reset();
              this.valueChange.emit("getUsersEvent");
            }
        }}
          );
    
  }

  public saveCode(e): void {
    let find = this.role_selectOptions.find(x => x?.name === e.target.value);
    this.role = find?.id;
    console.log(this.role);
  }

}
