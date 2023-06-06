import { users } from 'src/app/test-mocks/mock.components';
import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('search for user', () => {
    const pipe = new SearchPipe();
    expect(pipe.transform(users, 'Triquetrx').length).toEqual(1);
  });
});
