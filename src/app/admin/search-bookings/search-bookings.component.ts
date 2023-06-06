import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IBookings } from 'src/app/interfaces/IBookings';
import { IPayload } from 'src/app/interfaces/ICommon';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';

@Component({
  selector: 'search-bookings',
  templateUrl: './search-bookings.component.html',
  styleUrls: ['./search-bookings.component.scss'],
})
export class SearchBookingsComponent implements OnInit {
  @Input() bookings: Observable<IPayload<[IBookings]>>;
  searchBooking: string;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  viewMore(booking: IBookings) {
    this.dialog.open(BookingDetailsComponent, { data: booking });
  }
}
