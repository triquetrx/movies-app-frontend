import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/interfaces/IAuth';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { IAlert } from 'src/app/interfaces/common.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  alert: IAlert;

  constructor(
    private dialogRef: MatDialogRef<ViewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private service: UserService
  ) {}

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
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
