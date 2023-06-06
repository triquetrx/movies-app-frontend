import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from './delete-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
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

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  let data = 'Test Movie';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatButtonModule,
        MatDialogModule,
        HttpClientTestingModule,
      ],
      declarations: [DeleteDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: { data: data } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog box', () => {
    let spy = spyOn(component['dialog'], 'close').and.callThrough();
    component.close();
    expect(spy).toHaveBeenCalled();
  });

  it('should call the warning alert if the response consists of the same', () => {
    spyOn(component['service'], 'deleteMovie').and.callFake(() =>
      throwError({ payload: 'error' })
    );
    component.delete();
    expect(component['alert'].alertType).toEqual('warning');
  });

  it('should call the success alert if the response consists of the same', () => {
    spyOn(component['service'], 'deleteMovie').and.callFake(() =>
      of({ payload: 'success' })
    );
    component.delete();
    expect(component['alert'].alertType).toEqual('success');
  });
});
