import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IMovies, IShows, ITheatre } from 'src/app/interfaces/IMovies';
import { MovieService } from 'src/app/service/movies.service';
import { AddRemoveSeatsComponent } from '../add-remove-seats/add-remove-seats.component';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss'],
})
export class UpdateMovieComponent implements OnInit {
  movie: IMovies;
  theatres: any = [];
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private service: MovieService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const movieName = this.route.snapshot.paramMap.get('movieName');
    this.getMovieByName(movieName);
  }

  getTheatreName(shows: IShows[]): void {
    shows.forEach((show) =>
      this.service
        .getTheatreFromId(show?.theatreId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.theatres.push(res?.payload);
        })
    );
  }

  private getMovieByName(movieName: string): void {
    this.service
      .getMovieByName(movieName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movie) => {
        this.getTheatreName(movie?.payload?.shows);
        this.movie = movie?.payload;
      });
  }

  addOrRemoveSeats(
    type: string,
    showTime: string,
    seats: number,
    theatre: ITheatre
  ) {
    const dialogRef = this.dialog.open(AddRemoveSeatsComponent, {
      width: '400px',
      height: '300px',
      data: {
        type: type,
        movieName: this.movie?.movieName,
        showTime: showTime,
        seats: seats,
        theatre: theatre,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getMovieByName(this.movie?.movieName);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
