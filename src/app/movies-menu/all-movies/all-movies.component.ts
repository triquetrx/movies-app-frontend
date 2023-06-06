import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../../service/movies.service';
import { IPayload } from '../../interfaces/ICommon';
import { IMovies } from '../../interfaces/IMovies';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.scss'],
})
export class AllMoviesComponent implements OnInit {
  allMovies: Observable<IPayload<[IMovies]>>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.allMovies = this.movieService.getAllMovies();
  }

  updateSelf(event: boolean): void {
    if (event) {
      this.ngOnInit();
    }
  }
}
