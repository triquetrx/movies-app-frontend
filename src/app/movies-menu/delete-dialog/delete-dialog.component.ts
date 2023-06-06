import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAlert } from 'src/app/interfaces/common.interface';
import { MovieService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit, OnDestroy {
  alert: IAlert;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialog: MatDialogRef<DeleteDialogComponent>,
    private service: MovieService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  close(): void {
    this.dialog.close();
  }

  delete(): void {
    this.service
      .deleteMovie(this.data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alert = {
            isAlert: true,
            alertMessage: 'Deleted successfully',
            alertType: 'success',
          };
        },
        error: (err) => {
          this.alert = {
            isAlert: true,
            alertMessage: 'Oops, something went wrong',
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
