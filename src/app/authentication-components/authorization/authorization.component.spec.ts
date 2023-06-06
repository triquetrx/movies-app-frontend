import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { of, throwError } from 'rxjs';

describe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        RouterTestingModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [AuthorizationComponent, LoginComponent, SignupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the user for error', () => {
    spyOn(component['cookie'], 'get').and.callFake(() => 'testToken');
    let spy = spyOn(component['cookie'], 'delete').and.callThrough();
    spyOn(component['authService'], 'validateToken').and.callFake(() =>
      throwError({ error: { status: 400, message: 'Something wrong' } })
    );
    component.validateUser(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should validate the user and set cookie', () => {
    spyOn(component['cookie'], 'get').and.callFake(() => 'testToken');
    let spy = spyOn(component['cookie'], 'set').and.callThrough();
    spyOn(component['authService'], 'validateToken').and.callFake(() =>
      of({ payload: { role: 'USER' } })
    );
    component.validateUser(true);
    expect(spy).toHaveBeenCalled();
  });
});
