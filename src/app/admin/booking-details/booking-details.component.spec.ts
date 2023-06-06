import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDetailsComponent } from './booking-details.component';
import { MatDividerModule } from '@angular/material/divider';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('BookingDetailsComponent', () => {
  let component: BookingDetailsComponent;
  let fixture: ComponentFixture<BookingDetailsComponent>;

  let data = {
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
        MatDialogModule,
        MatButtonModule,
        HttpClientTestingModule,
      ],
      declarations: [BookingDetailsComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { data: data } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
