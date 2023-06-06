import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAlert } from 'src/app/interfaces/common.interface';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'username-form',
  templateUrl: './username-form.component.html',
  styleUrls: ['./username-form.component.scss'],
})
export class UsernameFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() completed: EventEmitter<boolean> = new EventEmitter<boolean>();
  alert: IAlert;
  isCompleted: boolean;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}

  generateToken(form: NgForm): void {
    if (form.invalid) return;
    this.authService
      .forgotPassword(form.value.username)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res?.resetToken);
          this.isCompleted = true;
          this.completed.emit(this.isCompleted);
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

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
