import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from '../../core/services/movies/movies.service';
import { filter, SubscriptionLike } from 'rxjs';
import { Movie } from '../../types/types';

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
  constructor(private movies: MoviesService) {}

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

  searchMovies(text: string) {
    console.log('Searching movies', text);
    this.getMovies(text);
  }

  ngonDestroy() {
    console.log('MoviesComponent destroyed');
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
