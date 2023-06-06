import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'movies-button',
  templateUrl: './movies-button.component.html',
  styleUrls: ['./movies-button.component.scss'],
})
export class MoviesButtonComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  @Input() movieName: string;
  @Output() isUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private cookie: CookieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const userRole = this.cookie.get('role');
    if (userRole === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  delete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.movieName,
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isUpdate.emit(true);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
