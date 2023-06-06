import { bookings } from 'src/app/test-mocks/mock.components';
import { SearchBookingsPipe } from './search-bookings.pipe';

describe('SearchBookingsPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchBookingsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should search for the bookings', () => {
    const pipe = new SearchBookingsPipe();
    expect(pipe.transform([bookings], 'Dune').length).toEqual(1);
  });
});
