import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { IMovies, IShowDetails, ITheatre } from 'src/app/interfaces/IMovies';
import { MovieService } from 'src/app/service/movies.service';
import { MatDialog } from '@angular/material/dialog';
import { IBookingsRequest } from 'src/app/interfaces/IBookings';
import { SeatLayoutComponent } from '../seat-layout/seat-layout.component';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.scss'],
})
export class BookTicketComponent implements OnInit, OnDestroy, AfterViewInit {
  movie: IMovies;
  theatreDetails: any = [];

  constructor(private movieService: MovieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.movie = JSON.parse(localStorage.getItem('movie'))?.payload;
    this.movie?.shows.forEach((show) =>
      this.theatreDetails.push(
        this.movieService.getTheatreFromId(show.theatreId)
      )
    );
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('#movie-booking')
        .css(
          'background',
          'linear-gradient(0deg, rgba(0, 16, 33, 0.7), rgba(0, 16, 33, 0.8)), url(' +
            JSON.parse(localStorage.getItem('movie'))?.payload
              ?.moviePosterLink +
            ') fixed'
        )
        .css('background-position', 'center')
        .css('background-repeat', 'no-repeat');
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('movie');
  }

  bookTicket(show: IShowDetails, theatreId: string) {
    let data: IBookingsRequest = {
      movieName: this.movie.movieName,
      show: show,
      theatreId: theatreId,
    };
    this.dialog.open(SeatLayoutComponent, { data });
  }
}
