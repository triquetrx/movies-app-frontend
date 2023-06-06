import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import {
  loginWithEmail,
  loginWithLoginId,
} from 'src/app/test-mocks/mock.components';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;

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
        HttpClientTestingModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatDividerModule,
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not login the user and show an alert box', () => {
    spyOn(component['authService'], 'login').and.callFake(() =>
      throwError({ error: { status: 400, message: 'No User found' } })
    );
    component.login(validForm);
    expect(component['alert'].alertType).toEqual('warning');
    expect(component['alert'].alertMessage).toEqual('No User found');
  });

  it('should login the user and emit as logged in', () => {
    spyOn(component['authService'], 'login').and.callFake(() =>
      of({ payload: 'someTokenGoesHere' })
    );
    component.login(validForm);
    expect(component['isSuccess']).toBeTrue();
  });

  it('should return if the form was invalid', () => {
    component.login(invalidForm);
    expect(component.login).toBeTruthy();
  });

  it('should return true for valid email', () => {
    expect(component['checkIfEmail']('test@test.com')).toEqual([
      'test@test.com',
    ]);
  });

  it('should return false for invalid email', () => {
    expect(component['checkIfEmail']('test')).toEqual(null);
  });

  it('should generate login body with loginId', () => {
    expect(component['generateLoginBody'](validForm)).toEqual({
      loginId: 'test',
      password: 'test',
    });
  });

  it('should generate login body with email', () => {
    expect(component['generateLoginBody'](validFormWithEmail)).toEqual({
      email: 'test@test.com',
      password: 'test',
    });
  });
});
