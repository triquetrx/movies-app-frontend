export interface IMovies {
  _id?: string;
  movieName: string;
  starring: string[];
  shows: IShows[];
  moviePosterLink: string;
  releaseDate: string;
}

export interface IShows {
  theatreId: string;
  showDetails: IShowDetails[];
}

export interface IShowDetails {
  showTime: string;
  seats: number;
  bookings?: [string];
  _id?: string;
}

export interface ITheatre {
  _id?: string;
  city: string;
  cost: number;
  theatreName: string;
}

export interface IActor {
  _id?: string;
  actorName?: string;
  actorPhotoLink?: string;
}

export interface IUpdateMovieRequest {
  type: string;
  theatreId: string;
  showTime: string;
  numberOfSeats: number;
}
