import { Component, OnInit } from '@angular/core';
import { Service } from '@feathersjs/feathers';
import { UserModel } from '../user-list/user-list.component';
import { FeathersService } from 'src/app/shared/feathers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  id: string;
  userService: Service<UserModel>;
  user: UserModel;

  constructor(
    private router: Router,
    private feathersService: FeathersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = {
      dateOfBirth: '',
      status: 1,
      email: '',
    };
    this.id = this.activatedRoute.snapshot.params.id;
    this.userService = this.feathersService.createService<UserModel>('user');
    if (this.id) {
      this.userService.get(this.id).then(user => {
        this.user = user;
      });
    }
  }


  /**
   * onSubmit - Called when form is submiited, used to send create/patch call
   */
  onSubmit() {
    if (this.id) {
      this.userService.patch(this.id, this.user).then(response => {
        console.log('User Updated');
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.create(this.user).then(response => {
        console.log('User Created');
        this.router.navigate(['/users']);
      });
    }
  }
}
