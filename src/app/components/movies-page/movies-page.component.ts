import { Component } from '@angular/core';
import { MoviesComponent } from '../../core/components/movies/movies.component';
import { SearchComponent } from '../../core/components/search/search.component';

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
    this.searchText = text;
  }
}
