import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';

const routes: Routes = [
  { path: ':movieName/update', component: UpdateMovieComponent },
  { path: 'all-bookings', component: AllBookingsComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'all-users', component: UserDataComponent },
  {
    path: '/movies',
    loadChildren: () =>
      import('../movies-menu/movie.module').then((m) => m.MovieModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
