import { Component, Input, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from '../../services/movies/movies.service';
import { filter, SubscriptionLike } from 'rxjs';
import { List, Movie } from '../../../types/types';
import { StoreService } from '../../services/store/store.service';
import { AddToListComponent } from '../add-to-list/add-to-list.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  subscription: SubscriptionLike[] = [];
  movie!: Movie;
  myLists: List[] = [];
  @Input() movieTitle = '';

  constructor(
    private movies: MoviesService,
    private store: StoreService,
    public vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    console.log('MoviesComponent initialized');
    this.getLists();
  }

  ngOnChanges() {
    this.searchMovies(this.movieTitle);
  }

  addToList(data: Movie) {
    if (this.myLists.length) {
      const ref = this.vcr.createComponent(AddToListComponent);
      ref.setInput('movie', data);
      ref.setInput('compRef', ref);
    } else {
      console.log('No lists available');
    }
  }

  searchMovies(text: string) {
    console.log('Searching movies', text);
    if (!text) {
      console.log('No text to search for');
      return;
    }
    this.subscription.push(
      this.movies
        .getMovies(text)
        .pipe(
          filter((data: Movie) => {
            if (data.Response === 'True') {
              return true;
            } else {
              console.log('No movies found');
              return false;
            }
          })
        )
        .subscribe((data: Movie) => {
          this.movie = data;
        })
    );
  }

  getLists() {
    this.myLists = this.store.getLists();
  }

  ngOnDestroy() {
    console.log('MoviesComponent destroyed');
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
