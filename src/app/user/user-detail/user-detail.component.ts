import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  user: any;

  constructor(private userService: UserService,
              private auth: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = this.auth.getUserId();
debugger;
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user;
    }, (err) => {

    })
  }

}