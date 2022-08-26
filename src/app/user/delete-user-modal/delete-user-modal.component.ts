import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../services/rest.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss'],
})
export class DeleteUserModalComponent implements OnInit {
  @Input() row: any;
  @Output() valueChange = new EventEmitter();

  userName: any;

  constructor(
    private restService: RestService,
    private authService: AuthService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    console.log(this.row.id);
    this.userName = this.row.firstname;
  }

  deleteUser() {
    console.log('yess');
    // Get Assets
    this.restService
      .getPosts('delete_user', this.authService.getToken(), { id: this.row.id })
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data['status'] == 200) {
            // this.modifyUserForm.reset();
            this.valueChange.emit('deleteUsersEvent');
          }
        },
      });
  }
}
