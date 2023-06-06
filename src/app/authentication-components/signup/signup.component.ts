import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../service/authentication.service';
import { ISignup } from '../../interfaces/IAuth';
import { takeUntil } from 'rxjs/operators';
import { IAlert } from 'src/app/interfaces/common.interface';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  alert: IAlert;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  signup(signupForm: NgForm): void {
    if (signupForm.invalid) {
      return;
    }
    const signupData: ISignup = signupForm.value;
    this.authService
      .signup(signupData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alert = {
            isAlert: true,
            alertType: 'success',
            alertMessage: res?.payload,
          };
        },
        error: (err) => {
          this.alert = {
            isAlert: true,
            alertType: 'warning',
            alertMessage: this.errorMessage(err.error?.message),
          };
        },
      });
  }

  private errorMessage(errMsg: string): string {
    if (errMsg.includes('Email ID must be unique')) {
      return 'User already exists';
    } else if (errMsg.includes('User ID already taken')) {
      return 'Username already taken';
    }
  }
}
