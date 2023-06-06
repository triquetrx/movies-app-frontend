import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMovieComponent } from './update-movie.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddRemoveSeatsComponent } from '../add-remove-seats/add-remove-seats.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { movie, shows, theatres } from 'src/app/test-mocks/mock.components';
import { of } from 'rxjs';

describe('UpdateMovieComponent', () => {
  let component: UpdateMovieComponent;
  let fixture: ComponentFixture<UpdateMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatExpansionModule,
        MatIconModule,
        MatButtonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      declarations: [UpdateMovieComponent, AddRemoveSeatsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get theatre names from the shows', () => {
    spyOn(component['service'], 'getTheatreFromId').and.callFake(() =>
      of({ payload: theatres[0] })
    );
    component.getTheatreName(shows);
    expect(component.theatres.length).toBeGreaterThanOrEqual(2);
  });

  it('should get the movies by name and set to local variable', () => {
    spyOn(component['service'], 'getMovieByName').and.callFake(() =>
      of({ payload: movie })
    );
    spyOn(component['service'], 'getTheatreFromId').and.callFake(() =>
      of({ payload: theatres[0] })
    );
    component['getMovieByName']('test');
    expect(component['movie']).toEqual(movie);
  });

  it('should open add or remove sets component', () => {
    const openDialogSpy = spyOn(component['dialog'], 'open');
    openDialogSpy.and.returnValue({
      afterClosed: () => of({}),
    } as MatDialogRef<unknown, unknown>);
    component['addOrRemoveSeats']('ADD', '12:00', 1, theatres[0]);
    expect(openDialogSpy).toHaveBeenCalled();
  });
});
