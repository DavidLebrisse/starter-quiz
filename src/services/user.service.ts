import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { USER_LIST } from '../mocks/user-list.mock';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {stringify} from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of user.
    * The list is retrieved from the mock.
    */
  private users: User[] = USER_LIST;

  /**
   * Observable which contains the list of the user.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public users$: BehaviorSubject<User[]> = new BehaviorSubject(this.users);

  // todo change for use with custom api
  private calledURL = 'https://api.myjson.com/bins/silu2';

  constructor(private http: HttpClient) {
    // todo enable for use with api
    // this.setUsersFromUrl();
  }

  addUser(user: User) {
    // You need here to update the list of user and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    user.id = this.users.length.toString();
    this.users.push(user);
    this.users$.next(this.users);
  }

  deleteUser(user: User) {
    let removeIdx: number;
    removeIdx = this.users.indexOf(user);
    this.users.splice(removeIdx, 1);
    this.users$.next(this.users);
  }

  private setUsers(users: User[]) {
    this.users = users;
    this.users$.next(this.users);
  }

  private setUsersAndIds(users: User[ ]) {
    for (let i = 0; i < users.length; i++) {
      users[i].id = i.toString();
    }
    this.setUsers(users);
  }


  setUsersFromUrl() {
    this.http.get<{ users: User[ ] }>(this.calledURL).subscribe((usersObj) => this.setUsers(usersObj.users));
  }


}
