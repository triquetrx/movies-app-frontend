import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordFormComponent } from './new-password-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('NewPasswordFormComponent', () => {
  let component: NewPasswordFormComponent;
  let fixture: ComponentFixture<NewPasswordFormComponent>;

  const invalidForm = <NgForm>{
    invalid: true,
    value: {},
  };

  const validForm = <NgForm>{
    invalid: false,
    value: {
      password: 'testUser',
      confirmPassword: 'testUser',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [NewPasswordFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return if the new password form is invalid', () => {
    component.changePassword(invalidForm);
    expect(component.changePassword).toBeTruthy();
  });

  it('should show success alert if the new password form is valid with response', () => {
    spyOn(component['service'], 'resetPassword').and.callFake(() => of({}));
    component.changePassword(validForm);
    expect(component['alert'].alertType).toEqual('success');
  });

  it('should show success alert if the new password form is valid with error response', () => {
    spyOn(component['service'], 'resetPassword').and.callFake(() =>
      throwError({})
    );
    component.changePassword(validForm);
    expect(component['alert'].alertType).toEqual('warning');
  });
});
