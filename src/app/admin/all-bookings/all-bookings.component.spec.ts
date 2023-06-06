import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookingsComponent } from './all-bookings.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { SearchBookingsComponent } from '../search-bookings/search-bookings.component';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBookingsPipe } from '../pipes/search-bookings.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IBookings } from 'src/app/interfaces/IBookings';

describe('AllBookingsComponent', () => {
  let component: AllBookingsComponent;
  let fixture: ComponentFixture<AllBookingsComponent>;
  let data: IBookings = {
    _id: '6472050a47572d8691230bbc',
    userId: '64539cfacc614a4082861d0c',
    movieName: 'Dune: Part Two',
    theatreId: '646c482fb69bc5e360613052',
    showTime: '12:00',
    numberOfTickets: 2,
    seatNumbers: ['A2', 'A4'],
    totalCost: 800,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatButtonModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        AllBookingsComponent,
        SearchBookingsComponent,
        SearchBookingsPipe,
        BookingDetailsComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    const openDialogSpy = spyOn(component['dialog'], 'open');
    component['openBooking'](data);
    expect(openDialogSpy).toHaveBeenCalled();
  });
});
