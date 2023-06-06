import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMovieComponent } from './login-movie.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  dialogMock,
  loginWithEmail,
  loginWithLoginId,
} from 'src/app/test-mocks/mock.components';
import { of, throwError } from 'rxjs';

describe('LoginMovieComponent', () => {
  let component: LoginMovieComponent;
  let fixture: ComponentFixture<LoginMovieComponent>;

  const validForm = <NgForm>{
    value: loginWithLoginId,
    invalid: false,
  };
  const validFormWithEmail = <NgForm>{
    value: loginWithEmail,
    invalid: false,
  };

  const invalidForm = <NgForm>{
    value: {},
    invalid: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatButtonModule,
        MatToolbarModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginMovieComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not login in movie login the user and show an alert box', () => {
    spyOn(component['authService'], 'login').and.callFake(() =>
      throwError({ error: { status: 400, message: 'No User found' } })
    );
    component.login(validForm);
    expect(component['alert'].alertType).toEqual('warning');
    expect(component['alert'].alertMessage).toEqual('No User found');
  });

  it('should login in movie login the user and close the dialog', () => {
    spyOn(component['authService'], 'login').and.callFake(() =>
      of({ payload: 'someTokenGoesHere' })
    );
    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.login(validForm);
    expect(spy).toHaveBeenCalled();
    expect(component['isLoginSuccess']).toBeTrue();
  });

  it('should return if the form was invalid in movie login', () => {
    component.login(invalidForm);
    expect(component.login).toBeTruthy();
  });

  it('should return true for valid email in movie login', () => {
    expect(component['checkIfEmail']('test@test.com')).toEqual([
      'test@test.com',
    ]);
  });

  it('should return false for invalid email in movie login', () => {
    expect(component['checkIfEmail']('test')).toEqual(null);
  });

  it('should generate login body with loginId in movie login', () => {
    expect(component['generateLoginBody'](validForm)).toEqual({
      loginId: 'test',
      password: 'test',
    });
  });

  it('should generate login body with email in movie login', () => {
    expect(component['generateLoginBody'](validFormWithEmail)).toEqual({
      email: 'test@test.com',
      password: 'test',
    });
  });
});
