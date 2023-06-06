import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAlert } from 'src/app/interfaces/common.interface';
import { MovieService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-new-theatre',
  templateUrl: './new-theatre.component.html',
  styleUrls: ['./new-theatre.component.scss'],
})
export class NewTheatreComponent implements OnInit, OnDestroy {
  alert: IAlert;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private service: MovieService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  theatreSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.service
      .addNewTheatre(form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alert = {
            isAlert: true,
            alertType: 'success',
            alertMessage: 'New theatre added',
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
