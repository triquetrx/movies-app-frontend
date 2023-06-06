import { actors } from 'src/app/test-mocks/mock.components';
import { SearchActorPipe } from './search-actor.pipe';

describe('SearchActorPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchActorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter actor on the basis of name', () => {
    const pipe = new SearchActorPipe();
    expect(pipe.transform(actors, 'test1').length).toEqual(1);
  });
});
