import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesButtonComponent } from './movies-button.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

describe('MoviesButtonComponent', () => {
  let component: MoviesButtonComponent;
  let fixture: ComponentFixture<MoviesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatButtonModule],
      declarations: [MoviesButtonComponent, DeleteDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide the admin as true from the cookie', () => {
    let spy = spyOn(component['cookie'], 'get').and.callFake(() => 'ADMIN');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should open and also close the dialog box', () => {
    spyOn(component['cookie'], 'get').and.callFake(() => 'ADMIN');
    const dialogSpy = spyOn(component['dialog'], 'open');
    dialogSpy.and.returnValue({
      afterClosed: () => of({}),
    } as MatDialogRef<unknown, unknown>);
    component.delete();
    expect(dialogSpy).toHaveBeenCalled();
  });
});
