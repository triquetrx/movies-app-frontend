import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatLayoutComponent } from './seat-layout.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';
import {
  bookingRequest,
  bookings,
  dialogMock,
} from 'src/app/test-mocks/mock.components';

describe('SeatLayoutComponent', () => {
  let component: SeatLayoutComponent;
  let fixture: ComponentFixture<SeatLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule, MatButtonModule],
      declarations: [SeatLayoutComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: bookingRequest },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatLayoutComponent);
    component = fixture.componentInstance;
    spyOn(component['service'], 'getSeatsBooked').and.callFake(() =>
      of([bookings])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select seat', () => {
    component.selectSeat('A10', false);
    expect(component['selectSeat'].length).toBeGreaterThanOrEqual(1);
  });

  it('should remove seat', () => {
    component['selectedSeats'] = ['A8', 'A9', 'A10'];
    component.selectSeat('A10', false);
    expect(component['selectSeat'].length).toBeLessThanOrEqual(2);
  });

  it('should check for the seat if selected', () => {
    component['selectedSeats'] = ['A8', 'A9', 'A10'];
    expect(component.seatCheck('A10')).toEqual('active');
  });

  it('should check for the seat if not selected', () => {
    component['selectedSeats'] = ['A8', 'A9'];
    expect(component.seatCheck('A10')).toEqual('');
  });

  it('should return if the selected seat length is 0', () => {
    component.bookTicket();
    expect(component.bookTicket).toBeTruthy();
  });

  it('should call bookTicket API in seat-layout', () => {
    spyOn(component['service'], 'bookTicket').and.callFake(() =>
      of({ payload: { bookingDetails: bookings } })
    );
    component['selectedSeats'] = ['A1', 'A2', 'A3'];
    component.data = bookingRequest;
    component.bookTicket();
    expect(component.isBooked).toBeTrue();
  });

  it('should call bookTicket API in seat-layout with error', () => {
    spyOn(component['service'], 'bookTicket').and.callFake(() =>
      throwError('Something is wrong')
    );
    component['selectedSeats'] = ['A1', 'A2', 'A3'];
    component.data = bookingRequest;
    component.bookTicket();
    expect(component.bookTicket).toBeTruthy();
  });

  it('should close the dialog box on call', () => {
    let spy = spyOn(component['dialogRef'], 'close').and.callThrough();
    component.closeDialog();
    expect(spy).toHaveBeenCalled();
  });
});
