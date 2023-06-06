import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActorComponent } from './new-actor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { actors } from 'src/app/test-mocks/mock.components';
import { throwError, of } from 'rxjs';

describe('NewActorComponent', () => {
  let component: NewActorComponent;
  let fixture: ComponentFixture<NewActorComponent>;

  const invalidForm = <NgForm>{
    value: actors[0],
    invalid: true,
  };

  const validForm = <NgForm>{
    value: actors[0],
    invalid: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [NewActorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return for invalid form', () => {
    component.actorSubmit(invalidForm);
    expect(component.actorSubmit).toBeTruthy();
  });

  it('should fail to add new actor', () => {
    spyOn(component['service'], 'addNewActor').and.callFake(() =>
      throwError({ error: { status: 400, message: 'Something wrong' } })
    );

    component['actorSubmit'](validForm);
    expect(component['alert'].alertType).toEqual('warning');
  });

  it('should successfully add new actor', () => {
    spyOn(component['service'], 'addNewActor').and.callFake(() =>
      of({ payload: actors })
    );

    component['actorSubmit'](validForm);
    expect(component['alert'].alertType).toEqual('success');
  });
});
