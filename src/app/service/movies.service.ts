import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IActor,
  IMovies,
  ITheatre,
  IUpdateMovieRequest,
} from '../interfaces/IMovies';
import { environment } from 'src/environments/environment';
import { IPayload } from '../interfaces/ICommon';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  public getAllMovies(): Observable<IPayload<[IMovies]>> {
    return this.http.get<IPayload<[IMovies]>>(`${environment.apiUrl}/all`);
  }

  public getMovieByName(movieName: string): Observable<IPayload<IMovies>> {
    return this.http.get<IPayload<IMovies>>(
      `${environment.apiUrl}/search/${movieName}`
    );
  }

  public addNewMovie(movie: IMovies): Observable<IPayload<IMovies>> {
    return this.http.post<IPayload<IMovies>>(
      `${environment.apiUrl}/add-new-movie`,
      movie
    );
  }

  public getDataFromTmdb(movieName: string): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${environment.tmdbApiKey}&query=${movieName}`
    );
  }

  public getActorFromId(actorId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/search-actor/${actorId}`);
  }

  public addNewActor(actor: IActor): Observable<any> {
    return this.http.post(`${environment.apiUrl}/add-actor`, actor);
  }

  public getTheatreFromId(theatreId: string): Observable<IPayload<ITheatre>> {
    return this.http.get<IPayload<ITheatre>>(
      `${environment.apiUrl}/search-theatre/${theatreId}`
    );
  }

  public addNewTheatre(theatre: ITheatre): Observable<IPayload<any>> {
    return this.http.post<IPayload<any>>(
      `${environment.apiUrl}/add-new-theatre`,
      theatre
    );
  }

  public getAllActors(): Observable<IPayload<IActor[]>> {
    return this.http.get<IPayload<IActor[]>>(
      `${environment.apiUrl}/all-actors`
    );
  }

  public getAllTheatre(): Observable<IPayload<ITheatre[]>> {
    return this.http.get<IPayload<ITheatre[]>>(
      `${environment.apiUrl}/all-theatre`
    );
  }

  public updateSeats(
    movieName: string,
    data: IUpdateMovieRequest
  ): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${movieName}/update`, data);
  }

  public deleteMovie(movieName: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${movieName}/delete`);
  }
}
