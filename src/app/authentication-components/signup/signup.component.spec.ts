import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { of, throwError } from 'rxjs';
import { signUpData } from 'src/app/test-mocks/mock.components';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;

  const validForm = <NgForm>{
    value: signUpData,
    invalid: false,
  };

  const invalidForm = <NgForm>{
    value: signUpData,
    invalid: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [SignupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message on the basis of input', () => {
    expect(component['errorMessage']('Email ID must be unique')).toEqual(
      'User already exists'
    );
    expect(component['errorMessage']('User ID already taken')).toEqual(
      'Username already taken'
    );
  });

  it('should not signup the user and throw an error', () => {
    spyOn(component['authService'], 'signup').and.callFake(() =>
      throwError({ error: { status: 400, message: 'Email ID must be unique' } })
    );
    component.signup(validForm);
    expect(component['alert'].alertType).toEqual('warning');
  });

  it('should signup the user', () => {
    spyOn(component['authService'], 'signup').and.callFake(() =>
      of({ payload: 'New User Created' })
    );
    component['signup'](validForm);
    expect(component['alert'].alertType).toEqual('success');
  });

  it('should return the form if invalid after submit', () => {
    component['signup'](invalidForm);
    expect(component.signup).toBeTruthy();
  });
});
