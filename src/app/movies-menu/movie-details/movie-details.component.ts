import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../service/movies.service';
import { Observable, Subject } from 'rxjs';
import { IPayload } from '../../interfaces/ICommon';
import { IMovies } from '../../interfaces/IMovies';
import * as $ from 'jquery';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { LoginMovieComponent } from '../login-movie/login-movie.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  movieDetails: Observable<IPayload<IMovies>>;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  tmdbMovieDetails: Observable<any>;
  movieName: string;
  actorsData: any = [];
  actorsId: [string];

  constructor(
    private route: ActivatedRoute,
    private service: MovieService,
    private dialog: MatDialog,
    private cookie: CookieService,
    private navigate: Router
  ) {}

  ngOnInit(): void {
    this.movieName = this.route.snapshot.paramMap.get('movieName');
    this.movieDetails = this.service.getMovieByName(this.movieName);
    this.tmdbMovieDetails = this.service.getDataFromTmdb(this.movieName);
    this.movieDetails.pipe(takeUntil(this.destroy$)).subscribe((movie) => {
      movie.payload.starring.forEach((actor) => {
        this.getActorsFromId(actor);
      });
    });
  }

  ngAfterViewInit(): void {
    this.movieDetails.subscribe((movie) => {
      $(document).ready(function () {
        $('#movie-details')
          .css(
            'background',
            'linear-gradient(0deg, rgba(0, 16, 33, 0.7), rgba(0, 16, 33, 0.8)), url(' +
              movie.payload.moviePosterLink +
              ') fixed'
          )
          .css('background-position', 'center')
          .css('background-repeat', 'no-repeat');
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  viewTrailer(): void {
    window.open(
      `https://www.youtube.com/results?search_query=${this.movieName}+trailer`
    );
  }

  bookTicket(): void {
    if (this.cookie.get('token')) {
      this.movieDetails.pipe(takeUntil(this.destroy$)).subscribe((res) => {
        localStorage.setItem('movie', JSON.stringify(res));
        this.navigate.navigate(['movies/book-ticket']);
      });
      return;
    }
    const loginDialog = this.dialog.open(LoginMovieComponent);
    loginDialog
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.bookTicket());
  }

  private getActorsFromId(actorId: string): void {
    this.service
      .getActorFromId(actorId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((actor) => {
        this.actorsData.push(actor.payload);
      });
  }
}
