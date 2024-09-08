import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from '../../core/services/movies/movies.service';
import { filter, SubscriptionLike } from 'rxjs';
import { Movie } from '../../types/types';
import { StoreService } from '../../core/services/store/store.service';
import { AddToListComponent } from '../../core/components/add-to-list/add-to-list.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  subscription: SubscriptionLike[] = [];
  movie!: Movie;

  constructor(
    private movies: MoviesService,
    private store: StoreService,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    console.log('MoviesComponent initialized');
  }

  getMovies(title: string) {
    console.log('Getting movies');
    this.subscription.push(
      this.movies
        .getMovies(title)
        .pipe(filter((data: Movie) => data.Response === 'True'))
        .subscribe((data: Movie) => {
          console.log('Movies', JSON.stringify(data));
          this.movie = data;
        })
    );
  }

  addToList() {
    const ref = this.vcr.createComponent(AddToListComponent);
    ref.setInput('movie', this.movie);
  }

  searchMovies(text: string) {
    console.log('Searching movies', text);
    this.getMovies(text);
  }

  ngonDestroy() {
    console.log('MoviesComponent destroyed');
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
