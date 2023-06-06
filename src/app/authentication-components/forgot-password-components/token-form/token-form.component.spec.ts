import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenFormComponent } from './token-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TokenFormComponent', () => {
  let component: TokenFormComponent;
  let fixture: ComponentFixture<TokenFormComponent>;

  const invalidForm = <NgForm>{
    invalid: true,
    value: {},
  };
  const validForm = <NgForm>{
    invalid: false,
    value: {
      token: 'test-token',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      declarations: [TokenFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return if invalid form submitted', () => {
    component.resetToken(invalidForm);
    expect(component.resetToken).toBeTruthy();
  });

  it('should return if invalid form submitted', () => {
    component.resetToken(validForm);
    expect(component['isCompleted']).toBeTrue();
  });
});
