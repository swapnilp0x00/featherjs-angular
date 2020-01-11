import { Component, OnInit } from '@angular/core';
import { Service } from '@feathersjs/feathers';
import { Observable, from } from 'rxjs';
import { FeathersService } from 'src/app/shared/feathers.service';
import { map } from 'rxjs/operators';

export interface UserModel {
  id?: number;
  name: string;
  dateOfBirth?: string;
  email?: string;
  gender?: number;
  rate_per_hour?: number;
  status?: number;
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
   * deleteJob - Asks for delete confirmation and then deletes job after confirmation.
   * @param job - job to be deleted.
   */
  deleteUser(user: UserModel) {
    const response = confirm('Are you sure you want to delete this');
    if (response) {
      this.userService.remove(user.id).then(() => {
        this.fetchAll();
        console.log('%c Job Deleted', 'font-size:20px;font-weight:bold');
      }).catch(error => {
        console.log('%c Error', 'color:red;font-size:20px;font-weight:bold');
      });
    }
  }
}
