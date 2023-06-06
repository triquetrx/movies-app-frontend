import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';

import { MovieDetailsComponent } from './movie-details.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatButtonModule } from '@angular/material/button';
import { LoginMovieComponent } from '../login-movie/login-movie.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, of } from 'rxjs';
import { actors, movie } from 'src/app/test-mocks/mock.components';
import { BookTicketComponent } from '../book-ticket/book-ticket.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'movies/book-ticket',
            component: BookTicketComponent,
            canActivate: [true],
          },
        ]),
        HttpClientTestingModule,
        MatButtonModule,
        MatDialogModule,
        RouterTestingModule,
      ],
      declarations: [MovieDetailsComponent, LoginMovieComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    spyOn(component['service'], 'getMovieByName').and.callFake(() =>
      of({ payload: movie })
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a new window for trailer', () => {
    let spy = spyOn(window, 'open').and.callThrough();
    component.viewTrailer();
    expect(spy).toHaveBeenCalled();
  });

  it('should call book ticket fn and navigate', () => {
    spyOn(component['cookie'], 'get').and.callFake(() => 'token-test');
    let spy = spyOn(localStorage, 'setItem').and.callThrough();
    component.bookTicket();
    expect(spy).toHaveBeenCalled();
  });

  it('should get actor from actor id', () => {
    spyOn(component['service'], 'getActorFromId').and.callFake(() =>
      of({ payload: actors[0] })
    );
    component['getActorsFromId']('test');
    expect(component['actorsData'].length).toBeGreaterThanOrEqual(1);
  });
});
