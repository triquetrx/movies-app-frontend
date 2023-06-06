import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ILogin } from '../../interfaces/IAuth';
import { AuthenticationService } from '../../service/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { takeUntil } from 'rxjs/operators';
import { IAlert } from 'src/app/interfaces/common.interface';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  alert: IAlert;
  isSuccess: boolean;
  @Output() isLoggedIn = new EventEmitter<boolean>();

  constructor(
    private authService: AuthenticationService,
    private cookie: CookieService
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
          this.isSuccess = true;
          this.isLoggedIn.emit(this.isSuccess);
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
