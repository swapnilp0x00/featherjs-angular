import { Component, OnInit } from '@angular/core';
import { Service } from '@feathersjs/feathers';
import { Observable, from } from 'rxjs';
import { FeathersService } from 'src/app/shared/feathers.service';
import { map } from 'rxjs/operators';

export interface UserModel {
  id?: number;
  name?: string;
  dateOfBirth: string;
  email: string;
  hourlyRate?: number;
  status: number;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList$: Observable<any>;
  userService: Service<UserModel>;

  constructor(private featherService: FeathersService) {
  }

  ngOnInit() {
    this.userService = this.featherService.createService<UserModel>('user');
    this.fetchAll();
  }

  /**
   * fetchAll - Used to set observable for all records before component is rendered.
   * TODO: Can also be set in resolver for better UX.
   */
  fetchAll() {
    this.userList$ = from(this.userService.find()).pipe(
      map((response: any) => response.data)
    );
  }

  /**
   * deleteUser - Asks for delete confirmation and then deletes user after confirmation.
   * @param user - user to be deleted.
   */
  deleteUser(user: UserModel) {
    const response = confirm('Are you sure you want to delete this');
    if (response) {
      this.userService.remove(user.id).then(() => {
        this.fetchAll();
        console.log('%c User Deleted', 'font-size:20px;font-weight:bold');
      }).catch(error => {
        console.log('%c Error', 'color:red;font-size:20px;font-weight:bold');
      });
    }
  }
}
