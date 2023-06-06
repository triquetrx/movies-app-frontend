import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameFormComponent } from './username-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('UsernameFormComponent', () => {
  let component: UsernameFormComponent;
  let fixture: ComponentFixture<UsernameFormComponent>;

  const invalidForm = <NgForm>{
    invalid: true,
    value: {},
  };

  const validForm = <NgForm>{
    invalid: false,
    value: {
      username: 'testUser',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [UsernameFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return if the username form is invalid', () => {
    component.generateToken(invalidForm);
    expect(component.generateToken).toBeTruthy();
  });

  it('should show alert box if the response consists error', () => {
    spyOn(component['authService'], 'forgotPassword').and.callFake(() =>
      throwError({ error: { message: 'Error Message' } })
    );

    component.generateToken(validForm);
    expect(component['alert'].alertType).toEqual('warning');
  });

  it('should set completed to true if value is valid', () => {
    spyOn(component['authService'], 'forgotPassword').and.callFake(() =>
      of({ resetToken: 'reset-token' })
    );

    component.generateToken(validForm);
    expect(component['isCompleted']).toBeTrue();
  });
});
