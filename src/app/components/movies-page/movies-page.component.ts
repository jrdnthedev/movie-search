import { Component } from '@angular/core';
import { MoviesComponent } from '../../core/components/movies/movies.component';
import { SearchComponent } from '../../core/components/search/search.component';
import { Movie } from '../../types/types';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [MoviesComponent, SearchComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent {
  searchText = '';

  constructor() {}

  getSearchText(text: string) {
    console.log('Search text: ', text);
    this.searchText = text;
  }
}
