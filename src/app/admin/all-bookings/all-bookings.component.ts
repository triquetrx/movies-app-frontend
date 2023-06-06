import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/service/bookings.service';
import { Observable } from 'rxjs';
import { IPayload } from 'src/app/interfaces/ICommon';
import { IBookings } from 'src/app/interfaces/IBookings';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.scss'],
})
export class AllBookingsComponent implements OnInit {
  bookings: Observable<IPayload<[IBookings]>>;

  constructor(private service: BookingsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.bookings = this.service.getAllBookings();
  }

  openBooking(booking: IBookings): void {
    this.dialog.open(BookingDetailsComponent, {
      data: booking,
    });
  }
}
