import { Component } from '@angular/core';
import { MoviesComponent } from '../../core/components/movies/movies.component';
import { SearchComponent } from '../../core/components/search/search.component';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [MoviesComponent, SearchComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent {
  searchText = '';
  private searchSubject = new Subject<string>();
  constructor() {}

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(1000)).subscribe((text) => {
      this.performSearch(text);
    });
  }

  performSearch(text: string) {
    this.searchText = text;
  }

  getSearchText(text: string) {
    this.searchSubject.next(text);
  }
}
