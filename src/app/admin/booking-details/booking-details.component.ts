import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/IAuth';
import { IBookings } from 'src/app/interfaces/IBookings';
import { IPayload } from 'src/app/interfaces/ICommon';
import { ITheatre } from 'src/app/interfaces/IMovies';
import { MovieService } from 'src/app/service/movies.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
})
export class BookingDetailsComponent implements OnInit {
  bookingDetails: IBookings;
  userDetail: Observable<IPayload<IUser>>;
  theatreDetail: Observable<IPayload<ITheatre>>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IBookings,
    private movieService: MovieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.theatreDetail = this.movieService.getTheatreFromId(
      this.data.theatreId
    );
    this.userDetail = this.userService.getDetailsFromUserId(this.data.userId);
  }
}
