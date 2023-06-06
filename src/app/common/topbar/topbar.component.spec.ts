import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';

import { TopbarComponent } from './topbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ViewProfileComponent } from 'src/app/user/view-profile/view-profile.component';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  const WINDOW = new InjectionToken('Window');
  let windowMock = {
    location: {
      reload: jasmine.createSpy('reload'),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'user/about-me',
            component: ViewProfileComponent,
            canActivate: [true],
          },
        ]),
      ],
      declarations: [TopbarComponent],
      providers: [{ provide: WINDOW, useValue: windowMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to about me when view profile is called', () => {
    let spy = spyOn(component['router'], 'navigate').and.callThrough();
    component['viewProfile']();
    expect(spy).toHaveBeenCalled();
  });

  it('should logout user and delete all the cookies', () => {
    let spy = spyOn(component['cookies'], 'deleteAll').and.callThrough();
    component['logout']();
    expect(spy).toHaveBeenCalled();
  });

  it('should validate user in the topbar', () => {
    spyOn(component['service'], 'validateToken').and.callFake(() =>
      of({ payload: { role: 'USER', name: 'test' } })
    );
    let spy = spyOn(component['cookies'], 'set').and.callThrough();
    component['validateUserRole']('test');
    expect(spy).toHaveBeenCalled();
  });

  it('should validate user and delete token for error in the topbar', () => {
    spyOn(component['service'], 'validateToken').and.callFake(() =>
      throwError({ payload: 'Invalid call' })
    );
    let spy = spyOn(component['cookies'], 'delete').and.callThrough();
    component['validateUserRole']('test');
    expect(spy).toHaveBeenCalled();
  });
});
