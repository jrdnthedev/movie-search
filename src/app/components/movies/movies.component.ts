import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviesService } from '../../core/services/movies/movies.service';
import { filter, SubscriptionLike } from 'rxjs';
import { List, Movie } from '../../types/types';
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
  myLists: List[] = [];

  constructor(
    private movies: MoviesService,
    private store: StoreService,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    console.log('MoviesComponent initialized');
  }

  ngAfterViewInit() {
    this.getLists();
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
    this.getMovies(text);
  }

  getLists() {
    this.subscription.push(
      this.store.getLists().subscribe((lists) => {
        console.log('Lists: ', lists.items);
        this.myLists = lists.items;
      })
    );
  }

  ngOnDestroy() {
    console.log('MoviesComponent destroyed');
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
