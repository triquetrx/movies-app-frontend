import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { IPayload } from 'src/app/interfaces/ICommon';
import { ITheatre } from 'src/app/interfaces/IMovies';
import { MovieService } from 'src/app/service/movies.service';
import { NewTheatreComponent } from '../new-theatre/new-theatre.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-shows',
  templateUrl: './add-shows.component.html',
  styleUrls: ['./add-shows.component.scss'],
})
export class AddShowsComponent implements OnInit, OnDestroy {
  searchText: string;
  isTheatreSelected: boolean;
  theatreSelected: ITheatre;
  theatres: Observable<IPayload<ITheatre[]>>;
  shows: any = [];
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private service: MovieService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AddShowsComponent>
  ) {}

  ngOnInit(): void {
    this.theatres = this.service.getAllTheatre();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addTheatre(theatre: ITheatre): void {
    this.theatreSelected = theatre;
    this.isTheatreSelected = true;
  }

  addShow(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.shows.push(form.value);
  }

  addNewTheatre(): void {
    let theatreDialog = this.dialog.open(NewTheatreComponent);
    theatreDialog
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.ngOnInit(),
      });
  }

  addShows(): void {
    this.dialogRef.close({
      data: {
        isAdded: true,
        theatreName: this.theatreSelected?.theatreName,
        show: { theatreId: this.theatreSelected?._id, showDetails: this.shows },
      },
    });
  }

  cancelAdd(): void {
    this.dialogRef.close({ data: { isAdded: false } });
  }
}
