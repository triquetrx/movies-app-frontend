import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IPayload } from '../../interfaces/ICommon';
import { IMovies } from '../../interfaces/IMovies';
import { CookieService } from 'ngx-cookie-service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss'],
})
export class SearchMovieComponent implements OnInit, OnDestroy {
  searchMovie: string;
  @Input() movies: Observable<IPayload<[IMovies]>>;
  filterOptions = [];
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private cookie: CookieService) {}

  ngOnInit(): void {
    this.movies?.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      res.payload.forEach((movie) => this.filterOptions.push(movie.movieName));
    });
  }

  viewMore(movieName: string): void {
    if (this.cookie.get('role') === 'ADMIN') {
      this.router.navigate([`/admin/${movieName}/edit`]);
    } else {
      this.router.navigate([`movies/${movieName}/details`]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
