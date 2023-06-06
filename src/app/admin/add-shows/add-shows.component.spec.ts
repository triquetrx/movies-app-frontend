import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowsComponent } from './add-shows.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SearchTheatrePipe } from '../pipes/search-theatre.pipe';
import { NewTheatreComponent } from '../new-theatre/new-theatre.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  showDetails,
  theatres,
  dialogMock,
} from 'src/app/test-mocks/mock.components';
import { of } from 'rxjs';

describe('AddShowsComponent', () => {
  let component: AddShowsComponent;
  let fixture: ComponentFixture<AddShowsComponent>;

  const validForm = <NgForm>{
    value: showDetails[0],
    invalid: false,
  };

  const invalidForm = <NgForm>{
    value: {},
    invalid: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [AddShowsComponent, SearchTheatrePipe, NewTheatreComponent],
      providers: [{ provide: MatDialogRef, useValue: dialogMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add theatres in add shows', () => {
    component['addTheatre'](theatres[0]);
    expect(component['isTheatreSelected']).toBeTrue();
  });

  it('should return if the form is invalid', () => {
    component['addShow'](invalidForm);
    expect(component.addShow).toBeTruthy();
  });

  it('should add the form values if valid', () => {
    component['addShow'](validForm);
    expect(component['shows'].length).toBeGreaterThanOrEqual(1);
  });

  it('should open add new theatre dialog', () => {
    const dialogSpy = spyOn(component['dialog'], 'open');
    dialogSpy.and.returnValue({
      afterClosed: () => of({}),
    } as MatDialogRef<unknown, unknown>);
    component['addNewTheatre']();
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should close the dialogRef', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component['addShows']();
    expect(spy).toHaveBeenCalled();
  });

  it('should close the dialogRef if cancelled', () => {
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component['cancelAdd']();
    expect(spy).toHaveBeenCalledWith({ data: { isAdded: false } });
  });
});
