import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBookings } from '../interfaces/IBookings';
import { IPayload } from '../interfaces/ICommon';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private http: HttpClient) {}

  public getAllBookings(): Observable<IPayload<[IBookings]>> {
    return this.http.get<IPayload<[IBookings]>>(
      `${environment.apiUrl}/all-bookings`
    );
  }

  public getAllMyBookings(): Observable<IPayload<[IBookings]>> {
    return this.http.get<IPayload<[IBookings]>>(
      `${environment.apiUrl}/my-bookings`
    );
  }

  public bookTicket(
    movieName: string,
    ticket: IBookings
  ): Observable<IPayload<{ bookingDetails: IBookings }>> {
    return this.http.post<IPayload<{ bookingDetails: IBookings }>>(
      `${environment.apiUrl}/${movieName}/add`,
      ticket
    );
  }

  public getSeatsBooked(
    theatreId: string,
    showTime: string,
    movieName: string
  ): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/seats-booked/${theatreId}/${showTime}/${movieName}`
    );
  }
}
