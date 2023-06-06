import { Pipe, PipeTransform } from '@angular/core';
import { IMovies } from 'src/app/interfaces/IMovies';

@Pipe({
  name: 'searchMovie',
})
export class SearchMoviePipe implements PipeTransform {
  transform(movies: IMovies[], searchText: string): IMovies[] {
    if (!searchText) return movies;
    return movies.filter((movie) => movie.movieName.includes(searchText));
  }
}
