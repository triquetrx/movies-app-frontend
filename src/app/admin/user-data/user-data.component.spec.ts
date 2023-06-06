import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataComponent } from './user-data.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SearchUserComponent } from '../search-user/search-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { SearchPipe } from '../pipes/search.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('UserDataComponent', () => {
  let component: UserDataComponent;
  let fixture: ComponentFixture<UserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatButtonModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatIconModule,
      ],
      declarations: [UserDataComponent, SearchUserComponent, SearchPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should give the admin access and show success alert box', () => {
    spyOn(component['service'], 'giveAdminAccess').and.callFake(() =>
      of({ payload: 'success' })
    );
    component.giveAdminAccess('test-user');
    expect(component['alert'].alertType).toEqual('success');
  });

  it('should not give the admin access and show warning alert box', () => {
    spyOn(component['service'], 'giveAdminAccess').and.callFake(() =>
      throwError({ error: 'error' })
    );
    component.giveAdminAccess('test-user');
    expect(component['alert'].alertType).toEqual('danger');
  });
});
