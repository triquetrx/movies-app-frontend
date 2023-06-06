import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBookingsRequest } from 'src/app/interfaces/IBookings';
import { BookingsService } from 'src/app/service/bookings.service';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.scss'],
})
export class SeatLayoutComponent implements OnInit, OnDestroy {
  seatHeader: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
  ];
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  seats: any = [];
  selectedSeats: any = [];
  disabledSeats = [];
  totalCost: number;
  isBooked: boolean;

  constructor(
    private service: BookingsService,
    @Inject(MAT_DIALOG_DATA) public data: IBookingsRequest,
    private dialogRef: MatDialogRef<SeatLayoutComponent>
  ) {}

  ngOnInit(): void {
    this.service
      .getSeatsBooked(
        this.data?.theatreId,
        this.data?.show?.showTime,
        this.data?.movieName
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        for (let booking of res.payload) {
          booking?.seatNumbers?.forEach((seat) =>
            this.disabledSeats.push(seat)
          );
        }
      });
    this.createSeats();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  selectSeat(seat: string, isAlreadySelected: boolean) {
    if (this.selectedSeats?.includes(seat)) {
      const remove = this.selectedSeats.indexOf(seat);
      this.selectedSeats.splice(remove, 1);
      return;
    }
    if (!isAlreadySelected) {
      this.selectedSeats.push(seat);
    }
  }

  private createSeats(): void {
    let tempCount = 0;
    for (let i = 1; i <= 12; i++) {
      let tempArr = [];
      const limit = Math.round(this.data.show.seats / 12);
      for (let j = 0; j < limit; j++) {
        tempArr.push(this.seatHeader[i - 1] + j);
        tempCount++;
        if (tempCount >= this.data.show.seats) {
          break;
        }
      }
      this.seats.push(tempArr);
    }
  }

  seatCheck(seat: string): string {
    if (this.selectedSeats.includes(seat)) {
      return 'active';
    }
    return '';
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  bookTicket(): void {
    if (this.selectedSeats.length === 0) {
      return;
    }
    const requestBody = {
      theatreId: this.data.theatreId,
      showTime: this.data.show.showTime,
      numberOfTickets: this.selectedSeats.length,
      seatNumbers: this.selectedSeats,
    };

    this.service
      .bookTicket(this.data.movieName, requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.totalCost = res.payload?.bookingDetails?.totalCost;
        },
        error: (err) => console.error(err),
        complete: () => (this.isBooked = true),
      });
  }
}
