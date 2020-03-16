import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList: User[] = [];

  constructor(public userService: UserService) {
    this.userService.users$.subscribe((userees) => this.userList = userees);
  }

  ngOnInit() {
  }

  userSelected(selected: boolean) {
    console.log('event received from child :', selected);
  }

  deleteUser(user: User) {
    console.log(user);
    this.userService.deleteUser(user);
  }
}
