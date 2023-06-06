import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/IAuth';
import { IPayload } from 'src/app/interfaces/ICommon';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  aboutUser: Observable<IPayload<IUser>>;
  constructor(private service: UserService, private cookies: CookieService) {}

  ngOnInit(): void {
    this.aboutUser = this.service.aboutUser();
  }

  logout(): void {
    localStorage.clear();
    this.cookies.delete('token');
    this.cookies.delete('role');
  }
}
