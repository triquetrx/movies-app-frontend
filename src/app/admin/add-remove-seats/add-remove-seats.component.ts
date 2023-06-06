import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITheatre, IUpdateMovieRequest } from 'src/app/interfaces/IMovies';
import { IAlert } from 'src/app/interfaces/common.interface';
import { MovieService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-add-remove-seats',
  templateUrl: './add-remove-seats.component.html',
  styleUrls: ['./add-remove-seats.component.scss'],
})
export class AddRemoveSeatsComponent implements OnInit, OnDestroy {
  alert: IAlert;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      type: string;
      movieName: string;
      showTime: string;
      seats: number;
      theatre: ITheatre;
    },
    private dialogRef: MatDialogRef<AddRemoveSeatsComponent>,
    private service: MovieService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  updateSeat(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const request: IUpdateMovieRequest = {
      type: this.data.type,
      theatreId: this.data.theatre?._id,
      showTime: this.data.showTime,
      numberOfSeats: form.value?.numberOfSeats,
    };
    this.service
      .updateSeats(this.data?.movieName, request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alert = {
            isAlert: true,
            alertMessage: `Updated successfully!`,
            alertType: 'success',
          };
        },
        error: (err) => {
          this.alert = {
            isAlert: true,
            alertMessage: `Oops, something went wrong try again after sometime`,
            alertType: 'warning',
          };
        },
      });
  }
}
