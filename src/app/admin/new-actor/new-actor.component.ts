import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAlert } from 'src/app/interfaces/common.interface';
import { MovieService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-new-actor',
  templateUrl: './new-actor.component.html',
  styleUrls: ['./new-actor.component.scss'],
})
export class NewActorComponent implements OnInit, OnDestroy {
  alert: IAlert;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private service: MovieService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  actorSubmit(actorForm: NgForm) {
    if (actorForm.invalid) {
      return;
    }
    this.service
      .addNewActor(actorForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alert = {
            isAlert: true,
            alertType: 'success',
            alertMessage: 'New actor added',
          };
        },
        error: (err) => {
          this.alert = {
            isAlert: true,
            alertType: 'warning',
            alertMessage: 'Oops, something went wrong',
          };
        },
      });
  }
}
