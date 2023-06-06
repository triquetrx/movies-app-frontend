import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { AuthGuard } from '../service/auth.guard';

const routes: Routes = [
  { path: '', component: AllMoviesComponent },
  { path: ':movieName/details', component: MovieDetailsComponent },
  {
    path: 'book-ticket',
    component: BookTicketComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
