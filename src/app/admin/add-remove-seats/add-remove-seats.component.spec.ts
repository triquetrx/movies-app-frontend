import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveSeatsComponent } from './add-remove-seats.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { of, throwError } from 'rxjs';
import {
  dialogMock,
  theatres,
  updateRequestMock,
} from 'src/app/test-mocks/mock.components';

describe('AddRemoveSeatsComponent', () => {
  let component: AddRemoveSeatsComponent;
  let fixture: ComponentFixture<AddRemoveSeatsComponent>;

  let invalidForm = <NgForm>{
    invalid: true,
    value: {},
  };

  let validForm = <NgForm>{
    invalid: false,
    value: {
      numberOfSeats: 10,
    },
  };

  let data = {
    type: 'ADD',
    movieName: 'Test',
    showTime: '12:00',
    seats: 200,
    theatre: theatres[0],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDividerModule,
        MatIconModule,
      ],
      declarations: [AddRemoveSeatsComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveSeatsComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return if the form for add-remove-seats is invalid', () => {
    component.updateSeat(invalidForm);
    expect(component.updateSeat).toBeTruthy();
  });

  it('should update seats on valid form', () => {
    spyOn(component['service'], 'updateSeats').and.callFake(() =>
      of({ payload: 'Update success' })
    );
    component['updateSeat'](validForm);
    expect(component['alert'].alertType).toEqual('success');
  });

  it('should set warning if error in response in add-remove-seats', () => {
    spyOn(component['service'], 'updateSeats').and.callFake(() =>
      throwError({ payload: 'Update failed' })
    );

    component['updateSeat'](validForm);
    expect(component['alert'].alertType).toEqual('warning');
  });
});
