import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { IPayload } from 'src/app/interfaces/ICommon';
import { IActor, IMovies } from 'src/app/interfaces/IMovies';
import { MovieService } from 'src/app/service/movies.service';
import { AddShowsComponent } from '../add-shows/add-shows.component';
import { NewActorComponent } from '../new-actor/new-actor.component';
import { DatePipe } from '@angular/common';
import { IAlert } from 'src/app/interfaces/common.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit, OnDestroy {
  alert: IAlert;
  starring: string;
  submitted: boolean = false;
  actors: any = [];
  actorsChips: any = [];
  shows: any = [];
  allActors: Observable<IPayload<IActor[]>>;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  theatres: any = [];

  constructor(private service: MovieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.allActors = this.service.getAllActors();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addMovie(form: NgForm): void {
    if (this.actors.length === 0 || form.invalid || this.shows.length === 0) {
      return;
    }
    const starringData = [];
    this.actorsChips.forEach((res: IActor) => starringData.push(res?._id));
    const movie: IMovies = {
      movieName: form.value?.movieName,
      moviePosterLink: form.value?.moviePosterLink,
      releaseDate: new DatePipe('en-us').transform(
        form.value?.releaseDate,
        'yyyy-MM-dd'
      ),
      starring: <[string]>starringData,
      shows: this.shows,
    };
    this.service
      .addNewMovie(movie)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.alert = {
            isAlert: true,
            alertType: 'success',
            alertMessage: 'New Movie added',
          };
        },
        error: (err) => {
          this.alert = {
            isAlert: true,
            alertType: 'warning',
            alertMessage: 'Oops, something went wrong',
          };
        },
        complete: () => (this.submitted = true),
      });
  }

  addNewActor(): void {
    let actorDialog = this.dialog.open(NewActorComponent);
    actorDialog
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.ngOnInit(),
      });
  }

  addActor(actor: IActor): void {
    if (this.actors.includes(actor._id)) {
      return;
    }
    this.actors.push(actor?._id);
    this.actorsChips.push(actor);
  }

  removeChip(actor: IActor) {
    let index = this.actorsChips.indexOf(actor);
    this.actors.splice(this.actors.indexOf(actor._id), 1);
    this.actorsChips.splice(index, 1);
  }

  deleteShow(show: any): void {
    let index = this.shows.indexOf(show);
    this.shows.splice(index, 1);
    this.theatres.splice(index, 1);
  }

  addShow() {
    let dialogRef = this.dialog.open(AddShowsComponent, {
      width: '600px',
      minHeight: '300px',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res?.data?.isAdded) {
          this.theatres.push(res?.data?.theatreName);
          this.shows.push(res?.data?.show);
        }
      });
  }
}
