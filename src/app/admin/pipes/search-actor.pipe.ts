import { Pipe, PipeTransform } from '@angular/core';
import { IActor } from 'src/app/interfaces/IMovies';

@Pipe({
  name: 'searchActor',
})
export class SearchActorPipe implements PipeTransform {
  transform(actors: IActor[], searchText: string): IActor[] {
    if (!searchText) return actors;
    return actors?.filter((actor) => actor.actorName.includes(searchText));
  }
}
