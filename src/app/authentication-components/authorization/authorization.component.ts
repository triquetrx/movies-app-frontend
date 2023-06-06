import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private cookie: CookieService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  validateUser(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      this.validateUserRole();
      this.router.navigate(['/movies']);
    }
  }

  private validateUserRole(): void {
    const token = this.cookie.get('token');
    this.authService
      .validateToken(token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.cookie.set('role', res.payload?.role);
        },
        error: (err) => {
          this.cookie.delete('token');
        },
      });
  }
}
