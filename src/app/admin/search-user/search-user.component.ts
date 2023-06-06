import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/IAuth';
import { Observable } from 'rxjs';
import { IPayload } from 'src/app/interfaces/ICommon';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserComponent } from '../view-user/view-user.component';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
  searchUser: string;
  @Input() users: Observable<IPayload<[IUser]>>;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  sendData(user: IUser) {
    this.dialog.open(ViewUserComponent, { data: user });
  }
}
