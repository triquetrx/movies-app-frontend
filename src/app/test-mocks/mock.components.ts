import { ISignup, IUser } from '../interfaces/IAuth';
import { IBookings, IBookingsRequest } from '../interfaces/IBookings';
import {
  IActor,
  IMovies,
  IShowDetails,
  IShows,
  ITheatre,
  IUpdateMovieRequest,
} from '../interfaces/IMovies';

export const signUpData: ISignup = {
  firstName: 'Zaid',
  lastName: 'Khan',
  email: 'test@gmail.com',
  loginId: 'test',
  password: 'test',
  confirmPassword: 'test',
  contactNumber: '8767860091',
};

export const loginWithLoginId = {
  emailIdOrLoginId: 'test',
  password: 'test',
};

export const loginWithEmail = {
  emailIdOrLoginId: 'test@test.com',
  password: 'test',
};

export const showDetails: IShowDetails[] = [
  {
    showTime: '7:00',
    seats: 180,
  },
  {
    showTime: '9:30',
    seats: 200,
  },
];

export const shows: IShows[] = [
  {
    theatreId: '646c482fb69bc5e360613052',
    showDetails: showDetails,
  },
  {
    theatreId: '646c480ab69bc5e36061304e',
    showDetails: showDetails,
  },
  {
    theatreId: '646c4818b69bc5e360613050',
    showDetails: showDetails,
  },
];

export const theatres: ITheatre[] = [
  {
    _id: '646c482fb69bc5e360613052',
    theatreName: 'Test 1',
    city: 'test',
    cost: 400,
  },
  {
    _id: '646c480ab69bc5e36061304e',
    theatreName: 'Test 2',
    city: 'test',
    cost: 400,
  },
  {
    _id: '646c4818b69bc5e360613050',
    theatreName: 'Test 3',
    city: 'test',
    cost: 400,
  },
];

export const movieForm = {
  movieName: 'Test',
  moviePosterLink: 'Test',
  releaseDate: new Date('2023-05-05'),
};

export const movie: IMovies = {
  movieName: 'Guardians of the Galaxy Vol. 3',
  starring: [
    '646c919cf48ca89f8edcf152',
    '646c91cff48ca89f8edcf154',
    '646c921df48ca89f8edcf156',
  ],
  shows: shows,
  moviePosterLink:
    'https://m.media-amazon.com/images/M/MV5BMDgxOTdjMzYtZGQxMS00ZTAzLWI4Y2UtMTQzN2VlYjYyZWRiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
  releaseDate: '2023-05-05',
};

export const bookings: IBookings = {
  _id: '6472050a47572d8691230bbc',
  userId: '64539cfacc614a4082861d0c',
  movieName: 'Dune: Part Two',
  theatreId: '646c482fb69bc5e360613052',
  showTime: '12:00',
  numberOfTickets: 2,
  seatNumbers: ['A2', 'A4'],
  totalCost: 800,
};

export const bookingRequest: IBookingsRequest = {
  movieName: 'Dune: Part Two',
  theatreId: '646c482fb69bc5e360613052',
  show: showDetails[0],
  cost: 800,
};

export const actors: IActor[] = [
  {
    _id: '646c919cf48ca89f8edcf152',
    actorName: 'test1',
    actorPhotoLink: 'test1',
  },
  {
    _id: '646c91cff48ca89f8edcf154',
    actorName: 'test2',
    actorPhotoLink: 'test2',
  },
  {
    _id: '646c4818b69bc5e360613050',
    actorName: 'test3',
    actorPhotoLink: 'test3',
  },
];

export const dialogMock = {
  close: () => {},
};

export const updateRequestMock: IUpdateMovieRequest = {
  type: 'ADD',
  theatreId: 'test',
  showTime: '12:00',
  numberOfSeats: 10,
};

export const users: IUser[] = [
  {
    firstName: 'Test',
    lastName: 'LastName',
    email: 'test@gmail.com',
    loginId: 'test',
    password: 'test',
    contactNumber: '8767860091',
    role: 'USER',
  },
  {
    firstName: 'Triquetrx',
    lastName: 'Test',
    email: 'test@triquetrx.com',
    loginId: 'triquetrx',
    password: 'test',
    contactNumber: '8767860091',
    role: 'ADMIN',
  },
];
