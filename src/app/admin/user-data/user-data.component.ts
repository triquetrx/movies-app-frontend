import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/IAuth';
import { IPayload } from 'src/app/interfaces/ICommon';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { IAlert } from 'src/app/interfaces/common.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  allUsers: Observable<IPayload<[IUser]>>;
  alert: IAlert;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.allUsers = this.service.getAllUsers();
  }

  giveAdminAccess(loginId: string): void {
    this.service
      .giveAdminAccess(loginId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alert = {
            isAlert: true,
            alertType: 'success',
            alertMessage: res.payload,
          };
        },
        error: (err) => {
          this.alert = {
            isAlert: true,
            alertType: 'danger',
            alertMessage: 'Something went wrong, we are looking into it',
          };
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
