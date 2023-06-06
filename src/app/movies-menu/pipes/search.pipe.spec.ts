import { movie } from 'src/app/test-mocks/mock.components';
import { SearchMoviePipe } from './search-movie.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchMoviePipe();
    expect(pipe).toBeTruthy();
  });

  it('should search movie', () => {
    const pipe = new SearchMoviePipe();
    expect(pipe.transform([movie], 'something').length).toEqual(0);
  });
});
