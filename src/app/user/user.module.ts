import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsComponent } from './bookings/bookings.component';
import { UserRoutingComponent } from './user-routing.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [BookingsComponent, ViewProfileComponent],
  imports: [
    CommonModule,
    UserRoutingComponent,
    MatButtonModule,
    MatDividerModule,
  ],
})
export class UserModule {}
