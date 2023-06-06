import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieComponent } from './add-movie.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatChipsModule } from '@angular/material/chips';
import { AddShowsComponent } from '../add-shows/add-shows.component';
import { MatNativeDateModule } from '@angular/material/core';
import { SearchActorPipe } from '../pipes/search-actor.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  actors,
  movie,
  movieForm,
  shows,
  theatres,
} from 'src/app/test-mocks/mock.components';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, EMPTY, throwError } from 'rxjs';
import { MovieService } from 'src/app/service/movies.service';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let service: jasmine.SpyObj<MovieService>;

  const invalidForm = <NgForm>{
    value: movie,
    invalid: true,
  };

  const validForm = <NgForm>{
    value: movieForm,
    invalid: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [AddMovieComponent, AddShowsComponent, SearchActorPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return if the form is invalid', () => {
    component.addMovie(invalidForm);
    expect(component.addMovie).toBeTruthy();
  });

  it('should open the add new show dialog box', () => {
    const openDialogSpy = spyOn(component['dialog'], 'open');
    openDialogSpy.and.returnValue({
      afterClosed: () =>
        of({ data: { isAdded: true, theatreName: 'Test', show: shows[0] } }),
    } as MatDialogRef<unknown, unknown>);
    component['addShow']();
    expect(openDialogSpy).toHaveBeenCalled();
  });

  it('should open the add new actor dialog box', () => {
    const openDialogSpy = spyOn(component['dialog'], 'open');
    openDialogSpy.and.returnValue({
      afterClosed: () => of(EMPTY),
    } as MatDialogRef<unknown, unknown>);
    component['addNewActor']();
    expect(openDialogSpy).toHaveBeenCalled();
  });

  it('should add actor to the array', () => {
    component['addActor'](actors[0]);
    expect(component['actorsChips'].length).toEqual(1);
    component['addActor'](actors[0]);
    expect(component['actorsChips'].length).toEqual(1);
    expect(component['actors'].length).toEqual(1);
  });

  it('should remove actor from the array', () => {
    component['addActor'](actors[0]);
    component['removeChip'](actors[0]);
    expect(component['actorsChips'].length).toEqual(0);
    expect(component['actors'].length).toEqual(0);
  });

  it('should delete the show', () => {
    component['shows'] = shows;
    component['theatres'] = theatres;
    component['deleteShow'](shows[0]);
    expect(component['shows'].length).toEqual(2);
  });

  it('should add movie and throw an error service', () => {
    spyOn(component['service'], 'addNewMovie').and.callFake(() =>
      throwError({ error: { status: 400, message: 'Something wrong' } })
    );

    component['addActor'](actors[0]);
    component['addActor'](actors[1]);
    component['shows'] = shows;
    component.addMovie(validForm);
    expect(component['alert'].alertType).toEqual('warning');
  });

  it('should add movie and call service', () => {
    spyOn(component['service'], 'addNewMovie').and.callFake(() =>
      of({ payload: movie })
    );

    component['addActor'](actors[0]);
    component['addActor'](actors[1]);
    component['shows'] = shows;
    component.addMovie(validForm);
    expect(component['alert'].alertType).toEqual('success');
  });
});
