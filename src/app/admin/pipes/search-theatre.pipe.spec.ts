import { theatres } from 'src/app/test-mocks/mock.components';
import { SearchTheatrePipe } from './search-theatre.pipe';

describe('SearchTheatrePipe', () => {
  it('create an instance', () => {
    const pipe = new SearchTheatrePipe();
    expect(pipe).toBeTruthy();
  });

  it('search for the theatres', () => {
    const pipe = new SearchTheatrePipe();
    expect(pipe.transform(theatres, 'something wrong').length).toEqual(0);
  });
});
