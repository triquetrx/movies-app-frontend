import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserComponent } from './search-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewUserComponent } from '../view-user/view-user.component';
import { SearchPipe } from '../pipes/search.pipe';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { users } from 'src/app/test-mocks/mock.components';

describe('SearchUserComponent', () => {
  let component: SearchUserComponent;
  let fixture: ComponentFixture<SearchUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
      ],
      declarations: [SearchUserComponent, ViewUserComponent, SearchPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog box', () => {
    let spy = spyOn(component['dialog'], 'open');
    component.sendData(users[0]);
    expect(spy).toHaveBeenCalled();
  });
});
