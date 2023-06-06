import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketComponent } from './book-ticket.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SeatLayoutComponent } from '../seat-layout/seat-layout.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('BookTicketComponent', () => {
  let component: BookTicketComponent;
  let fixture: ComponentFixture<BookTicketComponent>;
  let localStorage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatCardModule,
        MatButtonModule,
        HttpClientTestingModule,
        MatDialogModule,
      ],
      declarations: [BookTicketComponent, SeatLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTicketComponent);
    localStorage = {};
    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStorage ? localStorage[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStorage[key] = value + '')
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStorage = {}));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
