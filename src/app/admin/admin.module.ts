import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

import { AdminRoutingModule } from './admin-routing.module';
import { UserDataComponent } from './user-data/user-data.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { SearchPipe } from './pipes/search.pipe';
import { ViewUserComponent } from './view-user/view-user.component';
import { SearchBookingsPipe } from './pipes/search-bookings.pipe';
import { SearchBookingsComponent } from './search-bookings/search-bookings.component';
import { AddShowsComponent } from './add-shows/add-shows.component';
import { SearchTheatrePipe } from './pipes/search-theatre.pipe';
import { NewActorComponent } from './new-actor/new-actor.component';
import { NewTheatreComponent } from './new-theatre/new-theatre.component';
import { SearchActorPipe } from './pipes/search-actor.pipe';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { AddRemoveSeatsComponent } from './add-remove-seats/add-remove-seats.component';

@NgModule({
  declarations: [
    UserDataComponent,
    AllBookingsComponent,
    BookingDetailsComponent,
    AddMovieComponent,
    SearchUserComponent,
    SearchPipe,
    ViewUserComponent,
    SearchBookingsPipe,
    SearchBookingsComponent,
    AddShowsComponent,
    SearchTheatrePipe,
    NewActorComponent,
    NewTheatreComponent,
    SearchActorPipe,
    UpdateMovieComponent,
    AddRemoveSeatsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSelectModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
