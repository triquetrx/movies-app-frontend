import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { MovieRoutingModule } from './movie-routing.module';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesButtonComponent } from './movies-button/movies-button.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SeatLayoutComponent } from './seat-layout/seat-layout.component';
import { LoginMovieComponent } from './login-movie/login-movie.component';
import { SearchMoviePipe } from './pipes/search-movie.pipe';

@NgModule({
  declarations: [
    AllMoviesComponent,
    MovieDetailsComponent,
    BookTicketComponent,
    SearchMovieComponent,
    MoviesButtonComponent,
    DeleteDialogComponent,
    SeatLayoutComponent,
    LoginMovieComponent,
    SearchMovieComponent,
    SearchMoviePipe,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class MovieModule {}
