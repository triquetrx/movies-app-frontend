import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBookingsComponent } from './search-bookings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';
import { SearchBookingsPipe } from '../pipes/search-bookings.pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bookings } from 'src/app/test-mocks/mock.components';

describe('SearchBookingsComponent', () => {
  let component: SearchBookingsComponent;
  let fixture: ComponentFixture<SearchBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        SearchBookingsComponent,
        BookingDetailsComponent,
        SearchBookingsPipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog in search bookings', () => {
    const dialogSpy = spyOn(component['dialog'], 'open');
    component.viewMore(bookings);
    expect(dialogSpy).toHaveBeenCalled();
  });
});
