import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserComponent } from './view-user.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { dialogMock } from 'src/app/test-mocks/mock.components';
import { of, throwError } from 'rxjs';

describe('ViewUserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;

  let data = {
    firstName: 'Zaid',
    lastName: 'Khan',
    email: 'zdkhan07861@gmail.com',
    loginId: 'triquetrx',
    password: 'test123',
    role: 'ADMIN',
    contactNumber: '8767860091',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule],
      declarations: [ViewUserComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: { data: data } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal in view user admin', () => {
    let spy = spyOn(component['dialogRef'], 'close').and.callThrough();
    component.closeModal();
    expect(spy).toHaveBeenCalled();
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
