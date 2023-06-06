import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  Input,
  EventEmitter,
  Inject,
} from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ILogin } from 'src/app/interfaces/IAuth';
import { takeUntil } from 'rxjs/operators';
import { IAlert } from 'src/app/interfaces/common.interface';

@Component({
  selector: 'app-login-movie',
  templateUrl: './login-movie.component.html',
  styleUrls: ['./login-movie.component.scss'],
})
export class LoginMovieComponent implements OnInit {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  alert: IAlert;
  @Output() isLoggedIn = new EventEmitter<boolean>();
  isLoginSuccess: boolean;

  constructor(
    private authService: AuthenticationService,
    private cookie: CookieService,
    public dialogRef: MatDialogRef<LoginMovieComponent>
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  login(loginForm: NgForm): void {
    if (loginForm.invalid) {
      return;
    }

    const data = this.generateLoginBody(loginForm);
    this.authService
      .login(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.cookie.set('token', res?.payload, {
            secure: true,
            sameSite: 'Strict',
          });
          this.isLoginSuccess = true;
          this.isLoggedIn.emit(this.isLoginSuccess);
          this.dialogRef.close();
        },
        error: (err) => {
          this.alert = {
            isAlert: true,
            alertType: 'warning',
            alertMessage: err.error?.message,
          };
        },
      });
  }

  private checkIfEmail(email: string): any {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return email.toLowerCase().match(regex);
  }

  private generateLoginBody(loginForm: NgForm): ILogin {
    if (this.checkIfEmail(loginForm.value?.emailIdOrLoginId)) {
      return {
        email: loginForm.value?.emailIdOrLoginId,
        password: loginForm.value?.password,
      };
    }
    return {
      loginId: loginForm.value?.emailIdOrLoginId,
      password: loginForm.value?.password,
    };
  }
}
