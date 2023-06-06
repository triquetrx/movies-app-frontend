import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTheatreComponent } from './new-theatre.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { theatres } from 'src/app/test-mocks/mock.components';
import { of, throwError } from 'rxjs';

describe('NewTheatreComponent', () => {
  let component: NewTheatreComponent;
  let fixture: ComponentFixture<NewTheatreComponent>;

  const invalidForm = <NgForm>{
    value: theatres[0],
    invalid: true,
  };

  const validForm = <NgForm>{
    value: theatres[0],
    invalid: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [NewTheatreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return for invalid form when adding new theatre', () => {
    component.theatreSubmit(invalidForm);
    expect(component.theatreSubmit).toBeTruthy();
  });

  it('should fail to add new theatre', () => {
    spyOn(component['service'], 'addNewTheatre').and.callFake(() =>
      throwError({ error: { status: 400, message: 'Something wrong' } })
    );

    component['theatreSubmit'](validForm);
    expect(component['alert'].alertType).toEqual('warning');
  });

  it('should successfully add new theatre', () => {
    spyOn(component['service'], 'addNewTheatre').and.callFake(() =>
      of({ payload: theatres[0] })
    );

    component['theatreSubmit'](validForm);
    expect(component['alert'].alertType).toEqual('success');
  });
});
