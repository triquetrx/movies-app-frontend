import {
  Component,
  OnInit,
  DoCheck,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, DoCheck, OnDestroy {
  role: string;
  userName: string;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cookies: CookieService,
    private service: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    const token = this.cookies.get('token');
    if (!this.role && token) {
      this.validateUserRole(token);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  logout(): void {
    this.cookies.deleteAll('/');
    this.role = '';
    this.router.navigate(['/login']);
  }

  viewProfile(): void {
    this.router.navigate(['/user/about-me']);
  }

  private validateUserRole(token): void {
    this.service
      .validateToken(token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.cookies.set('role', res.payload?.role, {
            sameSite: 'Strict',
            secure: true,
          });
          this.role = res.payload?.role;
          this.userName = res.payload?.name;
        },
        error: (err) => {
          console.error(err);
          this.cookies.delete('token');
          this.cookies.delete('role');
        },
      });
  }
}
