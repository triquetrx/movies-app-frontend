import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { NewPasswordFormComponent } from '../forgot-password-components/new-password-form/new-password-form.component';
import { TokenFormComponent } from '../forgot-password-components/token-form/token-form.component';
import { UsernameFormComponent } from '../forgot-password-components/username-form/username-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDividerModule,
        MatFormFieldModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatOptionModule,
      ],
      declarations: [
        ForgotPasswordComponent,
        NewPasswordFormComponent,
        TokenFormComponent,
        UsernameFormComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase the steps', () => {
    component.stepChange(true);
    expect(component.currentStep).toBeGreaterThan(1);
  });

  it('should store the token', () => {
    component.storeToken('token');
    expect(component['token']).toEqual('token');
  });
});
