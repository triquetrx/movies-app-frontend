import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IResetPasswordData } from 'src/app/interfaces/IAuth';
import { IAlert } from 'src/app/interfaces/common.interface';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.scss'],
})
export class NewPasswordFormComponent implements OnInit, OnDestroy {
  @Input() token: string;
  alert: IAlert;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private service: AuthenticationService) {}

  ngOnInit(): void {}

  changePassword(form: NgForm): void {
    if (form.invalid) return;

    const data: IResetPasswordData = {
      password: form.value?.password,
      confirmPassword: form.value?.confirmPassword,
    };
    this.service
      .resetPassword(this.token, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alert = {
            isAlert: true,
            alertMessage: 'Password changed successfully',
            alertType: 'success',
          };
        },
        error: () => {
          this.alert = {
            isAlert: true,
            alertMessage: 'Something went wrong try again later',
            alertType: 'warning',
          };
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
