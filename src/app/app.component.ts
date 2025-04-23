import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CollectionsComponent } from './features/collections/collections.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CollectionsComponent, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'movie-search';
  store = inject(Store);

  constructor() {
    this.getState();
  }

  getState() {
    this.store.select('state').subscribe((data) => {
      console.log('State data', data);
    });
  }
  addCollection() {
    this.store.dispatch({
      type: '[Collections] Add Collection',
      collections: {
        list: [],
        title: 'My Collection',
        id: 1,
      },
    });
    this.getState();
  }

  addMovieToCollection() {
    this.store.dispatch({
      type: '[Collections] Add Movie To Collection',
      id: 1,
      collections: {
        Title: 'Inception',
        Year: '2010',
        imdbID: 'tt1375666',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMjAxMjg0OTY2OF5BMl5BanBnXkFtZTcwNjQ3NzYyMw@@._V1_SX300.jpg',
      },
    });
    this.getState();
  }

  removeMovieFromCollection() {
    this.store.dispatch({
      type: '[Collections] Remove Movie From Collection',
      id: 1,
      collections: {
        Title: 'Inception',
        Year: '2010',
        imdbID: 'tt1375666',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMjAxMjg0OTY2OF5BMl5BanBnXkFtZTcwNjQ3NzYyMw@@._V1_SX300.jpg',
      },
    });
    this.getState();
  }

  renameCollection() {
    this.store.dispatch({
      type: '[Collections] Rename Collection',
      id: 1,
      title: 'My New Collection',
    });
    this.getState();
  }
}
