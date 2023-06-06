import { IShowDetails } from './IMovies';

export interface IBookings extends IBookingsRequest {
  _id?: string;
  numberOfTickets: number;
  seatNumbers: string[];
  showTime: string;
  userId?: string;
  totalCost?: number;
}

export interface IBookingsRequest {
  movieName?: string;
  show?: IShowDetails;
  cost?: number;
  theatreId: string;
}
