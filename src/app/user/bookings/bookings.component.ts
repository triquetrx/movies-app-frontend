import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBookings } from 'src/app/interfaces/IBookings';
import { IPayload } from 'src/app/interfaces/ICommon';
import { BookingsService } from 'src/app/service/bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  bookings: Observable<IPayload<[IBookings]>>;

  constructor(private service: BookingsService) {}

  ngOnInit(): void {
    this.bookings = this.service.getAllMyBookings();
  }
}
