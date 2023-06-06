import { Pipe, PipeTransform } from '@angular/core';
import { IBookings } from 'src/app/interfaces/IBookings';

@Pipe({
  name: 'searchBookings',
})
export class SearchBookingsPipe implements PipeTransform {
  transform(bookings: IBookings[], searchText: string): IBookings[] {
    if (!searchText) return bookings;
    return bookings.filter(
      (booking) =>
        booking.movieName.includes(searchText) ||
        booking.theatreId.includes(searchText) ||
        booking.userId.includes(searchText) ||
        booking?._id.includes(searchText)
    );
  }
}
