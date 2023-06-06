import { Pipe, PipeTransform } from '@angular/core';
import { ITheatre } from 'src/app/interfaces/IMovies';

@Pipe({
  name: 'searchTheatre',
})
export class SearchTheatrePipe implements PipeTransform {
  transform(theatres: ITheatre[], searchText: string): ITheatre[] {
    if (!searchText) return theatres;
    return theatres.filter((theatre) =>
      theatre.theatreName.includes(searchText)
    );
  }
}
