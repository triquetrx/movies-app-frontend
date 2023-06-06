import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieComponent } from './search-movie.component';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { SearchMoviePipe } from '../pipes/search-movie.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { movie } from 'src/app/test-mocks/mock.components';

describe('SearchMovieComponent', () => {
  let component: SearchMovieComponent;
  let fixture: ComponentFixture<SearchMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        MatAutocompleteModule,
        MatButtonModule,
        RouterTestingModule,
      ],
      declarations: [SearchMovieComponent, SearchMoviePipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMovieComponent);
    component = fixture.componentInstance;
    component.movies = of({ payload: [movie] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
