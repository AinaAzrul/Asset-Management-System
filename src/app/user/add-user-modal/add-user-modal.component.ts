import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {

  @Output() valueChange = new EventEmitter();

  constructor(private restService: RestService, private authService: AuthService, public activeModal: NgbActiveModal) { }

  // Form input (defaults)
  addUserForm = new FormGroup({
    firstname: new FormControl('',Validators.required), 
    lastname: new FormControl('',Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
    role: new FormControl(''),
  });

  ngOnInit(): void {
  }

  addUser(){
    console.log(this.addUserForm.value);
    this.restService.getPosts("create_user", this.authService.getToken(),  this.addUserForm.value)
        .subscribe({
          next: data => {
            console.log(data)
            if (data["status"] == 200) {
              this.valueChange.emit("addUsersEvent");
            }
        }}
          );
  }

}
